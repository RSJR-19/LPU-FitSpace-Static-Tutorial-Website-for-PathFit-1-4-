let questions = [];
let currentIndex = 0;
let score = 0;

const urlParams = new URLSearchParams(window.location.search);
const quizFile = urlParams.get("quiz");

// If no quiz selected → go to list
if (!quizFile) {
  window.location.href = "quiz_list.html";
} else {
  loadQuizFile(quizFile);
}

// Load Quiz File
function loadQuizFile(file) {
  fetch(file)
    .then((r) => {
      if (!r.ok) throw new Error("File not found or unreadable.");
      return r.json();
    })
    .then((data) => {
      questions = data;
      showQuestion();
    })
    .catch((err) => {
      console.error("QUIZ LOAD ERROR:", err);

      document.getElementById("quiz").innerHTML = `
        <div style="color:red; padding:10px;">
             Failed to load quiz: <b>${file}</b>
        </div>
      `;

      document.getElementById("error").innerText =
        "Error Details: " + err.message;
    });
}

// Display question
function showQuestion() {
  const q = questions[currentIndex];
  document.getElementById("title").textContent =
    `Question ${currentIndex + 1}`;

  let html = `<h3>${q.question}</h3>`;
  q.options.forEach((option, i) => {
    html += `<div class="option" onclick="checkAnswer(${i})">${option}</div>`;
  });

  document.getElementById("quiz").innerHTML = html;
}

// Validate Answer
function checkAnswer(selectedIndex) {
  const q = questions[currentIndex];
  const options = document.querySelectorAll(".option");

  options.forEach((option, i) => {
    option.style.pointerEvents = "none";

    if (i === q.answer) option.classList.add("correct");
    if (selectedIndex === i && selectedIndex !== q.answer)
      option.classList.add("wrong");
  });

  if (selectedIndex === q.answer) score++;

  document.getElementById("quiz").innerHTML += `
    <p><strong>${selectedIndex === q.answer ? "Correct!" : "Wrong!"}</strong></p>
    <p>${q.explanation || "No explanation provided."}</p>
    <button onclick="nextQuestion()">Next</button>
  `;
}

// Next question
function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) showQuestion();
  else showResults();
}

// Final score
function showResults() {
  const percentage = (score / questions.length) * 100;

  const grade =
    percentage >= 90 ? "A" :
    percentage >= 80 ? "B" :
    percentage >= 70 ? "C" :
    percentage >= 60 ? "D" : "F";

  document.getElementById("title").textContent = "Quiz Complete!";
  document.getElementById("quiz").innerHTML = `
    <h2>Your Score: ${score} / ${questions.length}</h2>
    <div class="score-circle">
        <span class="percentage">${percentage.toFixed(1)}%</span>
        <span class="grade">Grade: ${grade}</span>
    </div>
    <button onclick="location.reload()">Try Again</button>
  `;
}
