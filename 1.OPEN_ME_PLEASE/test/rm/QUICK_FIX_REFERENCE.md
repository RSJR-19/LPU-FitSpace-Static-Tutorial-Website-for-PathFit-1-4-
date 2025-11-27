# QUICK REFERENCE: Issues & Fixes

## 🔴 CRITICAL ISSUES (FIX IMMEDIATELY)

### Issue #1: Hardcoded Active Class
```
Current (WRONG):
<a href="../pathfit1/lesson6_Eating_Habits.html" class="active">Eating Habits</a>

Fix:
<a href="../pathfit1/lesson6_Eating_Habits.html">Eating Habits</a>
```
**Action:** Remove `class="active"` from ALL lesson links across all 26+ lesson files

---

### Issue #2: No Dynamic Active Link Highlighting
```javascript
// CURRENT CODE (pathfit2.js) - Only highlights module dropdown
document.addEventListener("DOMContentLoaded", () => {
  const pathfit2Tab = document.querySelector("#dropdown2");
  pathfit2Tab.classList.add("active"); // ❌ Wrong: Only adds to dropdown
});

// WHAT WE NEED: Add this to main.js
function highlightCurrentLesson() {
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split('/').pop();
  
  // Find link with matching filename and add active class
  const allLinks = document.querySelectorAll('.dropdown a, .dropdown2 a');
  allLinks.forEach(link => {
    if (link.getAttribute('href').includes(currentFile)) {
      link.classList.add('active');
      // Also ensure parent dropdown is expanded
      link.closest('.dropdown, .dropdown2')?.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', highlightCurrentLesson);
```

---

## 🟠 MEDIUM PRIORITY ISSUES

### Issue #3: PathFit 3 Path Errors
In `pathfit3/pf3_sports_act/lesson4_basketball.html` line 101:
```html
<!-- WRONG -->
<a href="../lesson1_introduction_to_applied_physical_activities.html">Introduction</a>

<!-- CORRECT -->
<a href="../../pathfit3/lesson1_introduction_to_applied_physical_activities.html">Introduction</a>
```

**Files to Fix:** 
- All files in `pathfit3/pf3_sports_act/`
- All files in `pathfit3/pf3_dance_act/`
- All files in `pathfit3/pf3_group_exercises/`

---

## 🟡 LOW PRIORITY ISSUES

### Issue #4: Wrong Label
In `pathfit3/pf3_sports_act/lesson5_volleyball.html` line 133:
```html
<!-- WRONG -->
<a href="lesson5_volleyball.html">Basketball</a>

<!-- CORRECT -->
<a href="lesson5_volleyball.html">Volleyball</a>
```

---

## 🎯 IMPLEMENTATION PRIORITY

1. **IMMEDIATE:** Remove all hardcoded `class="active"` from HTML (26+ files)
2. **IMMEDIATE:** Add dynamic highlighting function to `main.js`
3. **NEXT:** Fix all path issues in PathFit 3 directories
4. **FINAL:** Fix volleyball label

---

## ✅ VERIFICATION TESTS

After implementation, visit these pages and verify:

1. **pathfit1/lesson1_introduction_to_physical_education.html**
   - ✓ "Introduction to Physical Education" is highlighted in sidebar
   - ✓ "PATHFIT 1" dropdown is expanded
   - ✓ No other lesson is highlighted

2. **pathfit2/lesson5_definition_of_exercise.html**
   - ✓ "Definition of Exercise" is highlighted in sidebar
   - ✓ "PATHFIT 2" dropdown is expanded
   - ✓ "Eating Habits" is NOT highlighted

3. **pathfit3/pf3_sports_act/lesson5_volleyball.html**
   - ✓ "Volleyball" label displays (not "Basketball")
   - ✓ "Volleyball" link is highlighted in sidebar
   - ✓ "Sports Activities" submenu is expanded
   - ✓ All navigation links work correctly

---

## 📊 AFFECTED FILES SUMMARY

| Module | Count | Status |
|--------|-------|--------|
| PathFit 1 | 9 files | Has active class issue |
| PathFit 2 | 14 files | Has active class issue |
| PathFit 3 & 4 | 20+ files | Has active class + path + label issues |
| **JavaScript files** | 3 files | Need dynamic logic |
| **Total** | **50+ instances** | ⚠️ NEEDS FIX |

---

Generated: November 27, 2025
