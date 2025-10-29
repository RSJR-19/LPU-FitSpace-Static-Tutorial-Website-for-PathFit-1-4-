// global site script for (sidebar, navbar, footer)
const dropdown1 = document.getElementById("dropdown1");
const dropdown2 = document.getElementById("dropdown2");
const dropdown3 = document.getElementById("dropdown3");
const dropdownDance = document.getElementById("dropdownDance");
const dropdownSports = document.getElementById("dropdownSports");
const dropdownMartial = document.getElementById("dropdownMartial");
const dropdownGroup = document.getElementById("dropdownGroup");
const dropdownCamping = document.getElementById("dropdownCamping");
const arrow1 = document.getElementById("arrow1");
const arrow2 = document.getElementById("arrow2");
const arrow3 = document.getElementById("arrow3");
const arrowDance = document.getElementById("arrowDance");
const arrowSports = document.getElementById("arrowSports");
const arrowMartial = document.getElementById("arrowMartial");
const arrowGroup = document.getElementById("arrowGroup");
const arrowCamping = document.getElementById("arrowCamping");

const lessonTab = document.getElementsByClassName("lesson-tab");
const lessonTab2 = document.getElementsByClassName("lesson-tab2");
const pathfit1 = lessonTab[0];
const pathfit2 = lessonTab[1];
const pathfit3 = lessonTab[2];
const danceTab = lessonTab2[0];
const sportsTab = lessonTab2[1];
const martialTab = lessonTab2[2];
const groupTab = lessonTab2[3];
const campingTab = lessonTab2[4];

function openTab(targetTab, targetArrow, targetDropdown) {
  targetTab.classList.toggle("active");
  targetArrow.classList.toggle("active");
  targetDropdown.classList.toggle("active");

  if (targetTab === pathfit3) {
    dropdownDance.classList.remove("active");
    arrowDance.classList.remove("active");
    danceTab.classList.remove("active");

    dropdownSports.classList.remove("active");
    arrowSports.classList.remove("active");
    sportsTab.classList.remove("active");

    dropdownMartial.classList.remove("active");
    arrowMartial.classList.remove("active");
    martialTab.classList.remove("active");

    dropdownGroup.classList.remove("active");
    arrowGroup.classList.remove("active");
    groupTab.classList.remove("active");

    dropdownCamping.classList.remove("active");
    arrowCamping.classList.remove("active");
    campingTab.classList.remove("active");
  }
}
