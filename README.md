# FitSpace — Static Tutorial Website for PATHFIT 1–4 (LPU)

FitSpace is a static, student-friendly educational website built for the Physical Education (PATHFIT) Department of Lyceum of the Philippines University (LPU). It centralizes lessons, instructor-approved resources, interactive quizzes, and department information for PATHFIT 1–4, making learning easier, clearer, and more accessible.

## Project Overview
- Scope: PATHFIT 1–4 modules only (Movement, Fitness, Dance, Sports & Group Fitness)
- Type: Fully static site (HTML, CSS, JavaScript, JSON)
- Goal: Present summarized lessons, visual explanations, approved resources, interactive quizzes, and consistent navigation
- Audience: LPU students and PATHFIT faculty
- Non‑goal: Replace classroom teaching. FitSpace serves as an organized reviewer and lesson companion.

## Design Principles
- Clean, readable, and low-bandwidth friendly
- Student-first UX; simple navigation and consistent layout
- Visual appeal without distraction
- Consistent with LPU color palette (reds & neutrals)
- Static-only stack to maximize portability and reliability

## Content Sources and Governance
- Official PATHFIT faculty materials (PowerPoints, PDFs, notes)
- Approved lesson outlines aligned with LPU’s course structure
- FitSpace project proposal defines required pages and lesson topics
- All content is rewritten, summarized, reformatted, and credited
- Built by Gaudenz R. Padullon and the IT102 Project Team under PATHFIT faculty guidance, with faculty consent and DPO clearance

## Repository Structure
```
assets/
  css/           Global and page-specific styles
  images/        Graphics and illustrations
  js/            Global site scripts (navigation, search, slideshow)
  pdf/           Referenced documents (e.g., PAR-Q)
  search-index.json  Search data for quick lookup
home_page.html       Home and department overview
index.html           Entry point (links to home)
pathfit1/            PATHFIT 1 lessons and quiz data
pathfit2/            PATHFIT 2 lessons and quiz data
pathfit3/            PATHFIT 3 lessons (dance/sports/group exercises) and quiz data
quiz/                Quiz UI (HTML/CSS/JS) and selection list
scripts_FOR_TESTING/ Utilities (search index generator, site tests)
```

## Tech Stack
- HTML for structure and content
- CSS for layout, theme, responsiveness
- Vanilla JavaScript for navigation, search, slideshow, and quizzes
- JSON for quiz content
- No build step; no framework or backend required

## Getting Started (Local)
- Open `index.html` in any modern browser to browse the site.
- For accurate relative path behavior and cross-page navigation, use a simple static server:
  - VS Code Live Server, Python `http.server`, or any static hosting.
- Quizzes run under `/quiz/quiz.html` with URL parameters.

## Navigation and Pages
- Home / Landing, About FitSpace, Mission & Vision, Department Overview, Faculty Profiles
- PATHFIT Modules:
  - PATHFIT 1: movement skills, body mechanics, PAR-Q, BMI/WHR, fundamentals
  - PATHFIT 2: physical fitness, exercise principles, FITT, types of training, PFT, weight management
  - PATHFIT 3 & 4: dance (folk, hip-hop, Zumba), sports (basketball, volleyball, arnis, badminton), group exercises, outdoor activities, recreational games

Key scripts:
- `assets/js/home_page.js`: single-page style section toggling via URL hash
- `assets/js/main.js`: sidebar/dropdown interactions for lesson tabs
- `assets/js/slideshow.js`: dynamic slideshow on home/landing
- `assets/js/search.js`: site-wide search (uses `assets/search-index.json`)

## Search System
- Data file: `assets/search-index.json`
- Expected schema (array of objects):
  ```json
  [
    {
      "Title": "Lesson Title or Page Name",
      "Path": "relative/path/to/page.html",
      "Snippet": "Short description or summary for search preview"
    }
  ]
  ```
- Behavior:
  - Loads `search-index.json` from multiple candidate paths for robustness
  - Filters results by `Title` and `Snippet`
  - Click on a result navigates to the best-resolved path
