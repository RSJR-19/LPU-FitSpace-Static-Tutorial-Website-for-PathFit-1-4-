// Expand PathFit 3
  document.addEventListener("DOMContentLoaded", () => {
    const pathfit2Tab = document.querySelector("#dropdown3");
    const arrow2 = document.querySelector("#arrow3");
    const tab2 = document.querySelectorAll(".lesson-tab")[2];

    // Add the same "active" classes used by your openTab() function
    pathfit2Tab.classList.add("active");
    arrow2.classList.add("active");
    tab2.classList.add("active");
  });

  function takeQuiz() {
    alert("Quz")
  }