# LPU FitSpace - Website Sitemap

## Visual Sitemap Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          LPU FITSPACE WEBSITE                               │
│                       (Entry: index.html)                                   │
└────────────────────────────┬────────────────────────────────────────────────┘
                             │
                   ┌─────────▼─────────┐
                   │   Landing Page    │
                   │   (index.html)    │
                   └─────────┬─────────┘
                             │
                             ▼
                   ┌─────────────────────┐
                   │   HOME PAGE         │
                   │  (home_page.html)   │
                   └──┬──────┬──────┬────┘
                      │      │      │
        ┌─────────────┘      │      └──────────────┐
        │                    │                     │
        ▼                    ▼                     ▼
    ┌──────────┐      ┌──────────────┐     ┌─────────────┐
    │ PATHFIT 1│      │ PATHFIT 2    │     │ PATHFIT 3&4 │
    └──┬───┬───┘      └──┬────────┬──┘     └─────┬───────┘
       │   │             │        │              │
       │   │             │        │              │
       ▼   ▼             ▼        ▼              ▼
   ┌─────────────┐   ┌────────┐ ┌──────────┐  ┌─────────────┐
   │ 8 Lessons   │   │7 Lessons│ │Quiz List │  │13+ Lessons  │
   │  + Quiz     │   │+ Quiz   │ │(Module   │  │  + Quiz     │
   │  Content    │   │Content  │ │Selection)│  │  Content    │
   └─────────────┘   └────────┘ └──────────┘  └─────────────┘
         │                 │          │              │
         │                 │          │       ┌──────┼────────┐
         │                 │          │       │      │        │
         ▼                 ▼          ▼       ▼      ▼        ▼
    ┌──────────┐      ┌─────────┐ ┌──────┐ ┌───┐ ┌───┐  ┌─────────┐
    │Lesson    │      │Lesson   │ │Quiz  │ │PE │ │DA │  │Applied  │
    │Pages HTML│      │Pages    │ │Pages │ │&  │ │&  │  │Physical │
    │+ JSON    │      │+ JSON   │ │HTML/ │ │FT │ │RE │  │Activity │
    │Quiz Data │      │Quiz Data│ │CSS/JS│ │   │ │   │  │Lessons  │
    └──────────┘      └─────────┘ └──────┘ └───┘ └───┘  └─────────┘
         │                 │          │       │   │
         │                 │          │       │   │
         └─────────────────┴──────────┴───────┴───┘
                           │
                           ▼
                    ┌──────────────────┐
                    │ SUPPORT FEATURES │
                    │  - Global Search │
                    │  - Navigation    │
                    │  - Slideshow     │
                    │  - Footer        │
                    └──────────────────┘
```

---

## Detailed Page Structure

### 1. **Landing Page** (`index.html`)
- **Purpose**: Entry point to the website
- **Features**:
  - Hero section with video background
  - Brand introduction
  - "Start Learning" button → directs to `home_page.html`
- **Assets Used**: 
  - Video: `assets/videos/Banner-Video.webm`
  - Logo: `assets/images/logo/fitspace_logo.svg`

### 2. **Home/Main Hub** (`home_page.html`)
- **Purpose**: Central navigation and content hub
- **Navigation Menu**:
  - Home (current page)
  - PathFit (dropdown)
    - PathFit 1
    - PathFit 2
    - PathFit 3 & 4
  - Mission & Vision
  - About Us
- **Search Feature**: Site-wide search powered by `assets/search-index.json`
- **Content Sections**:
  - Slideshow carousel
  - PathFit 1 overview
  - PathFit 2 overview
  - PathFit 3 & 4 overview
  - Quiz section
  - Mission & Vision
  - About Us
- **Styling**: `assets/css/structure.css`, `slideshow.css`, `search.css`

---

## 3. **PathFit 1 Module** (`/pathfit1/`)

### Structure:
```
pathfit1/
├── Lesson HTML files (8 lessons)
├── css/
│   └── pathfit1.css
├── js/
│   └── pathfit1.js
└── data/
    └── JSON lesson content (5 files)
