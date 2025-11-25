const navButton = document.getElementsByClassName("nav-button");
const homeButton = navButton[0];
const pathfit1Button = navButton[1];
const pathfit2Button = navButton[2];
const pathfit3Button = navButton[3];
const missionButton = navButton[4];
const aboutUsButton = navButton[5];



const main = document.getElementById("main");
const homePage = document.getElementById("home");
const pathfit1Page = document.getElementById("pathfit1");
const pathfit2Page = document.getElementById("pathfit2");
const pathfit3Page = document.getElementById("pathfit3");
const missionPage = document.getElementById("mission");
const departmentPage = document.getElementById("department");
const aboutUsPage = document.getElementById("aboutUs");
const missionTitle = ["INSTRUCTION", 'RESEARCH', 'COMMUNITY ENGAGEMENT', 'INSTITUTIONAL DEVELOPMENT', 'SUSTAINABILITY']
const missionMeaning = ["Provide industry-based knowledge and skills.", 'Undertake multi-disciplinary research.','Support community engagement and social responsibility.', 'Establish local and international linkages.', 'Produce sustainability advocates for global action.']
const LPUNJPL = ['L - Love of God ', 'P - Probity', 'U - Unity', 'N - Nationalism', 'J - Justice', 'P - Pro Environment', 'L - Leadership ']
const valuesDetail = document.getElementById('valuesDetail');
const missionHead = document.getElementById('missionHead');
const missionDetail = document.getElementById('missionDetail');

const lessonLinks = document.querySelectorAll(".lesson-link");
const lessonTag = document.getElementsByClassName("lesson-link");

let initial = homePage;



// homePage.style.display = "flex";   //add mamaya
homeButton.classList.add("active");

function removeAll() {
  const navButtons = document.querySelectorAll(".nav-button");
  navButtons.forEach((navTarget) => {
    navTarget.classList.remove("active");
  });
}

function gotoPage(targetButton, targetPage) {
  if (initial !== targetPage){
  initial.style.display = "none";
  removeAll();
  targetButton.classList.add("active");
  initial = targetPage;
  initial.style.display = "flex";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // clear the hash part

  //mapping coresponding hash
    const pageMap = new Map([
      [homePage, "home"],
      [pathfit1Page, "pathfit1"],
      [pathfit2Page, "pathfit2"],
      [pathfit3Page, "pathfit3"],
      [missionPage, "mission"],
      [departmentPage, "department"],
      [aboutUsPage, "aboutUs"],
    ]);

  hash = pageMap.get(targetPage); //mapped hash with corresponding page

  // IF AND ONLY IF ?? ewan ko
  //if hash is true AND hash is NOT equal to "home" TAMA BA?
  if (hash && hash !== "home") {
    // set new hash (ex: #pathfit1)
    history.replaceState(null, "", `#${hash}`);
  } else {
    // remove hash on Home
    history.replaceState(null, "", " ");
  }
}

if (targetPage === missionPage) resetText();
}

let missionInterval = null; 

function resetText() {
    if (missionInterval !== null) clearInterval(missionInterval)

    let index = 0;
    let counter = 0

    missionHead.innerHTML = missionTitle[index];
    missionDetail.innerHTML = missionMeaning[index];
    valuesDetail.innerHTML = LPUNJPL[counter];

    missionInterval = setInterval(()=>{
        index = (index + 1) % missionTitle.length;
        counter = (counter + 1) % LPUNJPL.length;

        missionHead.innerHTML = missionTitle[index];
         missionDetail.innerHTML = missionMeaning[index];
        valuesDetail.innerHTML = LPUNJPL[counter];

    }, 1500)
}


// -------------------------------------------------------
// URL Hash Navigation Support
// -------------------------------------------------------
// Example Usage:
// sa loob ng anchor then href attribute
//   href="/home_page.html#pathfit1"
//   "/home_page.html#pathfit2"
//   "/home_page.html#pathfit3"
//   "/home_page.html#mission"
//  AND SOOOOOO ONNNNNNNNNNNNNNNNNNN
//
// NO NEED TO referance this script if used 
// since this script listen sa tatawag sakanya
// -------------------------------------------------------

//listens to the html file BASTA PAG NAG LOAD YUNG home_page.html
window.addEventListener("DOMContentLoaded", () => {
  // Gets the current hash then remove "#"
  let target = window.location.hash.substring(1);

  // Mapping between hash names and their matching elements
  // target = [tab button, tab div/section ]
  const mapping = {
    home: [homeButton, homePage],
    pathfit1: [pathfit1Button, pathfit1Page],
    pathfit2: [pathfit2Button, pathfit2Page],
    pathfit3: [pathfit3Button, pathfit3Page],
    mission: [missionButton, missionPage],
    department: [departmentButton, departmentPage],
    aboutUs: [aboutUsButton, aboutUsPage],
  };

  const selected = mapping[target]; //mapped hash with corresponding page
  if (selected) {
    gotoPage(selected[0], selected[1]);
  } else {
    // Default to Home if no hash is provided
    gotoPage(homeButton, homePage);
  }
});

//Listen for hash changes (user clicks a #link later) to react instantly
window.addEventListener("hashchange", () => {
  const target = window.location.hash.substring(1);
  const mapping = {
    home: [homeButton, homePage],
    pathfit1: [pathfit1Button, pathfit1Page],
    pathfit2: [pathfit2Button, pathfit2Page],
    pathfit3: [pathfit3Button, pathfit3Page],
    mission: [missionButton, missionPage],
    department: [departmentButton, departmentPage],
    aboutUs: [aboutUsButton, aboutUsPage],
  };

  const selected = mapping[target];
  if (selected) gotoPage(selected[0], selected[1]);
});