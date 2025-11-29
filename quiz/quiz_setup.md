# How to Use the Quizza System in LPU FitSpace

---

## Project Structure Overview

Your project structure is organized as follows:

```
LPU-FitSpace-Static-Tutorial-Website-for-PathFit-1-4-
│
├── quiz/
│   ├── quiz_list.html      # Quiz selection page
│   ├── quiz.html           # Main quiz page
│   ├── quiz.js             # Quiz logic
│   └── quiz.css            # Quiz styles
│
├── pathfit1/
│   ├── data/               # JSON quiz data for PathFit 1
│   │   ├── lesson1_introduction_to_physical_education.json
│   │   ├── lesson2_introduction_to_movement_enhancement.json
│   │   └── lesson3_fms_lecture.json
│   └── lesson1_introduction_to_physical_education.html
│
├── pathfit2/
│   ├── data/               # JSON quiz data for PathFit 2
│   │   └── pathfit2-data.json
│   └── lesson1_definition_of_physical_fitness.html
│
└── pathfit3/
    ├── data/               # JSON quiz data for PathFit 3 & 4
    │   ├── lesson1_introduction_to_applied_physical_activities.json
    │   ├── lesson2_folk_dance.json
    │   ├── lesson3_modern_dance_hip_hop.json
    │   ├── lesson4_zumba_dance.json
    │   ├── lesson5_basketball.json
    │   └── lesson6_volleyball.json
    └── pf3_dance_act/
        └── lesson1_folk_dance.html
```

---

## How to Add a Quiz to a Lesson Page

### Step 1: Create a JSON File for Your Quiz

Place your quiz JSON file in the appropriate `data` folder:

- **PathFit 1**: `pathfit1/data/`
- **PathFit 2**: `pathfit2/data/`
- **PathFit 3 & 4**: `pathfit3/data/`

Example JSON structure:

```json
[
  {
    "question": "What is the primary purpose of Physical Education?",
    "options": [
      "To promote memorization and academic tests",
      "To promote total body movement in selected physical activities",
      "To focus on group competitions only",
      "To focus on mental exercises"
    ],
    "answer": 1,
    "explanation": "Physical Education promotes the optimum development of a person through total body movement in properly selected physical activities."
  }
]
```

---

### Step 2: Link the Quiz to Your Lesson Page

Add a **quiz button** to your lesson HTML file. Use the `data-quiz` attribute to specify the path to your JSON file.

#### Example:

```html
<!-- Inside your lesson HTML file (e.g., lesson1_introduction_to_physical_education.html) -->
<button
  class="quiz-button"
  data-quiz="../../pathfit1/data/lesson1_introduction_to_physical_education.json"
  onclick="takeQuiz(this)">
  TAKE QUIZ
</button>
```

---

### Step 3: Add the `takeQuiz()` Function to Your Page

Ensure your lesson page includes the `takeQuiz()` function. Add this script to your HTML file (or include it in your shared JS file, e.g., `pathfit1.js`):

#### Example:

```javascript
// Inside pathfit1.js
function takeQuiz(btn) {
  const file = btn.dataset.quiz;
  window.location.href = "/quiz/quiz.html?quiz=" + file;
}
```

---

### Step 4: Customize `quiz.html` (Optional)

The `quiz.html` file is pre-configured to load any quiz JSON file passed via the URL parameter `?quiz=`. No changes are needed unless you want to customize styles or logic.

#### Example URL:

```
http://yourwebsite.com/quiz/quiz.html?quiz=../../pathfit1/data/lesson1_introduction_to_physical_education.json
```

---

## How the Quiz System Works

1. **User clicks the "TAKE QUIZ" button** on a lesson page.
2. The `takeQuiz()` function reads the `data-quiz` attribute to get the JSON file path.
3. The user is redirected to `quiz.html` with the JSON file path as a URL parameter.
4. `quiz.html` loads the specified JSON file and starts the quiz.

---

## Example Workflow

### 1. Lesson Page (`lesson1_introduction_to_physical_education.html`)

```html
<!DOCTYPE html>
<html>
<head>
  <title>Introduction to Physical Education</title>
  <script src="../../assets/js/main.js"></script>
  <script src="../js/pathfit1.js"></script>
</head>
<body>
  <h1>Introduction to Physical Education</h1>
  <!-- Lesson content here -->

  <!-- Quiz button -->
  <button
    class="quiz-button"
    data-quiz="../../pathfit1/data/lesson1_introduction_to_physical_education.json"
    onclick="takeQuiz(this)">
    TAKE QUIZ
  </button>
</body>
</html>
```

### 2. Quiz Page (`quiz/quiz.html`)

```html
<!DOCTYPE html>
<html>
<head>
  <title>Quiz</title>
  <link rel="stylesheet" href="quiz.css">
  <script src="quiz.js"></script>
</head>
<body>
  <h1>Quiz</h1>
  <div id="quiz"></div>

  <script>
    // Load quiz data from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const quizFile = urlParams.get("quiz");
    if (!quizFile) {
      window.location.href = "quiz_list.html";
    } else {
      loadQuizFile(quizFile);
    }
  </script>
</body>
</html>
```

### 3. Quiz JSON File (`pathfit1/data/lesson1_introduction_to_physical_education.json`)

```json
[
  {
    "question": "What is the primary purpose of Physical Education?",
    "options": [
      "To promote memorization and academic tests",
      "To promote total body movement in selected physical activities",
      "To focus on group competitions only",
      "To focus on mental exercises"
    ],
    "answer": 1,
    "explanation": "Physical Education promotes the optimum development of a person through total body movement in properly selected physical activities."
  }
]
```

---

## Key Notes

- **Reusable**: The same `quiz.html` and `quiz.js` files work for all quizzes.
- **Flexible**: Add as many quiz JSON files as you need.
- **Simple**: No complex setup—just link the JSON file to your lesson page.

---

## Quiz List Page

The `quiz_list.html` page provides a central location for users to select a quiz. Each quiz item links to `quiz.html` with the appropriate JSON file.

### Example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Select a Quiz</title>
    <link rel="stylesheet" href="quiz.css">
    <link rel="stylesheet" href="../assets/css/footer.css">
</head>
<body>
    <h1>Available Quizzes</h1>
    <div class="quiz-container">
        <!-- PathFit 1 -->
        <div class="quiz-item" onclick="openQuiz('../pathfit1/data/pathfit1-data.json')">
            <div class="quiz-title">PathFit 1: Movement Competency</div>
            <div class="quiz-desc">Covers Introduction to PE, PAR-Q, BMI, Movement Skills</div>
        </div>
        <!-- PathFit 2 -->
        <div class="quiz-item" onclick="openQuiz('../pathfit2/data/pathfit2-data.json')">
            <div class="quiz-title">PathFit 2: Exercise-Based Fitness Training</div>
            <div class="quiz-desc">Principles of Training, FITT, Exercise Types</div>
        </div>
        <!-- PathFit 3 -->
        <div class="quiz-item" onclick="openQuiz('../pathfit3/data/pathfit3-data.json')">
            <div class="quiz-title">PathFit 3 & 4: Individual & Dual Activities</div>
            <div class="quiz-desc">Dance, Aerobic Exercise, Cardio, Sports Skills</div>
        </div>
    </div>
    <script>
        function openQuiz(file) {
            window.location.href = `quiz.html?quiz=${file}`;
        }
    </script>
</body>
</html>
```
