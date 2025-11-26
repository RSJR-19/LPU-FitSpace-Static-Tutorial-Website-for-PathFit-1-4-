// DOM Elements
const main = document.getElementById("main");
const homePage = document.getElementById("home");
const pathfit1Page = document.getElementById("pathfit1");
const pathfit2Page = document.getElementById("pathfit2");
const pathfit3Page = document.getElementById("pathfit3");
const missionPage = document.getElementById("mission");
const aboutUsPage = document.getElementById("aboutUs");
const searchButton = document.getElementById("search");
const inputBar = document.getElementById("input-bar");
const searchResults = document.getElementById("search-results");

// Mission and Values Data
const missionTitle = [
  "INSTRUCTION",
  "RESEARCH",
  "COMMUNITY ENGAGEMENT",
  "INSTITUTIONAL DEVELOPMENT",
  "SUSTAINABILITY"
];
const missionMeaning = [
  "Provide industry-based knowledge and skills.",
  "Undertake multi-disciplinary research.",
  "Support community engagement and social responsibility.",
  "Establish local and international linkages.",
  "Produce sustainability advocates for global action."
];
const LPUNJPL = [
  "L - Love of God",
  "P - Probity",
  "U - Unity",
  "N - Nationalism",
  "J - Justice",
  "P - Pro Environment",
  "L - Leadership"
];
const valuesDetail = document.getElementById("valuesDetail");
const missionHead = document.getElementById("missionHead");
const missionDetail = document.getElementById("missionDetail");

// Initial Page
let initial = homePage;
let searchIndex = [];

// Load search-index.json
fetch('./search-index.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load search-index.json');
    }
    return response.json();
  })
  .then(data => {
    searchIndex = data;
  })
  .catch(error => {
    console.error('Error loading search-index.json:', error);
  });

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
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, '<mark>$1</mark>');
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
      const snippet = result.Snippet || "No description available";
      resultItem.innerHTML = `
        <strong>${highlight(title, query)}</strong>
        <div>${highlight(snippet, query)}</div>
      `;
      resultItem.addEventListener("click", function() {
        handleNavigation(result.Path);
      });
      searchResults.appendChild(resultItem);
    });
  }
}

// Handle Navigation
function handleNavigation(path) {
  if (path.startsWith('#')) {
    // Handle hash navigation
    const target = path.substring(1);
    const mapping = {
      pathfit1: pathfit1Page,
      pathfit2: pathfit2Page,
      pathfit3: pathfit3Page,
      mission: missionPage,
      aboutUs: aboutUsPage,
      home: homePage
    };
    const selected = mapping[target];
    if (selected) {
      gotoPage(selected);
    }
  } else {
    // Handle file path navigation
    window.location.href = path;
  }
}

// Close Search Results When Clicking Outside
document.addEventListener('click', function(e) {
  if (!inputBar.contains(e.target) && !searchButton.contains(e.target) && !searchResults.contains(e.target)) {
    searchResults.classList.remove('show');
    inputBar.classList.remove('active');
    searchButton.classList.remove('active');
  }
});

// Navigate to Page
function gotoPage(targetPage) {
  if (initial !== targetPage) {
    initial.style.display = "none";
    initial = targetPage;
    initial.style.display = "flex";
    searchButton.classList.remove("active");
    inputBar.classList.remove("active");
    searchResults.classList.remove("show");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Update URL Hash
    const pageMap = new Map([
      [homePage, "home"],
      [pathfit1Page, "pathfit1"],
      [pathfit2Page, "pathfit2"],
      [pathfit3Page, "pathfit3"],
      [missionPage, "mission"],
      [aboutUsPage, "aboutUs"],
    ]);
    const hash = pageMap.get(targetPage);
    if (hash && hash !== "home") {
      history.replaceState(null, "", `#${hash}`);
    } else {
      history.replaceState(null, "", " ");
    }
  }
  if (targetPage === missionPage) resetText();
}

// Mission Text Rotation
let missionInterval = null;
function resetText() {
  if (missionInterval !== null) clearInterval(missionInterval);
  let index = 0;
  let counter = 0;
  missionHead.innerHTML = missionTitle[index];
  missionDetail.innerHTML = missionMeaning[index];
  valuesDetail.innerHTML = LPUNJPL[counter];
  missionInterval = setInterval(() => {
    index = (index + 1) % missionTitle.length;
    counter = (counter + 1) % LPUNJPL.length;
    missionHead.innerHTML = missionTitle[index];
    missionDetail.innerHTML = missionMeaning[index];
    valuesDetail.innerHTML = LPUNJPL[counter];
  }, 1500);
}

// URL Hash Navigation Support
window.addEventListener("DOMContentLoaded", () => {
  const target = window.location.hash.substring(1);
  const mapping = {
    home: homePage,
    pathfit1: pathfit1Page,
    pathfit2: pathfit2Page,
    pathfit3: pathfit3Page,
    mission: missionPage,
    aboutUs: aboutUsPage,
  };
  const selected = mapping[target];
  if (selected) {
    gotoPage(selected);
  } else {
    gotoPage(homePage);
  }
});

// Listen for Hash Changes
window.addEventListener("hashchange", () => {
  const target = window.location.hash.substring(1);
  const mapping = {
    home: homePage,
    pathfit1: pathfit1Page,
    pathfit2: pathfit2Page,
    pathfit3: pathfit3Page,
    mission: missionPage,
    aboutUs: aboutUsPage,
  };
  const selected = mapping[target];
  if (selected) gotoPage(selected);
});
