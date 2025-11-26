async function loadQuiz(jsonPath) {
  try {
    const loadingEl = document.getElementById("loading-message");
    if (loadingEl) loadingEl.style.display = "block";
    const res = await fetch(jsonPath);
    const quizzes = await res.json();
    const groupedQuestions = groupQuestionsByDependency(quizzes);
    startQuiz({
      title: "Pathfit Quiz",
      questionGroups: groupedQuestions,
    });
  } catch (err) {
    console.error("Error loading quiz:", err);
    const container = document.getElementById("quiz-container");
    if (container)
      container.innerHTML = `<div style="color:#721c24;background:#f8d7da;padding:16px;border-radius:8px;">Error loading quiz data. Check console.</div>`;
    throw err;
  }
}

function groupQuestionsByDependency(quizzes) {
  const all = [];
  quizzes.forEach((unit) => {
    const unitData = unit.data || null;
    (unit.questions || []).forEach((q) => {
      all.push({
        ...q,
        unit: unit.title || unit.id,
        data: q.data || unitData,
      });
    });
  });
  const groups = [];
  const used = new Set();
  all.forEach((question) => {
    if (used.has(question)) return;
    if (question.data) {
      const relatedQuestions = all.filter(
        (q) =>
          !used.has(q) &&
          q.data &&
          ((q.data.id && q.data.id === question.data.id) ||
            (q.data.type === question.data.type &&
              JSON.stringify(q.data) === JSON.stringify(question.data)))
      );
      if (relatedQuestions.length > 0) {
        groups.push({
          data: question.data,
          questions: shuffleArray(relatedQuestions),
        });
        relatedQuestions.forEach((q) => used.add(q));
      }
    }
    if (!used.has(question)) {
      groups.push({
        data: question.data,
        questions: [question],
      });
      used.add(question);
    }
  });
  return shuffleArray(groups);
}

