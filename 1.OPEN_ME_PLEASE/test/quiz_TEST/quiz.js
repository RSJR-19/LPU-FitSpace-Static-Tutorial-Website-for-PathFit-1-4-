let questions = [];
let currentIndex = 0;
let score = 0;

// Load quiz from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const quizFile = urlParams.get("quiz");

// If no quiz file selected show list ELSE load quiz
if (!quizFile) {
  showQuizList();
} else {
  loadQuizFile(quizFile);
}

function loadQuizFile(file) {
  fetch(file)
    .then((r) => r.json())
    .then((data) => {
      questions = data;
      showQuestion();
    })
    .catch(() => {
      document.getElementById(
        "quiz"
      ).innerHTML = `<div style="color:red;">Failed to load quiz "${file}".</div>`;
    });
}

function showQuizList() {
  document.getElementById("title").textContent = "Select a Quiz";
  document.getElementById("quiz").innerHTML = `
        <p>No quiz selected. Choose one below:</p>
        <button onclick="location.href='quiz.html?quiz=../pathfit1/pathfit1-data.json'">Pathfit 1 Quiz</button>
        <button onclick="location.href='quiz.html?quiz=../pathfit2/pathfit2-data.json'">Pathfit 2 Quiz</button>
        <button onclick="location.href='quiz.html?quiz=../pathfit3/pathfit3-data.json'">Pathfit 3 Quiz</button>
    `;
}

// Load and start quiz
fetch(quizFile)
  .then((response) => response.json())
  .then((data) => {
    questions = data;
    showQuestion();
  })
  .catch((error) => {
    document.getElementById("quiz").innerHTML = `
                    <div style="color:red;">Failed to load quiz. Please try again.</div>
                `;
  });

// Show current question
function showQuestion() {
  const question = questions[currentIndex];
  document.getElementById("title").textContent = `Question ${currentIndex + 1}`;
  let html = `<h3>${question.question}</h3>`;
  question.options.forEach((option, index) => {
    html += `<div class="option" onclick="checkAnswer(${index})">${option}</div>`;
  });
  document.getElementById("quiz").innerHTML = html;
}

// Check user's answer
function checkAnswer(selectedIndex) {
  const question = questions[currentIndex];
  const options = document.querySelectorAll(".option");
  options.forEach((option, index) => {
    option.style.pointerEvents = "none"; // Disable clicking
    if (index === question.answer) option.classList.add("correct");
    if (index === selectedIndex && index !== question.answer)
      option.classList.add("wrong");
  });

  if (selectedIndex === question.answer) score++;

  document.getElementById("quiz").innerHTML += `
                <p><strong>${
                  selectedIndex === question.answer ? "Correct!" : "Wrong!"
                }</strong></p>
                <p>${question.explanation || "No explanation provided."}</p>
                <button onclick="nextQuestion()">Next</button>
            `;
}

// Move to next question or show results
function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) showQuestion();
  else showResults();
}

// Show quiz results
function showResults() {
  const percentage = (score / questions.length) * 100;
  const grade =
    percentage >= 90
      ? "A"
      : percentage >= 80
      ? "B"
      : percentage >= 70
      ? "C"
      : percentage >= 60
      ? "D"
      : "F";
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
