/**
 * FITSPACE QUIZ SYSTEM — Simplified Version
 *
 * Features :
 * Load quiz from JSON
 * Display questions
 * Check answers
 * Show explanation
 * rack score
 * Show final results
 * Support "Next Quiz"
 */

// =======================
// GLOBAL STATE VARIABLES
// =======================
let questions = []; // Loaded questions
let currentIndex = 0; // Current question index
let score = 0; // Correct answers

const url = new URLSearchParams(window.location.search);
const quizFile = url.get("quiz");

// Redirect if no quiz parameter
if (!quizFile) {
  window.location.href = "quiz_list.html";
} else {
  loadQuiz(quizFile);
}

// ==========================
// LOAD QUIZ JSON FILE
// ==========================
function loadQuiz(path) {
  fetch(path)
    .then((r) => {
      if (!r.ok) throw new Error("Quiz file not found.");
      return r.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) throw new Error("Invalid quiz format.");

      // Randomize question order
      questions = shuffleArray(data);

      // Randomize options inside each question
      questions.forEach((q) => {
        q._originalAnswer = q.answer; // Save correct index
        q.options = shuffleArray(q.options);

        // Update the answer index after shuffling
        q.answer = q.options.indexOf(q.options[q._originalAnswer]);
      });

      showQuestion();
    })
    .catch((err) => showError(err.message));
}

// ==========================
// DISPLAY A QUESTION
// ==========================
function showQuestion() {
  const q = questions[currentIndex];

  document.getElementById("title").textContent = `Question ${
    currentIndex + 1
  } of ${questions.length}`;

  document.getElementById("question-text").textContent = q.question;

  const optionsBox = document.getElementById("options");
  optionsBox.innerHTML = "";

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => checkAnswer(i);
    optionsBox.appendChild(div);
  });

  hideExplanation();
}

// ==========================
// CHECK THE USER'S ANSWER
// ==========================
function checkAnswer(selectedIndex) {
  const q = questions[currentIndex];
  const options = document.querySelectorAll(".option");

  options.forEach((opt, i) => {
    opt.style.pointerEvents = "none";

    if (i === q.answer) opt.classList.add("correct");
    if (selectedIndex === i && i !== q.answer) opt.classList.add("wrong");
  });

  if (selectedIndex === q.answer) score++;

  showExplanation(q, selectedIndex === q.answer);
}

// ==========================
// SHOW EXPLANATION
// ==========================
function showExplanation(q, isCorrect) {
  document.getElementById("result-message").textContent = isCorrect
    ? "Correct!"
    : "Incorrect!";

  document.getElementById("result-message").style.color = isCorrect
    ? "#4CAF50"
    : "#f44336";

  document.getElementById("explanation").textContent =
    q.explanation || "No explanation provided.";

  document.getElementById("explanation-container").classList.add("show");
}

function hideExplanation() {
  document.getElementById("explanation-container").classList.remove("show");
}

// ==========================
// NEXT QUESTION
// ==========================
document.getElementById("next-btn").onclick = () => {
  currentIndex++;
  if (currentIndex < questions.length) showQuestion();
  else showResults();
};

// ==========================
// FINAL RESULTS
// ==========================
function showResults() {
  const percent = (score / questions.length) * 100;

  let grade =
    percent >= 90
      ? "A"
      : percent >= 80
      ? "B"
      : percent >= 70
      ? "C"
      : percent >= 60
      ? "D"
      : "F";

  document.getElementById("final-percent").textContent =
    percent.toFixed(1) + "%";
  document.getElementById("final-grade").textContent = "Grade: " + grade;

  document.getElementById("quiz-section").style.display = "none";
  document.getElementById("result-section").classList.add("show");
}

// ==========================
// NEXT QUIZ SYSTEM
// ==========================
function goToNextQuiz() {
  // Read current quiz and next quiz from URL
  const currentQuiz = url.get("quiz");
  const nextQuiz = url.get("next");

  // If no next quiz, return to list
  if (!nextQuiz) {
    window.location.href = "quiz_list.html";
    return;
  }

  // QUIZ SEQUENCE
  const quizOrder = [
    "../pathfit1/data/lesson1_introduction_to_physical_education.json",
    "../pathfit1/data/lesson3_introduction_to_movement_enhancement.json",
    "../pathfit1/data/lesson4_fms_lecture.json",
    "../pathfit1/data/lesson6_eating_habits.json",
    "../pathfit1/data/lesson7_locomotor_and_non_locomotor.json",

    "../pathfit2/data/lesson1_definition_of_physical_fitness.json",
    "../pathfit2/data/lesson4_fundamentals_of_fitness.json",
    "../pathfit2/data/lesson8_types_of_fitness_training.json",
    "../pathfit2/data/lesson6_benefits_of_regular_exercise.json",
    "../pathfit2/data/lesson12_weight_management.json",
    "../pathfit2/data/lesson13_physical_fitness_test.json",
    "../pathfit2/data/lesson14_developing_a_personal_fitness_plan.json",

    "../pathfit3/data/lesson1_introduction_to_applied_physical_activities.json",
    "../pathfit3/pf3_dance_act/data/lesson1_folk_dance.json",
    "../pathfit3/pf3_dance_act/data/lesson2_modern_dance_hip_hop.json",
    "../pathfit3/pf3_dance_act/data/lesson3_zumba_dance.json",
    "../pathfit3/pf3_sports_act/data/lesson4_basketball.json",
  ];

  // Get index of the next quiz
  const nextIndex = quizOrder.indexOf(nextQuiz);

  // Build URL for the next quiz
  let urlBuild = `quiz.html?quiz=${encodeURIComponent(nextQuiz)}`;

  // If a quiz exists after nextQuiz, attach &next=...
  if (nextIndex !== -1 && nextIndex < quizOrder.length - 1) {
    const followingQuiz = quizOrder[nextIndex + 1];
    urlBuild += `&next=${encodeURIComponent(followingQuiz)}`;
  }

  // Go to next quiz
  window.location.href = urlBuild;
}

// ==========================
// HANDLE ERRORS
// ==========================
function showError(msg) {
  const box = document.getElementById("error");
  box.innerHTML =
    msg +
    '<br><button onclick="window.location.href=\'quiz_list.html\'" class="btn btn-back">Back</button>';
}

// ==========================
// HELPER — SHUFFLE ARRAY
// ==========================
function shuffleArray(arr) {
  return arr
    .map((x) => ({ x, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map((obj) => obj.x);
}
