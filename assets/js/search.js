// SEARCH BAR & SEARCH FUNCTIONALITY MOVED FROM home_page.js
const searchButton = document.getElementById("search");
const inputBar = document.getElementById("input-bar");
const searchResults = document.getElementById("search-results");

let searchIndex = [];

// Try to fetch a candidate index path. Returns true on success.
async function tryPath(path) {
	try {
		const resp = await fetch(path, {cache: 'no-store'});
		if (!resp.ok) return false;
		const data = await resp.json();
		if (Array.isArray(data) || typeof data === 'object') {
			searchIndex = data;
			return true;
		}
		return false;
	} catch (e) {
		return false;
	}
}

// Try several relative locations for search-index.json (works from root and subfolders)
function loadSearchIndex() {
// the json file is located in the assets folder
	const candidates = [
		'./assets/search-index.json',
		'assets/search-index.json',
		'../assets/search-index.json',
		'../../assets/search-index.json'
	];
	let tried = 0;

	// sequentially try candidates until one works
	(async () => {
		// Get base path from current page location (works for GitHub Pages)
		try {
			const currentPath = window.location.pathname;
			// For GitHub Pages project sites: /repo-name/page.html -> /repo-name/
			// For root sites: /page.html -> /
			const basePath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
			if (basePath && basePath !== '/') {
				candidates.unshift(basePath + 'assets/search-index.json');
			}
			// Also try root
			candidates.unshift('/assets/search-index.json');
		} catch (e) {
			// ignore
		}

		// also try path relative to script location (helps when search.js is included from different folders)
		try {
			const script = document.querySelector('script[src$="search.js"]') || document.currentScript;
			if (script && script.src) {
				try {
					const scriptUrl = new URL(script.src, window.location.href);
					const scriptPath = scriptUrl.pathname.replace(/\/[^\/]*$/, '');
					if (scriptPath) {
						candidates.unshift(scriptPath + '/assets/search-index.json');
					}
				} catch (e) {
					// Fallback: extract path from script src string
					const match = script.src.match(/^(https?:\/\/[^\/]+)(\/.*\/)[^\/]*$/);
					if (match && match[2]) {
						candidates.unshift(match[2] + 'assets/search-index.json');
					}
				}
			}
		} catch (e) {
			// ignore
		}

		for (const p of candidates) {
			const ok = await tryPath(p);
			tried++;
			if (ok) return;
		}
		console.error('Error loading search-index.json: tried', tried, 'paths:', candidates.slice(0, 5));
	})();
}

loadSearchIndex();

// Toggle Search Box
function displaySearch() {
	searchButton.classList.toggle('active');
	inputBar.classList.toggle('active');
	if (inputBar.classList.contains('active')) {
		inputBar.focus();
	} else {
		searchResults.classList.remove('show');
	}
}

// Simulate Search Results
inputBar.addEventListener('input', function() {
	const query = this.value.trim().toLowerCase();
	if (query.length > 0 && searchIndex.length > 0) {
		const results = searchIndex.filter(item => {
			const title = item.Title || "";
			const snippet = item.Snippet || "";
			return (
				title.toLowerCase().includes(query) ||
				snippet.toLowerCase().includes(query)
			);
		});
		displayResults(results, query);
		searchResults.classList.add('show');
	} else {
		searchResults.classList.remove('show');
	}
});

// Highlight Query in Results
function highlight(text, query) {
	if (!query) return text;
	// escape special regex chars in query
	const esc = escapeRegExp(query);
	const regex = new RegExp(`(${esc})`, "gi");
	return text.replace(regex, '<mark>$1</mark>');
}