```

### Lessons:
1. `lesson1_introduction_to_physical_education.html`
2. `lesson2_PARQ.html`
3. `lesson3_Introduction_to_movement_enhancement.html`
4. `lesson4_fms_lecture.html`
5. `lesson5_Functional_Movement_Screen.html`
6. `lesson6_Eating_Habits.html`
7. `lesson7_Locomotor_and_Non_Locomotor.html`
8. `lesson9_OK_DANCE_FULLVIDEO.html` (Dance video lesson)

### Features:
- Structured lesson content with JSON data
- Module-specific styling
- Interactive lesson navigation

---

## 4. **PathFit 2 Module** (`/pathfit2/`)

### Structure:
```
pathfit2/
├── Lesson HTML files (7 lessons)
├── pathfit2_quiz_list.html
├── css/
│   └── pathfit2.css
├── js/
│   └── pathfit2.js
└── data/
    └── JSON quiz content (8+ files)
```

### Lessons:
1. `lesson1_introduction_to_fitness_definitions_components.html`
2. `lesson2_fundamentals_of_fitness_and_fitt.html`
3. `lesson3_types_of_fitness_training.html`
4. `lesson4_fitness_assessment_and_screening.html`
5. `lesson5_benefits_of_regular_exercise.html`
6. `lesson6_weight_management.html`
7. `lesson7_designing_personal_fitness_program.html`

### Quiz Hub:
- `pathfit2_quiz_list.html`: Central quiz selection page
- Links to interactive quiz modules with instant scoring

---

## 5. **PathFit 3 & 4 Modules** (`/pathfit3/`)

### Structure:
```
pathfit3/
├── Main lessons (3 overview pages)
├── pf3_dance_act/           [Dance Activities]
│   ├── lesson1_folk_dance.html
│   ├── lesson2_modern_dance_hip_hop.html
│   ├── lesson3_zumba_dance.html
│   └── data/ (JSON)
├── pf3_sports_act/          [Sports Activities]
│   ├── lesson4_basketball.html
│   ├── lesson5_volleyball.html
│   ├── lesson6_pickleball.html
│   ├── lesson7_badminton.html
│   ├── lesson8_table_tennis.html
│   ├── lesson9_swimming.html
│   └── data/ (JSON)
├── pf3_group_exercises/     [Group Exercise Activities]
│   ├── lesson11_cardio_workouts.html
│   ├── lesson12_core_and_circuit_training.html
│   ├── lesson13_outdoor_and_adventure.html
│   ├── lesson14_hiking_and_trekking.html
│   └── data/ (JSON)
├── css/
│   └── pathfit3.css
├── js/
│   └── pathfit3.js
└── data/
    └── JSON overview content
```

### Subcategories:

#### **A. Dance Activities** (`pf3_dance_act/`)
- Folk Dance
- Modern Dance & Hip Hop
- Zumba Dance

#### **B. Sports Activities** (`pf3_sports_act/`)
- Basketball
- Volleyball
- Pickleball
- Badminton
- Table Tennis
- Swimming

#### **C. Group Exercises** (`pf3_group_exercises/`)
- Cardio Workouts
- Core & Circuit Training
- Outdoor & Adventure
- Hiking & Trekking

---

## 6. **Quiz Module** (`/quiz/`)

### Structure:
```
quiz/
├── quiz_list.html         [All quizzes hub]
├── quiz.html              [Individual quiz template]
├── quiz.js                [Quiz logic & scoring]
└── quiz.css               [Quiz styling]
```

### Features:
- Centralized quiz listing and selection
- Interactive quiz interface with:
  - Multiple-choice questions
  - Instant feedback
  - Score calculation
  - Progress tracking

---

## 7. **Global Assets** (`/assets/`)

### CSS (`assets/css/`)
- `main.css` - Global styles
- `landing_page.css` - Landing page specific
- `structure.css` - Main layout structure
- `slideshow.css` - Carousel/slideshow animations
- `search.css` - Search interface
- `footer.css` - Footer styling

### Images (`assets/images/`)
- **logo/** - LPU & FitSpace branding
- **graphic-box/** - Lesson illustrations (pf1, pf2, pf3, pf4)
- **pathfit1/** - PE & fitness education visuals
- **pathfit2/** - Exercise & fitness training visuals
- **pathfit3/** - Sports, dance, and activity images
- **table_of_index/** - LPU campus graphics

### JavaScript (`assets/js/`)
- `main.js` - Global navigation & page routing
- `home_page.js` - Home page specific logic
- `search.js` - Search functionality
- `slideshow.js` - Carousel animations

### Data (`assets/`)
- `search-index.json` - Search index for all lessons

### Media (`assets/`)
- **pdf/** - PAR-Q and FMS assessment sheets
- **videos/** - Banner video

---

## Navigation Flow

```
index.html
    ↓
    ├─→ Start Learning Button
    │       ↓
    │   home_page.html
    │       │
    │       ├─→ PathFit 1 Link → pathfit1/ lessons
    │       ├─→ PathFit 2 Link → pathfit2/ lessons
    │       ├─→ PathFit 3&4 Link → pathfit3/ lessons
    │       ├─→ Search → search results (from search-index.json)
    │       ├─→ Mission & Vision → Internal section
    │       └─→ About Us → Internal section
    │
    └─→ Direct Links (if known)
        └─→ /pathfit1/, /pathfit2/, /pathfit3/, /quiz/
