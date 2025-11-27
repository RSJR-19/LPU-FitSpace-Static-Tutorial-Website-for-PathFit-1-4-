// DOM Elements
const main = document.getElementById("main");
const homePage = document.getElementById("home");
const pathfit1Page = document.getElementById("pathfit1");
const pathfit2Page = document.getElementById("pathfit2");
const pathfit3Page = document.getElementById("pathfit3");
const missionPage = document.getElementById("mission");
const aboutUsPage = document.getElementById("aboutUs");

// Track current page - initialize to null, will be set in initializeSections
var initial = null;

// Navigate to Page
function gotoPage(targetPage) {
  // Safety check: ensure targetPage exists
  if (!targetPage) {
    console.error('gotoPage: targetPage is null or undefined');
    return;
  }
  
  // Initialize if not already done
  if (typeof initial === 'undefined' || initial === null) {
    initializeSections();
  }
  
  if (initial !== targetPage) {
    if (initial) {
      initial.style.display = "none";
    }
    initial = targetPage;
    initial.style.display = "flex";
    
    // Close search if open
    if (typeof searchButton !== 'undefined' && searchButton) {
      searchButton.classList.remove("active");
    }
    if (typeof inputBar !== 'undefined' && inputBar) {
      inputBar.classList.remove("active");
    }
    if (typeof searchResults !== 'undefined' && searchResults) {
      searchResults.classList.remove("show");
    }
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
  if (targetPage === missionPage && typeof resetText === 'function') {
    resetText();
  }
}




// Initialize all sections - hide all except home
function initializeSections() {
  const allSections = [pathfit1Page, pathfit2Page, pathfit3Page, missionPage, aboutUsPage];
  allSections.forEach(section => {
    if (section) {
      section.style.display = "none";
    }
  });
  // Show home page by default
  if (homePage) {
    homePage.style.display = "flex";
    initial = homePage;
  }
}

// URL Hash Navigation Support
window.addEventListener("DOMContentLoaded", () => {
  // Initialize all sections first
  initializeSections();
  
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