// Escape user string for use in RegExp
function escapeRegExp(string) {
	return String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Truncate long snippets preserving word boundaries
function truncateSnippet(text, maxLen = 200) {
	if (!text) return '';
	if (text.length <= maxLen) return text;
	const truncated = text.slice(0, maxLen);
	const lastSpace = truncated.lastIndexOf(' ');
	return (lastSpace > 50 ? truncated.slice(0, lastSpace) : truncated) + '…';
}

// Display Search Results
function displayResults(results, query) {
	searchResults.innerHTML = "";
	if (results.length === 0) {
		const noResult = document.createElement("div");
		noResult.className = "search-result-item";
		noResult.textContent = "No results found";
		searchResults.appendChild(noResult);
	} else {
		results.forEach((result) => {
			const resultItem = document.createElement("div");
			resultItem.className = "search-result-item";
			const title = result.Title || "Untitled";
			let snippet = result.Snippet || "No description available";
			snippet = truncateSnippet(snippet, 220);
			// normalize query spacing before highlighting
			const normQuery = query.replace(/\s+/g, ' ').trim();
			resultItem.innerHTML = `
				<strong>${highlight(title, normQuery)}</strong>
				<div>${highlight(snippet, normQuery)}</div>
			`;
			resultItem.addEventListener("click", function() {
				// use smart navigation that checks which candidate URL exists
				navigateToPath(result.Path);
			});
			searchResults.appendChild(resultItem);
		});
	}
}

// Handle Navigation (requires page context)
function handleNavigation(path) {
	if (!path) return;
	if (path.startsWith('#')) {
		// Hash navigation: let home_page.js handle actual page switching
		window.location.hash = path;
		return;
	}

	// Resolve possible relative/absolute path issues to avoid duplicated folder segments
	const resolved = resolveNavigationPath(path);
	window.location.href = resolved;
}

// Normalize navigation path to reduce duplicated segments like "pathfit2/pathfit2/..."
function resolveNavigationPath(path) {
	// If path looks like an absolute URL (has a scheme) or protocol-relative, return as-is
	const absUrlPattern = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//;
	if (absUrlPattern.test(path) || path.startsWith('//')) {
		return path;
	}

	// If path starts with './' or '../' let browser resolve it relative to the current page
	if (path.startsWith('./') || path.startsWith('../')) {
		return path;
	}

	// Determine site base. Prefer <base href> or <meta name="site-base"> if present.
	let siteBase = null;
	const baseEl = document.querySelector('base[href]');
	if (baseEl) {
		siteBase = baseEl.getAttribute('href');
	} else {
		const meta = document.querySelector('meta[name="site-base"]');
		if (meta && meta.content) siteBase = meta.content;
	}

	// If no explicit base, try to infer base from the script's location (handles GitHub Pages project sites)
	if (!siteBase) {
		try {
			const script = document.querySelector('script[src$="search.js"]') || document.currentScript;
			if (script && script.src) {
				const scriptUrl = new URL(script.src, window.location.href);
				// look for '/assets/' segment and use everything before it as site base
				const p = scriptUrl.pathname;
				const idx = p.indexOf('/assets/');
				if (idx !== -1) {
					const prefix = p.substring(0, idx); // may be '' or '/repo-name'
					siteBase = scriptUrl.origin + (prefix === '' ? '' : prefix);
				}
			}
		} catch (e) {
			// ignore
		}
	}

	// normalize siteBase to an absolute origin+path (no trailing slash)
	if (!siteBase) {
		siteBase = window.location.origin;
	} else {
		// if base is root-relative '/sub', prefix origin
		if (siteBase.startsWith('/')) {
			siteBase = window.location.origin + siteBase.replace(/\/$/, '');
		} else if (!/^https?:\/\//i.test(siteBase)) {
			// if base is relative, make absolute using origin
			siteBase = window.location.origin + '/' + siteBase.replace(/^\/?|\/$/g, '');
		}
	}

	// If path starts with '/', it's root-relative; append to siteBase
	if (path.startsWith('/')) {
		return siteBase.replace(/\/$/, '') + path;
	}

	// For plain relative-looking paths like "pathfit3/...", treat them as site-root-relative
	// so searching from any folder goes to the canonical location under the site base.
	const final = siteBase.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
	// debug: show resolved base and final path
	if (window && window.console && typeof window.console.debug === 'function') {
		console.debug('[search] siteBase=', siteBase, 'resolved=', final);
	}
	return final;
}

// Check URL existence with HEAD (fallback to GET on failure). Returns true if reachable (status 200-399).
async function checkUrlExists(url) {
	try {
		const resp = await fetch(url, { method: 'HEAD', cache: 'no-store' });
		if (resp && resp.ok) return true;
		// Some servers don't support HEAD; try GET but do not download body
		const resp2 = await fetch(url, { method: 'GET', cache: 'no-store' });
		return resp2 && resp2.ok;
	} catch (e) {
		return false;
	}
}

// Smart navigation: try candidates (resolved, ./path, sibling) by checking which exists first.
async function navigateToPath(path) {
	if (!path) return;
	// If hash navigation
	if (path.startsWith('#')) {
		window.location.hash = path;
		return;
	}

	const resolved = resolveNavigationPath(path);
	const candidates = [resolved];

	// also try relative to current page
	candidates.push(new URL('./' + path, window.location.href).href);
	candidates.push(new URL('../' + path, window.location.href).href);

	// if path includes a leading folder, try stripping the first segment (sibling)
	const segs = path.split('/');
	if (segs.length > 1) {
		const withoutFirst = './' + segs.slice(1).join('/');
		candidates.push(new URL(withoutFirst, window.location.href).href);
	}

	// dedupe
	const seen = new Set();
	const uniq = candidates.filter(u => {
		if (!u) return false;
		if (seen.has(u)) return false;
		seen.add(u);
		return true;
	});

	if (window && window.console && typeof window.console.debug === 'function') {
		console.debug('[search] navigation candidates=', uniq);
	}

	for (const c of uniq) {
		const ok = await checkUrlExists(c);
		if (ok) {
			window.location.href = c;
			return;
		}
	}

	// fallback: navigate to resolved (even if check failed)
	window.location.href = resolved;
}

// Close Search Results When Clicking Outside
document.addEventListener('click', function(e) {
	if (!inputBar.contains(e.target) && !searchButton.contains(e.target) && !searchResults.contains(e.target)) {
		searchResults.classList.remove('show');
		inputBar.classList.remove('active');
		searchButton.classList.remove('active');
	}
});
