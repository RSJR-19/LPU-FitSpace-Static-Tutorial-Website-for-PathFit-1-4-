// Expand PathFit 2
  document.addEventListener("DOMContentLoaded", () => {
    const pathfit2Tab = document.querySelector("#dropdown2");
    const arrow2 = document.querySelector("#arrow2");
    const tab2 = document.querySelectorAll(".lesson-tab")[1];

    // Add the same "active" classes used by your openTab() function
    pathfit2Tab.classList.add("active");
    arrow2.classList.add("active");
    tab2.classList.add("active");
  });