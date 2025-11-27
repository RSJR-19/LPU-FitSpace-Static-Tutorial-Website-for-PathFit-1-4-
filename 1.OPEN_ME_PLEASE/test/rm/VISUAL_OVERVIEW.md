# Routing & Active Class Issues - Visual Overview

## Current vs. Desired Behavior

### ❌ CURRENT (BROKEN) BEHAVIOR
```
User visits: pathfit2/lesson5_definition_of_exercise.html
                          ↓
              HTML loads with sidebar
                          ↓
           Sidebar shows "Eating Habits" 
         as active (hardcoded - WRONG!)
                          ↓
        No matter which lesson you view,
    "Eating Habits" will always be highlighted
                          ↓
            User confusion 😞
```

### ✅ DESIRED (FIXED) BEHAVIOR
```
User visits: pathfit2/lesson5_definition_of_exercise.html
                          ↓
              HTML loads with sidebar
                          ↓
          JavaScript detects current file:
         "lesson5_definition_of_exercise.html"
                          ↓
     Finds link with matching filename
     Adds "active" class to that link
                          ↓
    Sidebar highlights: "Definition of Exercise"
    PathFit 2 dropdown is expanded
                          ↓
            Clear user orientation ✓
```

---

## Issue Distribution Map

```
LPU-FitSpace-Static-Tutorial-Website/
│
├── pathfit1/
│   ├── lesson1_introduction_to_physical_education.html      ⚠️ Hardcoded active
│   ├── lesson2_PARQ.html                                     ⚠️ Hardcoded active
│   ├── lesson3_Introduction_to_movement_enhancement.html     ⚠️ Hardcoded active
│   ├── lesson4_fms_lecture.html                             ⚠️ Hardcoded active
│   ├── lesson5_Functional_Movement_Screen.html              ⚠️ Hardcoded active
│   ├── lesson6_Eating_Habits.html                           🔴 HARDCODED ACTIVE HERE
│   ├── lesson7_Locomotor_and_Non_Locomotor.html             ⚠️ Hardcoded active
│   ├── lesson8_Basic_locomotor_and_Non_Locomotor_Dance.html ⚠️ Hardcoded active
│   ├── lesson9_OK_DANCE_FULLVIDEO.html                      ⚠️ Hardcoded active
│   └── js/
│       └── pathfit1.js                                       🟠 No dynamic logic
│
├── pathfit2/
│   ├── lesson1_definition_of_physical_fitness.html          ⚠️ Hardcoded active
│   ├── lesson2_definition_of_physical_activity.html         ⚠️ Hardcoded active
│   ├── lesson3_definition_of_fitness.html                   ⚠️ Hardcoded active
│   ├── lesson4_fundamentals_of_fitness.html                 ⚠️ Hardcoded active
│   ├── lesson5_definition_of_exercise.html                  ⚠️ Hardcoded active
│   ├── lesson6_benefits_of_regular_exercise.html            ⚠️ Hardcoded active
│   ├── lesson7_definition_of_training.html                  ⚠️ Hardcoded active
│   ├── lesson8_types_of_fitness_training.html               ⚠️ Hardcoded active
│   ├── lesson9_fitness_program_5_steps.html                 ⚠️ Hardcoded active
│   ├── lesson10_sample_fitness_plan.html                    ⚠️ Hardcoded active
│   ├── lesson11_fitt_principle.html                         ⚠️ Hardcoded active
│   ├── lesson12_weight_management.html                      ⚠️ Hardcoded active
│   ├── lesson13_physical_fitness_test.html                  ⚠️ Hardcoded active
│   ├── lesson14_developing_a_personal_fitness_plan.html     ⚠️ Hardcoded active
│   └── js/
│       └── pathfit2.js                                       🟠 No dynamic logic
│
├── pathfit3/
│   ├── lesson1_Introduction_to_applied_physical_activities.html  ⚠️ Hardcoded active
│   ├── lesson10_arnis.html                                       ⚠️ Hardcoded active
│   ├── lesson15_team_building_and_recreational_games.html        ⚠️ Hardcoded active
│   ├── pf3_dance_act/
│   │   ├── lesson1_folk_dance.html                  ⚠️ Hardcoded active + 🟡 Path issue
│   │   ├── lesson2_modern_dance_hip_hop.html        ⚠️ Hardcoded active + 🟡 Path issue
│   │   └── lesson3_zumba_dance.html                 ⚠️ Hardcoded active + 🟡 Path issue
│   ├── pf3_sports_act/
│   │   ├── lesson4_basketball.html                  ⚠️ Hardcoded active + 🟡 Path issue
│   │   ├── lesson5_volleyball.html                  ⚠️ Hardcoded active + 🟡 Path issue + 🟡 WRONG LABEL
│   │   ├── lesson6_pickleball.html                  ⚠️ Hardcoded active + 🟡 Path issue
│   │   ├── lesson7_badminton.html                   ⚠️ Hardcoded active + 🟡 Path issue
│   │   ├── lesson8_table_tennis.html                ⚠️ Hardcoded active + 🟡 Path issue
│   │   └── lesson9_swimming.html                    ⚠️ Hardcoded active + 🟡 Path issue
│   ├── pf3_group_exercises/
│   │   ├── lesson11_cardio_workouts.html            ⚠️ Hardcoded active
│   │   ├── lesson12_core_and_circuit_training.html  ⚠️ Hardcoded active
│   │   ├── lesson13_outdoor_and_adventure.html      ⚠️ Hardcoded active
│   │   └── lesson14_hiking_and_trekking.html        ⚠️ Hardcoded active
│   └── js/
│       └── pathfit3.js                              🟠 No dynamic logic
│
└── assets/
    └── js/
        ├── main.js                                   🟠 Missing dynamic highlighting function
        └── home_page.js                              (This is for home_page.html, OK)
```