// Fisher-Yates
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startQuiz(quiz) {
  let currentGroupIndex = 0;
  let currentQuestionIndex = 0;
  let score = 0;
  let questionNumber = 1;
  const totalQuestions = quiz.questionGroups.reduce(
    (sum, group) => sum + group.questions.length,
    0
  );
  const container = document.getElementById("quiz-container");
  if (!container) return;
  showQuestion();

  function showQuestion() {
    const group = quiz.questionGroups[currentGroupIndex];
    const q = group.questions[currentQuestionIndex];
    container.innerHTML = "";

    // Progress bar (visual fill)
    const label = document.createElement("div");
    label.className = "progress-label";
    label.textContent = `Question ${questionNumber} of ${totalQuestions}`;
    container.appendChild(label);

    const progress = document.createElement("div");
    progress.className = "progress-bar";
    const fill = document.createElement("div");
    fill.className = "progress-bar-fill";
    // compute percent (how much completed)
    const percent = totalQuestions ? Math.round(((questionNumber - 1) / totalQuestions) * 100) : 0;
    fill.style.width = percent + "%";
    progress.appendChild(fill);
    container.appendChild(progress);

    // Question card
    const card = document.createElement("div");
    card.className = "question-card";
    const header = document.createElement("div");
    header.className = "question-header";
    const difficultySpan = q.difficulty
      ? `<span class="difficulty-tag difficulty-${
          q.difficulty
        }">${q.difficulty.toUpperCase()}</span>`
      : "";
    header.innerHTML = `<div class="unit-tag">${escapeHtml(
      q.unit || ""
    )}</div><h3 class="question-text">Q${questionNumber}: ${escapeHtml(
      q.question
    )} ${difficultySpan}</h3>`;
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options-grid";
    (q.options || []).forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "option-button";
      btn.type = "button";
      btn.setAttribute('aria-pressed', 'false');
      btn.textContent = opt;
      btn.onclick = () => handleAnswer(idx, btn, q, optionsDiv, card);
      optionsDiv.appendChild(btn);
    });
    card.appendChild(header);
    card.appendChild(optionsDiv);
    container.appendChild(card);

    // set focus to first option for accessibility
    const firstBtn = optionsDiv.querySelector('button');
    if (firstBtn) firstBtn.focus();
  }

  function handleAnswer(selectedIndex, btn, q, optionsDiv, card) {
    let correctIndex;
    if (Array.isArray(q.answer)) {
      correctIndex = q.answer[0];
    } else if (typeof q.answer === "number") {
      correctIndex = q.answer;
    } else {
      console.error("Invalid answer format for question:", q);
      return;
    }
    const isCorrect = selectedIndex === correctIndex;
    if (isCorrect) score++;

    // Disable all buttons and highlight correct/wrong answers
    optionsDiv.querySelectorAll("button").forEach((b, i) => {
      b.disabled = true;
      b.setAttribute('aria-disabled', 'true');
      if (i === correctIndex) {
        b.classList.add("correct-answer");
        b.setAttribute('aria-pressed', 'true');
      }
      if (i === selectedIndex && selectedIndex !== correctIndex) {
        b.classList.add("wrong-answer");
        b.setAttribute('aria-pressed', 'true');
      }
    });

    // Show explanation section with the correct answer
    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = `answer-feedback ${
      isCorrect ? "correct-explanation" : "incorrect-explanation"
    }`;
    feedbackDiv.innerHTML = `
      <h4><i class="material-icons" style="vertical-align:middle;color:${isCorrect ? '#28a745' : '#dc3545'}">${isCorrect ? 'check_circle' : 'cancel'}</i> ${isCorrect ? 'Correct!' : 'Wrong!'}</h4>
      <p><strong>Correct Answer:</strong> ${escapeHtml(q.options[correctIndex])}</p>
      <p><strong>Explanation:</strong> ${escapeHtml(
        q.explanation || 'No explanation provided.'
      )}</p>
    `;
    card.appendChild(feedbackDiv);

    // Add next button with toast container
    const nav = document.createElement("div");
    nav.style.marginTop = "12px";
    nav.style.position = "relative";
    nav.style.display = "flex";
    nav.style.justifyContent = "center";
    const nextBtn = document.createElement("button");
    nextBtn.className = "next-button";
    nextBtn.type = 'button';
    nextBtn.id = "next-btn-" + Date.now(); // Unique ID for positioning
    const group = quiz.questionGroups[currentGroupIndex];
    const atLastInGroup = currentQuestionIndex >= group.questions.length - 1;
    const atLastOverall =
      currentGroupIndex >= quiz.questionGroups.length - 1 && atLastInGroup;
    nextBtn.innerHTML = atLastOverall
      ? `<i class="material-icons" style="vertical-align:middle">assessment</i> See Final Results`
      : `<i class="material-icons" style="vertical-align:middle">arrow_forward</i> Next Question`;
    nextBtn.onclick = () => {
      if (!atLastInGroup) {
        currentQuestionIndex++;
      } else {
        currentGroupIndex++;
        currentQuestionIndex = 0;
      }
      questionNumber++;
      if (currentGroupIndex < quiz.questionGroups.length) {
        showQuestion();
      } else {
        showResults();
      }
    };
    nav.appendChild(nextBtn);
    card.appendChild(nav);
  }

  function showResults() {
    container.innerHTML = "";
    const percentage = totalQuestions ? (score / totalQuestions) * 100 : 0;
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
    const html = `
      <div class="results-container">
        <h2><i class="material-icons" style="vertical-align:middle;color:#17a2b8">emoji_events</i> Quiz Complete</h2>
        <div class="score-display">
          <div class="score-circle ${grade.toLowerCase()}">
            <span class="percentage">${percentage.toFixed(1)}%</span>
            <span class="grade">Grade ${grade}</span>
          </div>
          <h3>Score: ${score} out of ${totalQuestions}</h3>
        </div>
        <div class="restart-button">
          <button onclick="location.reload()"><i class="material-icons" style="vertical-align:middle">refresh</i> Try Again</button>
        </div>
      </div>
    `;
    container.innerHTML = html;
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

// expose to global
window.loadQuiz = loadQuiz;
