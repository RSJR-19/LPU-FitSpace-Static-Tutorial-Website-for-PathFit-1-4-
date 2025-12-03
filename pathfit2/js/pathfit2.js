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

function takeQuiz(btn) {
  const file = btn.dataset.quiz;
  const next = btn.dataset.next;

  function resolvePath(rel) {
    try {
      const abs = new URL(rel, window.location.href);
      return abs.pathname + abs.search;
    } catch (e) {
      return rel;
    }
  }

  const quizPath = resolvePath(file);
  let url = "/quiz/quiz.html?quiz=" + encodeURIComponent(quizPath);
  if (next) {
    const nextPath = resolvePath(next);
    url += "&next=" + encodeURIComponent(nextPath);
  }
  window.location.href = url;
}

function downloadPDF(pdfUrl, downloadName) {
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = downloadName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
