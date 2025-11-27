# LPU FitSpace - Routing & Active Class Audit Report
**Date:** November 27, 2025  
**Status:** ⚠️ ISSUES FOUND - Multiple routing and active class highlighting problems detected

---

## Executive Summary

The website has **CRITICAL ROUTING AND ACTIVE CLASS ISSUES** that prevent proper sidebar highlighting of the currently viewed lesson. The active class implementation is **hardcoded and static** rather than dynamic, meaning the sidebar doesn't update based on which lesson the user is viewing.

---

## 🔴 CRITICAL ISSUES FOUND

### 1. **HARDCODED ACTIVE CLASS (HIGH PRIORITY)**
**Impact:** Sidebar never highlights the currently viewing lesson properly

**Problem:**  
- All PathFit 1 lesson files have hardcoded `class="active"` on **lesson6_Eating_Habits.html**
- All PathFit 2 lesson files have hardcoded `class="active"` on a link in the PathFit 3 section (introduction link)
- All PathFit 3 lesson files have the same hardcoded active class
- This means no matter which lesson you're viewing, the sidebar always highlights the same link

**Files Affected:**
```
pathfit1/lesson*.html (all files)
pathfit2/lesson*.html (all files)
pathfit3/pf3_dance_act/lesson*.html (all files)
pathfit3/pf3_sports_act/lesson*.html (all files)
pathfit3/pf3_group_exercises/lesson*.html (all files)
pathfit3/lesson*.html (all files)
```

**Current Code Example** (pathfit1/lesson1_introduction_to_physical_education.html, line 63):
```html
<a href="../pathfit1/lesson6_Eating_Habits.html" class="active">Eating Habits</a>
```

**Issue:** This should be removed and applied dynamically by JavaScript based on the current page URL.

---

### 2. **INCORRECT RELATIVE PATHS IN PATHFIT 3 SIDEBAR (MEDIUM PRIORITY)**
**Impact:** Navigation links may not work correctly from PathFit 3 lessons

**Problem:** PathFit 3 sidebar uses inconsistent path prefixes:

**Current (INCORRECT):**
```html
<!-- In pathfit3/pf3_sports_act/lesson4_basketball.html, line ~101 -->
<a href="../lesson1_introduction_to_applied_physical_activities.html">Introduction to...</a>
<!-- Should be: -->
<a href="../../pathfit3/lesson1_introduction_to_applied_physical_activities.html">
```

**Location Issues by Subdirectory:**
- `pathfit3/pf3_sports_act/` → Uses relative paths like `lesson4_basketball.html` (incorrect)
- `pathfit3/pf3_dance_act/` → Uses relative paths like `../pf3_dance_act/lesson1_folk_dance.html` (may work but inconsistent)
- `pathfit3/pf3_group_exercises/` → Similar path inconsistencies

**Details:**
| Source File Location | Current Path | Should Be | Working? |
|---|---|---|---|
| pathfit3/pf3_sports_act/ | `lesson4_basketball.html` | `./lesson4_basketball.html` | ✅ YES* |
| pathfit3/pf3_sports_act/ | `lesson5_volleyball.html` | `./lesson5_volleyball.html` | ✅ YES* |
| pathfit3/pf3_dance_act/ | `../pf3_dance_act/lesson1_folk_dance.html` | `./lesson1_folk_dance.html` | ✅ YES (but inconsistent) |
| pathfit3/ | `../lesson1_introduction_to_applied_physical_activities.html` | WRONG PATH | ❌ NO |

*Note: Relative paths within same directory may work but are inconsistent with other modules.

---

### 3. **NO DYNAMIC ACTIVE LINK DETECTION (HIGH PRIORITY)**
**Impact:** User cannot see which lesson they're currently viewing

**Current Implementation:**
- `pathfit1.js` - Only activates the entire PathFit 1 dropdown (line 8-12)
- `pathfit2.js` - Only activates the entire PathFit 2 dropdown (line 8-12)
- `pathfit3.js` - Only activates the entire PathFit 3 dropdown (line 8-12)

