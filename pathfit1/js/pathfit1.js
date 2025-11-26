// Expand PathFit 1
  document.addEventListener("DOMContentLoaded", () => {
    const pathfit2Tab = document.querySelector("#dropdown1");
    const arrow2 = document.querySelector("#arrow1");
    const tab2 = document.querySelectorAll(".lesson-tab")[0];

    // Add the same "active" classes used by your openTab() function
    pathfit2Tab.classList.add("active");
    arrow2.classList.add("active");
    tab2.classList.add("active");
  });

  function takeQuiz() {
    alert("Quz")
  }