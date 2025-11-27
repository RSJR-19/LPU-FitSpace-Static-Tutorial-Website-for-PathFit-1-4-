// DOM Elements
const main = document.getElementById("main");
const homePage = document.getElementById("home");
const pathfit1Page = document.getElementById("pathfit1");
const pathfit2Page = document.getElementById("pathfit2");
const pathfit3Page = document.getElementById("pathfit3");
const missionPage = document.getElementById("mission");
const aboutUsPage = document.getElementById("aboutUs");

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