```

---

## URL Patterns

| Page | URL Pattern |
|------|-------------|
| Landing | `index.html` |
| Home Hub | `home_page.html` |
| PathFit 1 Lessons | `pathfit1/lesson*.html` |
| PathFit 2 Lessons | `pathfit2/lesson*.html` |
| PathFit 2 Quiz | `pathfit2/pathfit2_quiz_list.html` |
| PathFit 3 Main | `pathfit3/lesson*.html` |
| Dance Lessons | `pathfit3/pf3_dance_act/lesson*.html` |
| Sports Lessons | `pathfit3/pf3_sports_act/lesson*.html` |
| Group Exercises | `pathfit3/pf3_group_exercises/lesson*.html` |
| Quiz System | `quiz/quiz.html` |

---

## Statistics Summary

| Category | Count |
|----------|-------|
| HTML Pages | 36 |
| CSS Files | 10 |
| JavaScript Files | 8 |
| JSON Data Files | 30 |
| Total Lessons | 25+ |
| Images | 111 |
| Total Resources | 200+ |

---

## Content Hierarchy Summary

```
FITSPACE WEBSITE (Root)
│
├── PATHFIT 1: Movement Competency & PE Principles
│   ├── Introduction to Physical Education
│   ├── PAR-Q (Physical Activity Readiness)
│   ├── Movement Enhancement
│   ├── Functional Movement Screen (FMS)
│   ├── Eating Habits & Nutrition
│   ├── Locomotor & Non-Locomotor Movements
│   └── Dance Video Content
│
├── PATHFIT 2: Exercise-Based Fitness Training
│   ├── Fitness Definitions & Components
│   ├── FITT Principles (Frequency, Intensity, Time, Type)
│   ├── Types of Fitness Training
│   ├── Fitness Assessment & Screening
│   ├── Benefits of Regular Exercise
│   ├── Weight Management
│   ├── Designing Personal Fitness Programs
│   └── Interactive Quizzes
│
├── PATHFIT 3 & 4: Applied Physical Activities
│   ├── Dance Activities
│   │   ├── Folk Dance
│   │   ├── Modern Dance & Hip Hop
│   │   └── Zumba Dance
│   ├── Sports Activities
│   │   ├── Basketball
│   │   ├── Volleyball
│   │   ├── Pickleball
│   │   ├── Badminton
│   │   ├── Table Tennis
│   │   └── Swimming
│   ├── Group Exercises
│   │   ├── Cardio Workouts
│   │   ├── Core & Circuit Training
│   │   ├── Outdoor & Adventure
│   │   └── Hiking & Trekking
│   └── Arnis (Martial Arts)
│
├── SUPPORT FEATURES
│   ├── Site-Wide Search
│   ├── Navigation System
│   ├── Interactive Slideshow
│   ├── Quiz System
│   ├── Responsive Design
│   └── Department Information
│
└── ADDITIONAL RESOURCES
    ├── PAR-Q PDF
    ├── FMS Assessment Sheet
    ├── Department Mission & Vision
    └── About Us Information
```

