# FitSpace — Static Tutorial Website for PATHFIT 1–4 (LPU)

FitSpace is a learning hub for PathFit 1–4 that helps Lyceans stay active, healthy, and informed. Built for the Physical Education Department of Lyceum of the Philippines University – Cavite, it centralizes lessons, approved resources, interactive quizzes, and department information in one place.

## Features
- PathFit 1: movement competency training and foundational PE principles
- PathFit 2: exercise-based fitness activities, training plans, fitness measurement
- PathFit 3 & 4: applied physical activities, performance-based and recreational exercises
- Site-wide search powered by a JSON index
- Interactive quizzes with instant feedback and score calculation
- Responsive layout, slideshow, and simple navigation

## How to Run the Project
- Open `index.html` directly in a modern browser for basic browsing.
- For correct cross-page navigation, run a simple static server:
  - VS Code Live Server, Python `python -m http.server`, or any static host.
- Quizzes are available under `quiz/quiz.html` and load content via URL parameters.

## Hosted on GitHub Pages
- Live site: https://rsjr-19.github.io/LPU-FitSpace-Static-Tutorial-Website-for-PathFit-1-4-/


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


---
