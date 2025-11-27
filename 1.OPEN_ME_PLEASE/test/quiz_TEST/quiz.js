// Load quiz data from JSON file
async function loadQuiz(jsonPath) {
  const loadingEl = document.getElementById("loading-message");
  const container = document.getElementById("quiz-container");
  loadingEl.style.display = "flex";
  container.innerHTML = "";

  try {
    const res = await fetch(jsonPath);
    const quizzes = await res.json();
    const allQuestions = prepareQuestions(quizzes);
    startQuiz(allQuestions);
  } catch (err) {
    console.error("Error loading quiz:", err);
    container.innerHTML = `
            <div style="color:#721c24;background:#f8d7da;padding:16px;border-radius:8px;">
                Unable to load the quiz. Please try again later.
            </div>
        `;
  } finally {
    loadingEl.style.display = "none";
  }
}

// Prepare questions: flatten and shuffle
function prepareQuestions(quizzes) {
  let allQuestions = [];
  quizzes.forEach((unit) => {
    unit.questions.forEach((q) => {
      allQuestions.push({
        ...q,
        unit: unit.title || unit.id,
      });
    });
  });
  return shuffleArray(allQuestions);
}

// Fisher-Yates shuffle algorithm
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Start the quiz
function startQuiz(questions) {
  let currentQuestionIndex = 0;
  let score = 0;
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  showQuestion();

  function showQuestion() {
    const q = questions[currentQuestionIndex];
    container.innerHTML = "";

    // Progress bar
    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    const progressFill = document.createElement("div");
    progressFill.className = "progress-bar-fill";
    progressFill.style.width = `${
      ((currentQuestionIndex + 1) / questions.length) * 100
    }%`;
    progressBar.appendChild(progressFill);
    container.appendChild(progressBar);

    // Question card
    const card = document.createElement("div");
    card.className = "question-card";

    const header = document.createElement("div");
    header.className = "question-header";
    header.innerHTML = `
            <div class="unit-tag">${escapeHtml(q.unit)}</div>
            <h3 class="question-text">Q${
              currentQuestionIndex + 1
            }: ${escapeHtml(q.question)}</h3>
        `;

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options-grid";

    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-button";
      btn.innerHTML = `<span>${opt}</span>`;
      btn.onclick = () => handleAnswer(idx, q);
      optionsDiv.appendChild(btn);
    });

    card.appendChild(header);
    card.appendChild(optionsDiv);
    container.appendChild(card);
  }

  function handleAnswer(selectedIndex, q) {
    const optionsDiv = document.querySelector(".options-grid");
    const buttons = optionsDiv.querySelectorAll("button");
    const correctIndex = Array.isArray(q.answer) ? q.answer[0] : q.answer;

    // Disable all buttons
    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === correctIndex) {
        b.classList.add("correct-answer");
        b.innerHTML = `<i class="material-icons" style="color: #28a745;">check_circle</i> ${b.textContent}`;
      }
      if (i === selectedIndex && i !== correctIndex) {
        b.classList.add("wrong-answer");
        b.innerHTML = `<i class="material-icons" style="color: #dc3545;">cancel</i> ${b.textContent}`;
      }
    });

    // Show feedback
    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = `answer-feedback ${
      selectedIndex === correctIndex
        ? "correct-explanation"
        : "incorrect-explanation"
    }`;
    feedbackDiv.innerHTML = `
            <h4>
                ${
                  selectedIndex === correctIndex
                    ? `<i class="material-icons" style="color: #28a745;">check_circle</i> Correct!`
                    : `<i class="material-icons" style="color: #dc3545;">cancel</i> Wrong!`
                }
            </h4>
            <p><strong>Correct Answer:</strong> ${escapeHtml(
              q.options[correctIndex]
            )}</p>
            <p><strong>Explanation:</strong> ${escapeHtml(
              q.explanation || "No explanation provided."
            )}</p>
        `;
    container.appendChild(feedbackDiv);

    // Update score
    if (selectedIndex === correctIndex) score++;

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.className = "next-button";
    nextBtn.innerHTML =
      currentQuestionIndex < questions.length - 1
        ? `<i class="material-icons">arrow_forward</i> Next Question`
        : `<i class="material-icons">assessment</i> See Results`;
    nextBtn.onclick = () => {
      currentQuestionIndex++;
      currentQuestionIndex < questions.length ? showQuestion() : showResults();
    };
    container.appendChild(nextBtn);
  }

  function showResults() {
    container.innerHTML = "";
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

    container.innerHTML = `
            <div class="results-container">
                <h2>Quiz Complete!</h2>
                <div class="score-circle ${grade.toLowerCase()}">
                    <span class="percentage">${percentage.toFixed(1)}%</span>
                    <span class="grade">Grade ${grade}</span>
                </div>
                <h3>Score: ${score} out of ${questions.length}</h3>

                
                <div class="restart-button">
                    <button onclick="location.reload()">
                        <i class="material-icons">refresh</i> Try Again
                    </button>
                </div>
            </div>
        `;
  }

  function escapeHtml(s) {
    if (!s && s !== 0) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// Expose to global
window.loadQuiz = loadQuiz;