---

## Issue Severity Matrix

```
┌─────────────────────────────────────────────────────┐
│             ISSUE SEVERITY BREAKDOWN                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  🔴 CRITICAL (Fix Immediately)                     │
│  ├─ Hardcoded .active class (26+ files)            │
│  │  Impact: Sidebar never shows current lesson     │
│  │  Files: pathfit1/*, pathfit2/*, pathfit3/*      │
│  │  Instances: 50+                                 │
│  │                                                 │
│  └─ No dynamic highlighting logic (3 JS files)     │
│     Impact: No URL-based active class assignment   │
│     Files: pathfit1.js, pathfit2.js, pathfit3.js   │
│                                                     │
│  🟠 MEDIUM (Fix Soon)                              │
│  ├─ Path routing errors                            │
│  │  Impact: Navigation links may not work          │
│  │  Files: pathfit3/pf3_sports_act/*               │
│  │  Instances: 6 files                             │
│  │                                                 │
│  └─ Missing dynamic path logic in main.js          │
│     Impact: Sidebar doesn't close/expand properly  │
│                                                     │
│  🟡 LOW (Fix When Time Permits)                    │
│  └─ Duplicate label                                │
│     Impact: UI confusion only                      │
│     Files: pathfit3/pf3_sports_act/lesson5_*.html  │
│     Instances: 1                                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Code Flow Comparison

### BEFORE (Current - Broken)
```
HTML File Loads
     ↓
sidebar contains: <a href="lesson6.html" class="active">Eating Habits</a>
     ↓
pathfit2.js runs: document.querySelector("#dropdown2").classList.add("active")
     ↓
Result: BOTH "Eating Habits" AND dropdown2 show as active (WRONG!)
     ↓
User sees wrong lesson highlighted
```

### AFTER (Fixed)
```
HTML File Loads
     ↓
sidebar contains: <a href="lesson5.html">Definition of Exercise</a>  (no active class)
     ↓
main.js runs: highlightCurrentLesson()
  - Gets current filename: "lesson5_definition_of_exercise.html"
  - Finds matching link in sidebar
  - Adds "active" class to that link
     ↓
pathfit2.js runs: document.querySelector("#dropdown2").classList.add("active")
  - This expands the dropdown
     ↓
Result: ONLY "Definition of Exercise" shows as active (CORRECT!)
     ↓
User sees correct lesson highlighted
```

---

## Required Code Changes Summary

### File: ALL lesson*.html files (26+ files in pathfit1/, pathfit2/, pathfit3/*)
```diff
- <a href="..." class="active">Lesson Name</a>
+ <a href="...">Lesson Name</a>
```
Change needed: Remove `class="active"` from all sidebar links

---

### File: assets/js/main.js
```javascript
// ADD THIS NEW FUNCTION:
function highlightCurrentLesson() {
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split('/').pop();
  
  if (!currentFile) return; // No file (we're on home_page.html)
  
  const allLinks = document.querySelectorAll('.dropdown a, .dropdown2 a');
  
  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Check if this link points to the current file
    if (href.includes(currentFile)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// RUN ON LOAD (add to existing DOMContentLoaded or create new one)
document.addEventListener('DOMContentLoaded', highlightCurrentLesson);
```

---

### File: pathfit3/pf3_sports_act/* (lesson4_basketball.html, etc.)
```diff
- <a href="../lesson1_introduction_to_applied_physical_activities.html">
+ <a href="../../pathfit3/lesson1_introduction_to_applied_physical_activities.html">
```

---

### File: pathfit3/pf3_sports_act/lesson5_volleyball.html
```diff
- <a href="lesson5_volleyball.html">Basketball</a>
+ <a href="lesson5_volleyball.html">Volleyball</a>
```

---

## Testing Workflow

```
FOR EACH LESSON FILE:

1. Visit the lesson page
2. Check sidebar:
   ✓ Correct course module is expanded (PathFit 1, 2, or 3)
   ✓ Correct subcategory is expanded (if applicable)
   ✓ Current lesson link is highlighted with "active" class
   ✓ NO OTHER lesson is highlighted
   ✓ All navigation links work

3. Repeat for all 50+ lesson pages
```

---

**Status:** Analysis Complete ✓  
**Next Step:** Implement fixes per priority order  
**Estimated Fix Time:** 2-4 hours (50+ files + 3 JS files)

Generated: November 27, 2025
