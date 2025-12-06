// SEARCH BAR & SEARCH FUNCTIONALITY
const searchButton = document.getElementById("search");
const inputBar = document.getElementById("input-bar");
const searchResults = document.getElementById("search-results");

let searchIndex = [];

// Load search index from JSON
async function loadSearchIndex() {
	const candidates = [
		'/assets/search-index.json',           // root absolute
		'./assets/search-index.json',          // current folder
		'../assets/search-index.json',         // parent folder
		'../../assets/search-index.json'       // grandparent folder
	];

	for (const path of candidates) {
		try {
			const resp = await fetch(path, { cache: 'no-store' });
			if (resp.ok) {
				const data = await resp.json();
				if (Array.isArray(data)) {
					searchIndex = data;
					return; 
				}
			}
		} catch (e) {
			// continue to next candidate
		}
	}
	console.error('Could not load search-index.json from any candidate path');
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

// Highlight search query in text
function highlight(text, query) {
	if (!query) return text;
	const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
	return text.replace(regex, '<mark>$1</mark>');
}

// Show search results
function displayResults(results, query) {
	searchResults.innerHTML = '';
	
	if (results.length === 0) {
		searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
		return;
	}

	results.forEach((result) => {
		const item = document.createElement('div');
		item.className = 'search-result-item';
		
		const title = highlight(result.Title || 'Untitled', query);
		const snippet = highlight(result.Snippet || 'No description available', query);
		const truncated = snippet.length > 200 ? snippet.substring(0, 200) + '…' : snippet;
		
		item.innerHTML = `<strong>${title}</strong><div>${truncated}</div>`;
		item.addEventListener('click', () => navigateToPath(result.Path));
		
		searchResults.appendChild(item);
	});
}

// Get the site base path
function getBasePath() {
	const pathname = window.location.pathname;
	
	const match = pathname.match(/^(.*?)\/pathfit\d/);
	if (match) {
		return match[1];
	}
	
	if (pathname.match(/^\/(index|home_page)\.html$/)) {
		return '';
	}
	
	return '';
}

// Navigate to a lesson page
function navigateToPath(path) {
	if (!path) return;
	
	const base = getBasePath();
	const fullPath = base + '/' + path.replace(/^\//, '');
	
	window.location.href = fullPath;
}

// Close Search Results When Clicking Outside
document.addEventListener('click', function(e) {
	if (!inputBar.contains(e.target) && !searchButton.contains(e.target) && !searchResults.contains(e.target)) {
		searchResults.classList.remove('show');
		inputBar.classList.remove('active');
		searchButton.classList.remove('active');
	}
});
