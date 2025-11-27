# File-by-File Issue Breakdown

## 🔴 CRITICAL: Hardcoded Active Classes - All Files Needing Fixes

### PathFit 1 (9 files) - All have "lesson6_Eating_Habits.html" marked as active
```
pathfit1/lesson1_introduction_to_physical_education.html
  Line 63: <a href="../pathfit1/lesson6_Eating_Habits.html" class="active">Eating Habits</a>
  → REMOVE: class="active"

pathfit1/lesson2_PARQ.html
  Line 63: <a href="../pathfit1/lesson6_Eating_Habits.html" class="active">Eating Habits</a>
  → REMOVE: class="active"

pathfit1/lesson3_Introduction_to_movement_enhancement.html
  Line 63: <a href="../pathfit1/lesson6_Eating_Habits.html" class="active">Eating Habits</a>
  → REMOVE: class="active"

pathfit1/lesson4_fms_lecture.html
  Line 63: <a href="../pathfit1/lesson6_Eating_Habits.html" class="active">Eating Habits</a>
  → REMOVE: class="active"

pathfit1/lesson5_Functional_Movement_Screen.html
  Line 63: <a href="../pathfit1/lesson6_Eating_Habits.html" class="active">Eating Habits</a>
  → REMOVE: class="active"

pathfit1/lesson6_Eating_Habits.html
  Line 63: <a href="../pathfit1/lesson6_Eating_Habits.html" class="active">Eating Habits</a>
  → REMOVE: class="active"

pathfit1/lesson7_Locomotor_and_Non_Locomotor.html
  Line 63: <a href="../pathfit1/lesson6_Eating_Habits.html" class="active">Eating Habits</a>
  → REMOVE: class="active"

pathfit1/lesson8_Basic_locomotor_and_Non_Locomotor_Dance.html
  Line 63: <a href="../pathfit1/lesson6_Eating_Habits.html" class="active">Eating Habits</a>
  → REMOVE: class="active"

pathfit1/lesson9_OK_DANCE_FULLVIDEO.html
  Line 63: <a href="../pathfit1/lesson6_Eating_Habits.html" class="active">Eating Habits</a>
  → REMOVE: class="active"
```

### PathFit 2 (14 files) - All have "lesson1_introduction_to_applied_physical_activities.html" marked as active
```
pathfit2/lesson1_definition_of_physical_fitness.html
  Line 95: <a href="./lesson1_introduction_to_applied_physical_activities.html" class="active">
  → REMOVE: class="active"

pathfit2/lesson2_definition_of_physical_activity.html
  Line 95: <a href="./lesson1_introduction_to_applied_physical_activities.html" class="active">
  → REMOVE: class="active"

pathfit2/lesson3_definition_of_fitness.html
  Line 95: <a href="./lesson1_introduction_to_applied_physical_activities.html" class="active">
  → REMOVE: class="active"

pathfit2/lesson4_fundamentals_of_fitness.html
  Line 95: <a href="./lesson1_introduction_to_applied_physical_activities.html" class="active">
  → REMOVE: class="active"

pathfit2/lesson5_definition_of_exercise.html
  Line 95: <a href="./lesson1_introduction_to_applied_physical_activities.html" class="active">
  → REMOVE: class="active"

pathfit2/lesson6_benefits_of_regular_exercise.html
  Line 95: <a href="./lesson1_introduction_to_applied_physical_activities.html" class="active">
  → REMOVE: class="active"

pathfit2/lesson7_definition_of_training.html
  Line 95: <a href="./lesson1_introduction_to_applied_physical_activities.html" class="active">
  → REMOVE: class="active"

pathfit2/lesson8_types_of_fitness_training.html
  Line 95: <a href="./lesson1_introduction_to_applied_physical_activities.html" class="active">
  → REMOVE: class="active"

pathfit2/lesson9_fitness_program_5_steps.html
  Line 95: <a href="./lesson1_introduction_to_applied_physical_activities.html" class="active">
  → REMOVE: class="active"

pathfit2/lesson10_sample_fitness_plan.html
  Line 95: <a href="./lesson1_introduction_to_applied_physical_activities.html" class="active">
  → REMOVE: class="active"

pathfit2/lesson11_fitt_principle.html
  Line 95: <a href="./lesson1_introduction_to_applied_physical_activities.html" class="active">
  → REMOVE: class="active"

pathfit2/lesson12_weight_management.html
  Line 95: <a href="./lesson1_introduction_to_applied_physical_activities.html" class="active">
  → REMOVE: class="active"

pathfit2/lesson13_physical_fitness_test.html
  Line 95: <a href="./lesson1_introduction_to_applied_physical_activities.html" class="active">
  → REMOVE: class="active"

pathfit2/lesson14_developing_a_personal_fitness_plan.html
  Line 95: <a href="./lesson1_introduction_to_applied_physical_activities.html" class="active">
  → REMOVE: class="active"
```