**What's Missing:**
No JavaScript logic to:
1. Parse the current page URL
2. Identify which lesson file is currently being viewed
3. Add the `.active` class to the corresponding link in the sidebar

**Current Code** (pathfit2.js):
```javascript
document.addEventListener("DOMContentLoaded", () => {
  const pathfit2Tab = document.querySelector("#dropdown2");
  const arrow2 = document.querySelector("#arrow2");
  const tab2 = document.querySelectorAll(".lesson-tab")[1];

  // Only adds active to dropdown, NOT the specific lesson link
  pathfit2Tab.classList.add("active");
  arrow2.classList.add("active");
  tab2.classList.add("active");
});
```

---

### 4. **DUPLICATE CONTENT (MEDIUM PRIORITY)**
**Impact:** Misleading navigation

**Problem:** In pathfit3/pf3_sports_act lesson files, the "Volleyball" link is labeled as "Basketball"

**Location:** pathfit3/pf3_sports_act/lesson4_basketball.html (and other pf3_sports_act files), line ~133:
```html
<a href="lesson5_volleyball.html">Basketball</a>  <!-- WRONG: Should be "Volleyball" -->
```

---

## 📊 DETAILED ISSUE BREAKDOWN

### Issue 1: Hardcoded Active Classes

**Severity:** 🔴 CRITICAL  
**Type:** Static HTML  
**Affected Files:** 26+ lesson files

**Examples:**

| File | Hardcoded Active Link |
|------|---|
| pathfit1/lesson1_introduction_to_physical_education.html | lesson6_Eating_Habits.html |
| pathfit1/lesson2_PARQ.html | lesson6_Eating_Habits.html |
| pathfit2/lesson1_definition_of_physical_fitness.html | lesson1_introduction_to_applied_physical_activities.html (PathFit3) |
| pathfit2/lesson2_definition_of_physical_activity.html | lesson1_introduction_to_applied_physical_activities.html (PathFit3) |
| pathfit3/pf3_sports_act/lesson4_basketball.html | lesson6_Eating_Habits.html |

**Root Cause:** Sidebars were copied from templates without updating the active class per file

---

### Issue 2: Path Inconsistencies in PathFit 3

