# LPU-FitSpace Static Tutorial Website

A comprehensive static tutorial website for Physical Activity Towards Health and Fitness (PathFit 1-4) courses at Lyceum-Philippines University.

## 🎯 Project Overview

**LPU-FitSpace** is a modern, responsive web platform designed to supplement classroom learning for PathFit courses. It provides interactive lessons, videos, quizzes, and resources organized by course module.

### Key Features
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Multi-Course Structure** - PathFit 1, 2, 3, and 4 organized separately
- ✅ **Interactive Lessons** - HTML-based lessons with embedded videos and resources
- ✅ **Search Functionality** - Full-text search across all lesson content
- ✅ **Sticky Header Navigation** - Always-accessible course navigation
- ✅ **GitHub Pages Ready** - Deploy directly to GitHub Pages with no modifications needed
- ✅ **Production Quality** - Comprehensive QA testing included

---

## 📁 Repository Structure

```
LPU-FitSpace-Static-Tutorial-Website-for-PathFit-1-4-/
│
├── 📄 README.md                              # This file - project documentation
├── 📄 index.html                             # Main landing page
├── 📄 home_page.html                         # Home page with course overview
│
├── 📂 assets/                                # Global assets (all courses share)
│   ├── 📁 css/
│   │   ├── main.css                          # Global styles
│   │   ├── structure.css                     # Layout & sticky header styles
│   │   ├── footer.css                        # Footer styles
│   │   ├── search.css                        # Search bar styles
│   │   ├── slideshow.css                     # Image carousel styles
│   │   └── landing_page.css                  # Landing page styles
│   │
│   ├── 📁 js/
│   │   ├── main.js                           # Global JavaScript functions
│   │   ├── home_page.js                      # Navigation & single-page app logic
│   │   ├── search.js                         # Search functionality
│   │   └── slideshow.js                      # Image carousel functionality
│   │
│   ├── 📁 images/
│   │   ├── logo/                             # LPU-FitSpace logos
│   │   ├── pathfit1/                         # PathFit 1 course images
│   │   ├── pathfit2/                         # PathFit 2 course images
│   │   ├── pathfit3/                         # PathFit 3 course images
│   │   ├── mission.svg                       # Mission statement icon
│   │   ├── values.svg                        # Values icon
│   │   └── vision.svg                        # Vision icon
│   │
│   ├── 📁 pdf/
│   │   ├── FMS_sheet.pdf                     # Functional Movement Screen guide
│   │   └── PAR-Q.pdf                         # Physical Activity Readiness form
│   │
│   ├── 📁 videos/
│   │   └── Banner-Video.webm                 # Hero video for landing page
│   │
│   └── search-index.json                     # Search index data
│
├── 📂 pathfit1/                              # PathFit 1: Movement Competency Training
│   ├── 📁 css/
│   │   └── pathfit1.css                      # PathFit 1 specific styles
│   ├── 📁 js/
│   │   └── pathfit1.js                       # PathFit 1 specific functions
│   ├── 📁 quiz/
│   │   └── quiz1.html                        # PathFit 1 quiz
│   │
│   ├── lesson1_introduction_to_physical_education.html
│   ├── lesson2_PARQ.html
│   ├── lesson3_Introduction_to_movement_enhancement.html
│   ├── lesson4_fms_lecture.html
│   ├── lesson5_Functional_Movement_Screen.html
│   ├── lesson6_Eating_Habits.html
│   ├── lesson7_Locomotor_and_Non_Locomotor.html
│   ├── lesson8_Basic_locomotor_and_Non_Locomotor_Dance.html
│   └── lesson9_OK_DANCE_FULLVIDEO.html
│
├── 📂 pathfit2/                              # PathFit 2: Exercise-Based Fitness Activities
│   ├── 📁 css/
│   │   └── pathfit2.css                      # PathFit 2 specific styles
│   ├── 📁 js/
│   │   ├── pathfit2.js                       # PathFit 2 specific functions
│   │   └── quiz.js                           # Quiz functionality
│   ├── 📁 data/
│   │   └── pathfit1-data.json                # PathFit 2 data for quiz
│   ├── 📁 quiz/
│   │   └── quiz.html                         # PathFit 2 quiz
│   │
│   ├── lesson1_definition_of_physical_fitness.html
│   ├── lesson2_definition_of_physical_activity.html
│   ├── lesson3_definition_of_fitness.html
│   ├── lesson4_fundamentals_of_fitness.html
│   ├── lesson5_definition_of_exercise.html
│   ├── lesson6_benefits_of_regular_exercise.html
│   ├── lesson7_definition_of_training.html
│   ├── lesson8_types_of_fitness_training.html
│   ├── lesson9_fitness_program_5_steps.html
│   ├── lesson10_sample_fitness_plan.html
│   ├── lesson11_fitt_principle.html
│   ├── lesson12_weight_management.html
│   ├── lesson13_physical_fitness_test.html
│   └── lesson14_developing_a_personal_fitness_plan.html
│
├── 📂 pathfit3/                              # PathFit 3 & 4: Dance, Sports, Martial Arts, Group Fitness
│   ├── 📁 css/
│   │   └── pathfit3.css                      # PathFit 3 specific styles
│   ├── 📁 js/
│   │   └── pathfit3.js                       # PathFit 3 specific functions
│   ├── 📁 quiz/
│   │   └── quiz.html                         # PathFit 3 quiz
│   │
│   ├── lesson1_Introduction_to_applied_physical_activities.html
│   ├── lesson10_arnis.html
│   ├── lesson15_team_building_and_recreational_games.html
│   │
│   ├── 📂 pf3_dance_act/                     # Dance Activities
│   │   ├── lesson1_folk_dance.html
│   │   ├── lesson2_modern_dance_hip_hop.html
│   │   └── lesson3_zumba_dance.html
│   │
│   ├── 📂 pf3_sports_act/                    # Sports Activities
│   │   ├── lesson4_basketball.html
│   │   ├── lesson5_volleyball.html
│   │   ├── lesson6_pickleball.html
│   │   ├── lesson7_badminton.html
│   │   ├── lesson8_table_tennis.html
│   │   └── lesson9_swimming.html
│   │
│   └── 📂 pf3_group_exercises/               # Group Exercises
│       ├── lesson11_cardio_workouts.html
│       ├── lesson12_core_and_circuit_training.html
│       ├── lesson13_outdoor_and_adventure.html
│       └── lesson14_hiking_and_trekking.html
│
├── 📂 1.OPEN_ME_PLEASE/                      # Templates & Testing Resources
│   ├── README_AGAIN_PLEASE.MD                # Additional documentation
│   │
│   ├── 📂 templates/
│   │   ├── modules\ templates/               # Module template examples
│   │   └── overview\ template/               # Overview template examples
│   │
│   └── 📂 test/
│       ├── graphics.html
│       ├── pdf_reader.html
│       ├── saerch.html
│       ├── video_player.html
│       ├── list_view/
│       ├── quiz_TEST/
│       └── rm/
│
├── 📂 Documentation/                         # Project Documentation
│   ├── PATH-CONVERSION-COMPLETE.md           # Path conversion log
│   ├── TESTING-GUIDE.md                      # Testing procedures
│   ├── COMPLETION-SUMMARY.md                 # Session summary
│   ├── STATUS-DASHBOARD.md                   # Project status
│   ├── PROJECT-COMPLETE.md                   # Final report
│   ├── TEST-RESULTS-ANALYSIS.md              # QA test results
│   │
│   └── Automation Scripts/
│       ├── test-website.ps1                  # QA test suite (Windows PowerShell)
│       ├── fix-paths.ps1                     # Path converter script
│       ├── fix-nested-paths.ps1              # Nested path handler
│       ├── fix-nav-links.ps1                 # Navigation link fixer
│       ├── verify-paths.ps1                  # Path verifier
│       └── search-index.ps1                  # Search index builder
│
└── 📄 website_test_report.txt                # Latest QA test results

```

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- For local development: Live Server extension (VS Code) or Python HTTP server
- For deployment: GitHub account