### PathFit 3 & 4 - Multiple Issues

#### Dance Activities (3 files)
```
pathfit3/pf3_dance_act/lesson1_folk_dance.html
  Issues: Hardcoded active + Path issues
  Line ~95: class="active" → REMOVE

pathfit3/pf3_dance_act/lesson2_modern_dance_hip_hop.html
  Issues: Hardcoded active + Path issues
  Line ~95: class="active" → REMOVE

pathfit3/pf3_dance_act/lesson3_zumba_dance.html
  Issues: Hardcoded active + Path issues
  Line ~95: class="active" → REMOVE
```

#### Sports Activities (6 files)
```
pathfit3/pf3_sports_act/lesson4_basketball.html
  Issues: Hardcoded active + Path issues
  Line ~45: class="active" → REMOVE
  Line ~101: "../lesson1_introduction_to_applied_physical_activities.html" 
    → CHANGE TO: "../../pathfit3/lesson1_introduction_to_applied_physical_activities.html"

pathfit3/pf3_sports_act/lesson5_volleyball.html
  Issues: Hardcoded active + Path issues + WRONG LABEL
  Line ~45: class="active" → REMOVE
  Line ~101: Path issue (same as basketball)
  Line ~133: "Basketball" → CHANGE TO: "Volleyball"

pathfit3/pf3_sports_act/lesson6_pickleball.html
  Issues: Hardcoded active + Path issues
  Line ~45: class="active" → REMOVE
  Line ~101: Path issue (same as basketball)

pathfit3/pf3_sports_act/lesson7_badminton.html
  Issues: Hardcoded active + Path issues
  Line ~45: class="active" → REMOVE
  Line ~101: Path issue (same as basketball)

pathfit3/pf3_sports_act/lesson8_table_tennis.html
  Issues: Hardcoded active + Path issues
  Line ~45: class="active" → REMOVE
  Line ~101: Path issue (same as basketball)

pathfit3/pf3_sports_act/lesson9_swimming.html
  Issues: Hardcoded active + Path issues
  Line ~45: class="active" → REMOVE
  Line ~101: Path issue (same as basketball)
```

#### Group Exercises (4 files)
```
pathfit3/pf3_group_exercises/lesson11_cardio_workouts.html
  Issues: Hardcoded active
  Line ~95: class="active" → REMOVE

pathfit3/pf3_group_exercises/lesson12_core_and_circuit_training.html
  Issues: Hardcoded active
  Line ~95: class="active" → REMOVE

pathfit3/pf3_group_exercises/lesson13_outdoor_and_adventure.html
  Issues: Hardcoded active
  Line ~95: class="active" → REMOVE

pathfit3/pf3_group_exercises/lesson14_hiking_and_trekking.html
  Issues: Hardcoded active
  Line ~95: class="active" → REMOVE
```

#### Martial Arts & Other (3 files)
```
pathfit3/lesson1_Introduction_to_applied_physical_activities.html
  Issues: Hardcoded active
  Line ~95: class="active" → REMOVE

pathfit3/lesson10_arnis.html
  Issues: Hardcoded active
  Line ~95: class="active" → REMOVE

pathfit3/lesson15_team_building_and_recreational_games.html
  Issues: Hardcoded active
  Line ~95: class="active" → REMOVE
```

