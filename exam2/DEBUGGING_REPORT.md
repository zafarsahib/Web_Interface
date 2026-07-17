# DEBUGGING_REPORT.md

# Final Debugging Report
Course: 582-31W-VA – Introduction to Content Management Systems

Project: Festival Lineup Manager Debugging Exam

# Overview

The supplied application contained numerous defects involving module loading, asynchronous programming, model classes, inheritance, data association, Custom Elements, Shadow DOM rendering, filtering, sorting, and UI updates.

The project was repaired while preserving the original modular architecture. The debugging process followed a logical sequence beginning with application startup, then API integration, model correction, component rendering, and finally filtering and user interaction.

---

# Bug 1 – Application Startup

**Files**

- index.html
- app.js

### Original problem

The application did not start correctly because JavaScript modules were not loaded properly. Several import statements referenced incorrect files or incorrect export types. Some event listeners executed immediately instead of waiting for user interaction.

### Correction

- Added `type="module"` to the script tag.
- Corrected import paths.
- Corrected import/export names.
- Fixed DOM element IDs.
- Registered event listeners correctly by passing function references.

### Why the original failed

Without module loading, none of the JavaScript files were imported correctly. Calling event handlers immediately caused functions to execute before the page was ready.

### Testing

- Opened the application.
- Verified that the browser console contained no module loading errors.
- Confirmed the **Load Lineup** button worked correctly.

---

# Bug 2 – API Integration

**File**

- js/api.js

### Original problem

The API module contained several asynchronous programming mistakes:

- Incorrect JSON filename.
- Promise.all() used incorrectly.
- fetch() responses were not awaited.
- response.json() was not awaited.
- Incorrect response validation.
- Incorrect returned object structure.

### Correction

- Loaded both JSON files using Promise.all().
- Awaited both fetch requests.
- Checked both HTTP responses.
- Awaited both response.json() calls.
- Returned both datasets using:

```javascript
{
    artists,
    performances
}
```

### Why the original failed

The application attempted to access data before it had finished loading, causing undefined values and runtime errors.

### Testing

- Successfully loaded both JSON files.
- Confirmed six performance objects were created.
- Verified no API errors appeared in the browser console.

---

# Bug 3 – Artist Model

**File**

- js/Artist.js

### Original problem

The Artist constructor assigned values to incorrect properties. The display label returned incorrect information.

### Correction

Corrected the constructor to store:

- id
- name
- country
- genre

Updated the displayLabel getter to return:

```
Artist Name — Country
```

### Why the original failed

Artist objects contained incorrect data which prevented proper rendering and searching.

### Testing

- Verified artist names displayed correctly.
- Verified country information displayed correctly.
- Verified searching by artist name worked.

---

# Bug 4 – Performance Models and Inheritance

**Files**

- js/Performance.js
- js/FeaturedPerformance.js

### Original problem

Several constructor parameters were assigned incorrectly.

Additional problems included:

- Prices stored as strings.
- Ticket counts stored as strings.
- Incorrect ticket availability logic.
- Incorrect lineup labels.
- Broken inheritance.
- Incorrect super() arguments.

### Correction

Repaired both classes by:

- Correctly assigning constructor values.
- Keeping numeric values as numbers.
- Implementing proper inheritance.
- Overriding the FeaturedPerformance lineup label.
- Correcting formatted price calculations.
- Correcting ticket availability logic.
- Correcting summary calculations.

### Why the original failed

The application could not correctly determine ticket availability, pricing, or featured performances.

### Testing

- Verified featured performances displayed correctly.
- Verified sold-out performances displayed correctly.
- Verified prices displayed with two decimal places.
- Verified ticket counts updated correctly.

---

# Bug 5 – Custom Element and Shadow DOM

**File**

- js/PerformanceCard.js

### Original problem

The custom element contained multiple issues:

- Did not extend HTMLElement.
- super() called incorrectly.
- Incorrect template ID.
- Template not cloned correctly.
- Rendering queried the main document instead of the Shadow DOM.
- Recursive setter.
- Incorrect custom element registration.

### Correction

Implemented:

- HTMLElement inheritance.
- Shadow DOM attachment.
- Template cloning.
- Correct performance setter.
- Rendering entirely inside shadowRoot.
- Registered:

```
<performance-card>
```

### Why the original failed

Performance cards could not render correctly and repeatedly caused rendering problems.

### Testing

- Verified six cards appeared.
- Verified Shadow DOM rendered correctly.
- Verified featured styling worked.
- Verified sold-out styling worked.

---

# Bug 6 – UI Rendering, Filtering and Sorting

**Files**

- js/app.js
- js/ui.js

### Original problem

Several UI problems existed:

- Incorrect DOM selectors.
- Incorrect custom element name.
- Wrong property assignment.
- Filtering modified the original data.
- OR logic used instead of AND logic.
- Sorting functions incorrect.
- Reset button did not restore the original lineup.
- Summary values updated incorrectly.

### Correction

Repaired:

- Rendering container.
- Performance card creation.
- Summary calculations.
- Search filtering.
- Stage filtering.
- Ticket filtering.
- Featured filtering.
- Sorting.
- Reset functionality.
- Preserved the original application state.

### Why the original failed

Filtering produced incorrect results and permanently modified application data.

### Testing

Verified:

- Search by performance title.
- Search by artist.
- Stage filtering.
- Available ticket filtering.
- Featured filtering.
- Combined filtering.
- Time sorting.
- Price ascending.
- Price descending.
- Artist alphabetical sorting.
- Reset Filters button.
- Summary calculations.

---

# Final Testing

The completed application was tested for the following functionality:

- Application startup
- Module loading
- API loading
- Artist association
- Featured performances
- Sold-out performances
- Shadow DOM rendering
- Search
- Stage filtering
- Ticket filtering
- Featured filtering
- Combined filtering
- Sorting
- Reset Filters
- Summary calculations
- Repeated loading
- Browser console errors

The application completed all tests successfully and no JavaScript console errors remained.

---

# Git Debugging Progress

The debugging process was completed through the following commits:

1. Fixing ES loading module and startup
2. Repaired API loading by using Promise.all
3. Repaired Artist model properties and display label
4. Complete model classes and inheritance
5. Repaired custom element registration and Shadow DOM setup
6. Fix app. startup, API loading with data and UI rendering

These commits demonstrate the logical debugging sequence used to repair the application while preserving its modular architecture.