### Local Development (Live Server)

1. **Open in VS Code:**
   ```bash
   code .
   ```

2. **Start Live Server:**
   - Right-click `index.html`
   - Select "Open with Live Server"
   - Opens at `http://localhost:5500`

3. **Navigate:**
   - Home page has course overview
   - Click course cards to access lessons
   - Use search bar to find specific topics

### Local Development (Python HTTP Server)

```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

---

## 📖 Course Structure

### PathFit 1: Movement Competency Training
**9 Lessons + Quiz**
- Introduction to Physical Education
- PARQ (Physical Activity Readiness Questionnaire)
- Movement Enhancement Techniques
- Functional Movement Screen (FMS)
- Eating Habits & Nutrition
- Locomotor & Non-Locomotor Movement
- Dance Basics

### PathFit 2: Exercise-Based Fitness Activities
**14 Lessons + Quiz**
- Fitness Definitions & Concepts
- Exercise Principles (FITT)
- Benefits of Regular Exercise
- Training Types & Programs
- Weight Management
- Physical Fitness Testing
- Personal Fitness Planning

### PathFit 3 & 4: Applied Physical Activities
**20+ Lessons + Quiz**
- Dance Activities (Folk, Hip-Hop, Zumba)
- Sports Activities (Basketball, Volleyball, Pickleball, Badminton, Table Tennis, Swimming)
- Martial Arts & Combat Sports
- Group Exercises & Fitness
- Team Building & Recreational Games

---

## 🛠️ Technical Stack

| Layer | Technology | Files |
|-------|-----------|-------|
| **Frontend** | HTML5 | All `.html` files |
| **Styling** | CSS3 | `/assets/css/*.css` |
| **Interactivity** | Vanilla JavaScript | `/assets/js/*.js` |
| **Search** | JSON + Client-side Search | `/assets/search-index.json` + `search.js` |
| **Videos** | WebM format | `/assets/videos/*.webm` |
| **PDFs** | Standard PDF | `/assets/pdf/*.pdf` |
| **Deployment** | Static Site Hosting | GitHub Pages |

---

## 🔄 Path Structure (Important!)

### Root-Relative Paths (Recommended)
All files use **root-relative paths** for maximum compatibility:

```html
<!-- Images -->
<img src="/assets/images/logo/LPU-logo.svg" alt="LPU Logo">

<!-- Stylesheets -->
<link rel="stylesheet" href="/assets/css/main.css">

<!-- Scripts -->
<script src="/assets/js/main.js"></script>

<!-- Navigation -->
<a href="/pathfit1/lesson1_introduction_to_physical_education.html">Lesson 1</a>
<a href="/home_page.html#pathfit1">Go to PathFit 1</a>
```

**Why?** Root-relative paths work in both:
- ✅ Local development (Live Server)
- ✅ GitHub Pages deployment
- ✅ Any web server

---

## 🧪 Quality Assurance

### Run Tests
```powershell
.\test-website.ps1
```

### Test Coverage
- ✅ Broken file paths detection
- ✅ HTML syntax validation
- ✅ CSS brace matching
- ✅ JavaScript bracket matching
- ✅ Path compliance (root-relative vs relative)
- ✅ Missing alt attributes
- ✅ Duplicate element IDs

### Test Results
See: `TEST-RESULTS-ANALYSIS.md` and `website_test_report.txt`

---

## 📋 Maintenance Scripts

### `test-website.ps1`
Comprehensive QA test suite - run before every commit
```powershell
.\test-website.ps1
```

### `fix-paths.ps1`
Bulk path converter (if needed for future changes)
```powershell
.\fix-paths.ps1
```

### `verify-paths.ps1`
Path verification after changes
```powershell
.\verify-paths.ps1
```

---

## 🌐 Deployment

### Deploy to GitHub Pages

1. **Commit Changes:**
   ```bash
   git add -A
   git commit -m "Update: [description of changes]"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to Repository Settings
   - Navigate to Pages section
   - Select "Deploy from a branch"
   - Choose: `main` branch, `/root` folder
   - Wait 1-2 minutes for deployment

3. **Access Live Site:**
   ```
   https://rsjr-19.github.io/LPU-FitSpace-Static-Tutorial-Website-for-PathFit-1-4-/
   ```

4. **Verify Deployment:**
   - Test all course navigation
   - Check DevTools (F12) → Network tab for 404 errors
   - Test search functionality
   - Verify videos and PDFs load

---

## 🔧 Key Technologies & Features

### Single-Page Application (SPA)
- Uses hash-based routing (`#pathfit1`, `#lesson1`)
- Smooth navigation without page reloads
- Maintained state during navigation

### Sticky Header Navigation
- Always-visible navigation bar
- Course selector dropdown
- Search functionality in header
- Smooth scrolling with correct offset

### Search Functionality
- Full-text search across lessons
- Real-time filtering as you type
- Highlights matching results

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet & desktop
- Touch-friendly navigation

---

## 📊 Statistics

| Metric | Count |
|--------|-------|
| Total HTML Files | 54 |
| CSS Files | 11 |
| JavaScript Files | 9 |
| Total Lessons | 37 |
| Quiz Modules | 3 |
| Course Modules | 4 |
| Images | 100+ |
| Documentation Files | 7 |

---

## ✅ Recent Improvements (November 2025)

### Path Conversion
- ✅ Converted 53 HTML files from relative to root-relative paths
- ✅ 200+ path references updated
- ✅ Full GitHub Pages compatibility

### Bug Fixes
- ✅ Fixed sticky header scroll behavior with `scroll-padding-top` CSS
- ✅ Fixed search index loading path (removed double `/assets`)
- ✅ Removed `<base href>` tags for GitHub Pages compatibility
- ✅ Fixed navigation link routing

### Quality Assurance
- ✅ Created comprehensive test suite (`test-website.ps1`)
- ✅ Validated all file paths (100% pass rate)
- ✅ Verified CSS and JavaScript syntax
- ✅ Documented all changes and procedures

### Documentation
- ✅ Created 7 documentation files
- ✅ Added inline code comments
- ✅ Built reusable automation scripts

---

## 📝 Best Practices

### Adding New Lessons
1. Create HTML file in appropriate `/pathfitX/` directory
2. Follow naming: `lessonN_descriptive_title.html` (underscores, no spaces)
3. Use root-relative paths for all assets
4. Include descriptive alt text on all images
5. Update search index if adding new content

### Updating Styles
1. Modify course-specific CSS in `/pathfitX/css/pathfitX.css`
2. For global changes, update `/assets/css/main.css`
3. Test on multiple browsers
4. Run test suite before committing

### Adding Resources
1. Images: `/assets/images/pathfitX/`
2. PDFs: `/assets/pdf/`
3. Videos: `/assets/videos/`
4. Data JSON: `/pathfitX/data/`

---

## 🤝 Contributing

### Workflow
1. Create feature branch: `git checkout -b feature/description`
2. Make changes
3. Run tests: `.\test-website.ps1`
4. Commit: `git commit -m "Feature: description"`
5. Push: `git push origin feature/description`
6. Create Pull Request

### Code Style
- Use semantic HTML5 tags
- Follow existing CSS naming conventions
- Write clear, commented JavaScript
- Use root-relative paths consistently

---

## 🐛 Known Issues & Solutions

### Issue: Images not loading
- **Cause:** Relative path mismatch
- **Solution:** Check paths start with `/` (root-relative)

### Issue: Search not working
- **Cause:** `search-index.json` not found
- **Solution:** Ensure file exists at `/assets/search-index.json`

### Issue: Navigation breaks on GitHub Pages
- **Cause:** Relative paths like `../assets`
- **Solution:** Convert to root-relative: `/assets`

---

## 📞 Support & Troubleshooting

### Common Issues
- **404 Errors:** Check DevTools Network tab for missing files
- **Styling Issues:** Clear browser cache (Ctrl+Shift+Delete)
- **Navigation Issues:** Check hash links in home_page.js

### Testing
Run the comprehensive test suite:
```powershell
.\test-website.ps1
```

See detailed results in:
- Console output
- `website_test_report.txt` (full log)
- `TEST-RESULTS-ANALYSIS.md` (analysis)

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | This file - project overview |
| `TESTING-GUIDE.md` | How to test the website |
| `TEST-RESULTS-ANALYSIS.md` | QA test findings |
| `PATH-CONVERSION-COMPLETE.md` | Path conversion details |
| `PROJECT-COMPLETE.md` | Final project status |
| `STATUS-DASHBOARD.md` | Quick reference |

---

## 📄 License

This project is part of Lyceum-Philippines University's PathFit curriculum.

---

## 👨‍💻 Project Owner

**Repository:** `RSJR-19/LPU-FitSpace-Static-Tutorial-Website-for-PathFit-1-4-`
**Maintained by:** LPU Development Team
**Last Updated:** November 29, 2025

---

## 🎉 Quick Links

- 🏠 **Home Page:** `index.html`
- 📖 **Lessons:** `/pathfit1/`, `/pathfit2/`, `/pathfit3/`
- 🔍 **Search:** Built-in search functionality in header
- 📊 **Admin Resources:** See `1.OPEN_ME_PLEASE/` folder
- ✅ **QA Testing:** Run `test-website.ps1`

---

**Status:** ✅ Production Ready | **Last Tested:** November 29, 2025