---

## 🟠 JavaScript Files Needing Updates

### pathfit1/js/pathfit1.js
```javascript
// CURRENT (lines 1-12):
document.addEventListener("DOMContentLoaded", () => {
  const pathfit2Tab = document.querySelector("#dropdown1");
  const arrow2 = document.querySelector("#arrow1");
  const tab2 = document.querySelectorAll(".lesson-tab")[0];

  pathfit2Tab.classList.add("active");
  arrow2.classList.add("active");
  tab2.classList.add("active");
});

// This is OK - continues to work after other fixes
// Just ensures PathFit 1 module is expanded on any pf1 lesson page
```

### pathfit2/js/pathfit2.js
```javascript
// Same as above but for PathFit 2
// No changes needed - continues to work
```

### pathfit3/js/pathfit3.js
```javascript
// Same as above but for PathFit 3
// No changes needed - continues to work
```

### assets/js/main.js - NEEDS NEW FUNCTION
```javascript
// ADD THIS FUNCTION (anywhere in the file):
function highlightCurrentLesson() {
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split('/').pop();
  
  if (!currentFile || currentFile === '' || currentFile === 'home_page.html') {
    return; // Not on a lesson page
  }
  
  const allLinks = document.querySelectorAll('.dropdown a, .dropdown2 a');
  
  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Extract filename from href
    const hrefFile = href.split('/').pop();
    
    // Check if this link points to current page
    if (hrefFile === currentFile || href.includes(currentFile)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ADD THIS EVENT LISTENER (at the end of DOMContentLoaded if it exists, or add new):
document.addEventListener('DOMContentLoaded', function() {
  highlightCurrentLesson();
});

// ALSO ADD THIS for when user navigates back/forward:
window.addEventListener('popstate', highlightCurrentLesson);
```

---

## 🟡 Content Issues

### pathfit3/pf3_sports_act/lesson5_volleyball.html
```
Location: Line 133 in the Sports Activities dropdown section

CURRENT (WRONG):
<a href="lesson5_volleyball.html">Basketball</a>

CORRECT:
<a href="lesson5_volleyball.html">Volleyball</a>

Why: User clicks link thinking it's Basketball, but gets Volleyball page
```

---

## 📊 SUMMARY TABLE

| Issue Type | File Count | Total Instances | Fix Complexity | Priority |
|---|---|---|---|---|
| Hardcoded class="active" | 26+ files | 26+ instances | Very Easy (find-replace) | 🔴 CRITICAL |
| Missing dynamic function | 1 file (main.js) | 1 instance | Easy (add function) | 🔴 CRITICAL |
| Path routing errors | 6 files | 6+ instances | Easy (path fix) | 🟠 MEDIUM |
| Wrong label content | 1 file | 1 instance | Trivial (text change) | 🟡 LOW |
| **TOTAL** | **34+ files** | **35+ instances** | **Low complexity** | **1-2 hours** |

---

## 🚀 QUICK FIX STRATEGY

### Option 1: Manual Fix (Conservative, Takes Longer)
1. Open each file
2. Find the line with `class="active"`
3. Delete the attribute
4. Save and test

### Option 2: Automated Find-Replace (Faster, Recommended)
1. Use VS Code Find and Replace (Ctrl+H)
2. Find: ` class="active"`
3. Replace with: (empty)
4. Replace All
5. This will fix all 26+ files in one action
6. Then manually verify 3-4 files to ensure correct

### Option 3: Bulk + Manual
1. Use find-replace to remove all `class="active"`
2. Manually add the JavaScript function to main.js
3. Test thoroughly

---

**Total Time to Fix:** 1-2 hours
**Difficulty:** Low (mostly mechanical changes)
**Risk Level:** Very Low (simple deletions and one function addition)

Last Updated: November 27, 2025