- To add entries: update `assets/search-index.json` (manually or via script in `scripts_FOR_TESTING/search-index.ps1`). Keep titles short and snippets under ~220 chars.

## Quiz System
- UI: `quiz/quiz.html` + `quiz/quiz.css` + `quiz/quiz.js`
- Content: JSON files under each module folder (e.g., `pathfit1/data/...`, `pathfit2/data/...`, `pathfit3/...`)
- Loading: `quiz.html?quiz=RELATIVE_JSON_PATH[&next=NEXT_RELATIVE_JSON_PATH]`

### Quiz JSON Schema
Array of question objects, each with:
```json
[
  {
    "question": "What does BMI stand for?",
    "options": ["Body Mass Index", "Baseline Muscle Intake", "Bone Mineral Indicator", "Balance Motion Index"],
    "answer": 0,
    "explanation": "BMI stands for Body Mass Index."
  }
]
```
- `question`: string displayed to the user
- `options`: array of strings (multiple-choice options)
- `answer`: integer index of the correct option in `options`
- `explanation`: string shown after selection

Behavior in `quiz.js`:
- Questions are shuffled; options inside each question are also shuffled.
- The correct answer index is recomputed after option shuffle via value matching.
- Immediate feedback highlights correct/wrong choices and shows explanation.
- Final grade calculation:
  - `A` ≥ 90%, `B` ≥ 80%, `C` ≥ 70%, `D` ≥ 60%, else `F`.
- Buttons: Try Again (reload), Next Quiz (sequence), Back to Quiz List.

### Sequencing Quizzes
- Use `&next=` URL param in links to chain quizzes.
- Example link in `quiz_list.html`:
  ```html
  <a href="quiz.html?quiz=../pathfit2/data/lesson1_definition_of_physical_fitness.json&next=../pathfit2/data/lesson4_fundamentals_of_fitness.json">
    Foundations: Definition of Physical Fitness
  </a>
  ```
- `goToNextQuiz()` in `quiz.js` reads the sequence and navigates to the next quiz, preserving chain order.

## Adding Content
### Add a Lesson Page
- Create an HTML file under the relevant module folder (`pathfit1/`, `pathfit2/`, `pathfit3/…`).
- Follow existing lesson page structure and CSS conventions for consistency.
- Update navigation or index pages with links to the new lesson.

### Add a Quiz
- Create a JSON file in the corresponding module’s `data/` folder following the schema above.
- Add an entry to `quiz/quiz_list.html` with `quiz=...` and optional `&next=...` for sequencing.
- Keep questions concise, unambiguous, and aligned to approved course outlines.

### Update Search Index
- Edit `assets/search-index.json` to include the new page.
- Verify search usability by trying common student keywords.

## Content and Tone Guidelines (for Developers/AI)
- Follow the proposal’s lesson list strictly; do not add unrelated topics.
- Maintain a clean, educational tone; avoid informal or distracting language.
- Keep visual design consistent with FitSpace styles (colors, layout, components).
- Ensure quiz logic remains compatible with the JSON schema.
- Respect PATHFIT 1–4 scope and faculty approvals.

## Accessibility and Performance
- Favor semantic HTML and readable text sizes.
- Ensure sufficient color contrast and keyboard-friendly interactions.
- Keep images optimized and use vector graphics where possible.
- Avoid heavy libraries; the site is static by design.

## Testing and Utilities
- `scripts_FOR_TESTING/test-website.ps1`: basic checks and a report (`website_test_report.txt`).
- `scripts_FOR_TESTING/search-index.ps1`: helps generate `assets/search-index.json`.
- `scripts_FOR_TESTING/diagram_generator.ps1`: project diagrams for documentation.

## Credits and Acknowledgements
- PATHFIT Department faculty (materials and approvals)
- G-CashHackers Team

## Notes on Data Use
- Educational use within LPU. Do not redistribute proprietary course materials externally.
- Attribute sources as required; keep summaries aligned to faculty-approved outlines.

## Quick Links
- Home: `home_page.html`
- Quiz entry: `quiz/quiz_list.html`
- Search index: `assets/search-index.json`
- Styles: `assets/css/`
- Scripts: `assets/js/`

---