**Severity:** 🟠 MEDIUM  
**Type:** Navigation routing  
**Affected Files:** pathfit3/pf3_sports_act/*, pathfit3/pf3_dance_act/*, pathfit3/pf3_group_exercises/*

**Path Problems:**

```html
<!-- In pathfit3/pf3_sports_act/lesson4_basketball.html -->

<!-- ❌ WRONG: From pf3_sports_act, trying to navigate to pathfit3 root -->
<a href="../lesson1_introduction_to_applied_physical_activities.html">Introduction to Applied Physical Activities</a>

<!-- ✅ CORRECT: Should reference full path or use ./ for same directory -->
<a href="../../pathfit3/lesson1_introduction_to_applied_physical_activities.html">Introduction to Applied Physical Activities</a>
<!-- OR for same directory sports files -->
<a href="lesson4_basketball.html">Basketball</a>
```

---

### Issue 3: Missing Dynamic Active Class Logic

**Severity:** 🔴 CRITICAL  
**Type:** JavaScript logic  
**Missing Implementation:** URL-based link highlighting

**What Should Happen:**
1. User visits `pathfit2/lesson1_definition_of_physical_fitness.html`
2. JavaScript detects current page is `lesson1_definition_of_physical_fitness.html`
3. Script finds link with href containing that filename
4. Script adds `class="active"` to that link
5. Script ensures PathFit 2 dropdown is expanded

**What Actually Happens:**
1. User visits `pathfit2/lesson1_definition_of_physical_fitness.html`
2. Hardcoded `class="active"` on lesson6_Eating_Habits.html is shown (WRONG)
3. No dynamic highlighting occurs

---

### Issue 4: Label Duplicates

**Severity:** 🟡 LOW  
**Type:** Content/UX  
**Location:** pathfit3/pf3_sports_act/* files, line ~133

```html
<!-- lesson4_basketball.html shows correctly -->
<a href="lesson4_basketball.html">Basketball</a> ✅

<!-- lesson5_volleyball.html shows INCORRECTLY -->
<a href="lesson5_volleyball.html">Basketball</a> ❌ Should be "Volleyball"
```

---

## 📝 RECOMMENDED SOLUTIONS

### Solution 1: Remove All Hardcoded `class="active"` (IMMEDIATE)
**Action:** Delete `class="active"` from all lesson sidebar links

**Before:**
```html
<a href="../pathfit1/lesson6_Eating_Habits.html" class="active">Eating Habits</a>
```

**After:**
```html
<a href="../pathfit1/lesson6_Eating_Habits.html">Eating Habits</a>
```

---

### Solution 2: Implement Dynamic Active Link Detection (PRIORITY 1)
**Action:** Create a universal JavaScript function in `main.js`

**New Function to Add:**
```javascript
function highlightCurrentLesson() {
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split('/').pop();
  
  // Find all sidebar links
  const sidebarLinks = document.querySelectorAll('.dropdown a, .dropdown2 a');
  
  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    const linkFile = href.split('/').pop();
    
    if (linkFile === currentFile) {
      link.classList.add('active');
      
      // Ensure parent dropdown is open
      const parentDropdown = link.closest('.dropdown, .dropdown2');
      if (parentDropdown) {
        parentDropdown.classList.add('active');
      }
      
      // Ensure course module is expanded
      const parentModule = link.closest('.dropdown');
      if (parentModule) {
        const moduleId = parentModule.id; // e.g., "dropdown2"
        document.querySelector(`#${moduleId}`).classList.add('active');
      }
    } else {
      link.classList.remove('active');
    }
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', highlightCurrentLesson);
```

---

### Solution 3: Fix PathFit 3 Navigation Paths (PRIORITY 2)
**Action:** Standardize all relative paths in PathFit 3 subdirectories

**In pathfit3/pf3_sports_act/* files:**
```html
<!-- For navigating within pf3_sports_act -->
<a href="lesson4_basketball.html">Basketball</a>

<!-- For navigating to other directories -->
<a href="../../pathfit3/lesson1_introduction_to_applied_physical_activities.html">Introduction to Applied Physical Activities</a>
```

---

### Solution 4: Fix Label Duplicates (PRIORITY 3)
**In pathfit3/pf3_sports_act/lesson5_volleyball.html:**
```html
<!-- Change from -->
<a href="lesson5_volleyball.html">Basketball</a>

<!-- To -->
<a href="lesson5_volleyball.html">Volleyball</a>
```

---

## 🔍 TESTING CHECKLIST

After implementing fixes, verify:

- [ ] Visit pathfit1/lesson1_introduction_to_physical_education.html
  - [ ] Sidebar shows "PATHFIT 1" expanded
  - [ ] "Introduction to Physical Education" link is highlighted with active class
  - [ ] No other lesson is highlighted

- [ ] Visit pathfit2/lesson5_definition_of_exercise.html
  - [ ] Sidebar shows "PATHFIT 2" expanded
  - [ ] "Definition of Exercise" link is highlighted
  - [ ] "Eating Habits" is NOT highlighted

- [ ] Visit pathfit3/pf3_sports_act/lesson4_basketball.html
  - [ ] Sidebar shows "PATHFIT 3 & 4" expanded
  - [ ] "Sports Activities" submenu is expanded
  - [ ] "Basketball" link is highlighted
  - [ ] Paths to other PathFit 3 sections work correctly

- [ ] Visit pathfit3/pf3_sports_act/lesson5_volleyball.html
  - [ ] Label shows "Volleyball" (not "Basketball")
  - [ ] Link is highlighted correctly

---

## 📋 SUMMARY TABLE

| Issue | Severity | Type | Files Affected | Status |
|-------|----------|------|---|---|
| Hardcoded active class | 🔴 CRITICAL | HTML | 26+ lesson files | ⚠️ NEEDS FIX |
| No dynamic highlighting | 🔴 CRITICAL | JavaScript | pathfit1.js, pathfit2.js, pathfit3.js | ⚠️ NEEDS FIX |
| Path inconsistencies | 🟠 MEDIUM | HTML routing | pathfit3 subdirectories | ⚠️ NEEDS FIX |
| Label duplicates | 🟡 LOW | Content | lesson5_volleyball.html | ⚠️ NEEDS FIX |

---

## 📚 FILE INVENTORY

### PathFit 1 Files (9 lessons):
- lesson1_introduction_to_physical_education.html ✅ Sidebar has active
- lesson2_PARQ.html ✅ Sidebar has active
- lesson3_Introduction_to_movement_enhancement.html ✅ Sidebar has active
- lesson4_fms_lecture.html ✅ Sidebar has active
- lesson5_Functional_Movement_Screen.html ✅ Sidebar has active
- lesson6_Eating_Habits.html ✅ Sidebar has active (HARDCODED ACTIVE HERE)
- lesson7_Locomotor_and_Non_Locomotor.html ✅ Sidebar has active
- lesson8_Basic_locomotor_and_Non_Locomotor_Dance.html ✅ Sidebar has active
- lesson9_OK_DANCE_FULLVIDEO.html ✅ Sidebar has active

### PathFit 2 Files (14 lessons):
- lesson1_definition_of_physical_fitness.html ✅ Sidebar has active
- lesson2_definition_of_physical_activity.html ✅ Sidebar has active
- lesson3_definition_of_fitness.html ✅ Sidebar has active
- lesson4_fundamentals_of_fitness.html ✅ Sidebar has active
- lesson5_definition_of_exercise.html ✅ Sidebar has active
- lesson6_benefits_of_regular_exercise.html ✅ Sidebar has active
- lesson7_definition_of_training.html ✅ Sidebar has active
- lesson8_types_of_fitness_training.html ✅ Sidebar has active
- lesson9_fitness_program_5_steps.html ✅ Sidebar has active
- lesson10_sample_fitness_plan.html ✅ Sidebar has active
- lesson11_fitt_principle.html ✅ Sidebar has active
- lesson12_weight_management.html ✅ Sidebar has active
- lesson13_physical_fitness_test.html ✅ Sidebar has active
- lesson14_developing_a_personal_fitness_plan.html ✅ Sidebar has active

### PathFit 3 & 4 Files (20+ lessons):
**Dance:**
- pf3_dance_act/lesson1_folk_dance.html ✅ Sidebar has active
- pf3_dance_act/lesson2_modern_dance_hip_hop.html ✅ Sidebar has active
- pf3_dance_act/lesson3_zumba_dance.html ✅ Sidebar has active

**Sports:**
- pf3_sports_act/lesson4_basketball.html ✅ Sidebar has active (path issue)
- pf3_sports_act/lesson5_volleyball.html ✅ Sidebar has active (label wrong)
- pf3_sports_act/lesson6_pickleball.html ✅ Sidebar has active (path issue)
- pf3_sports_act/lesson7_badminton.html ✅ Sidebar has active (path issue)
- pf3_sports_act/lesson8_table_tennis.html ✅ Sidebar has active (path issue)
- pf3_sports_act/lesson9_swimming.html ✅ Sidebar has active (path issue)

**Group Exercises:**
- pf3_group_exercises/lesson11_cardio_workouts.html ✅ Sidebar has active
- pf3_group_exercises/lesson12_core_and_circuit_training.html ✅ Sidebar has active
- pf3_group_exercises/lesson13_outdoor_and_adventure.html ✅ Sidebar has active
- pf3_group_exercises/lesson14_hiking_and_trekking.html ✅ Sidebar has active

**Martial Arts:**
- lesson10_arnis.html ✅ Sidebar has active

**Other:**
- lesson1_Introduction_to_applied_physical_activities.html ✅ Sidebar has active
- lesson15_team_building_and_recreational_games.html ✅ Sidebar has active

---

**Report Generated:** November 27, 2025  
**Report Status:** Complete - Ready for implementation  
**Next Steps:** Implement fixes per priority order
