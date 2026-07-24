# Current Weather Custom Element

## Course
**LIA - Current Weather Web Component**

## Project Title
**Current Weather Application Using Custom Elements and Open-Meteo API**

---

# Overview

The purpose of this project was to create a reusable **`<current-weather>`** custom element that displays current weather information using the **Open-Meteo Weather API**.

The application supports two methods of retrieving weather information:

1. **Current User Location** using the browser's Geolocation API.
2. **Manual Location Input** using latitude and longitude coordinates.

The project was developed using modern JavaScript concepts, including:

- ES Modules
- JavaScript Classes
- Custom Elements
- Shadow DOM
- Asynchronous Programming (`async` / `await`)
- Fetch API
- Bootstrap for styling

---

# Features Implemented

The completed application provides the following functionality:

- Displays current weather automatically using the user's location.
- Allows users to retrieve weather information using manual coordinates.
- Retrieves weather data from the Open-Meteo API.
- Displays:
  - Temperature
  - Wind Speed
  - Wind Direction
  - Weather Description
- Converts Open-Meteo weather codes into readable descriptions.
- Validates manual coordinate input.
- Handles browser location permission errors.
- Clears previous weather results whenever an error occurs.
- Displays the source of the weather information:
  - **Weather Result (Current Location)**
  - **Weather Result (Manual Coordinates)**

---

# Project Structure

The application follows a modular JavaScript architecture.

## 1. `api.js`

Responsible for communicating with the Open-Meteo API.

### Responsibilities

- Build API request URLs
- Fetch weather data
- Return weather information to the custom element

---

## 2. `CurrentWeather.js`

Contains the main custom element implementation.

### Responsibilities

- Create the Shadow DOM
- Load the HTML template
- Handle button events
- Request weather data
- Retrieve the user's current location
- Process manual coordinates
- Render weather information
- Handle errors

---

## 3. `index.html`

Contains:

- Bootstrap framework
- Application layout
- Custom element usage
- Weather card template

The interface is organized using Bootstrap's grid system with three main sections:

- Current Location
- Manual Coordinates
- Weather Result

---

# Program Design Decisions

## Custom Element

The application is built around a reusable custom HTML element.

```html
<current-weather></current-weather>
```

This allows the weather component to be reused independently on any webpage.

The custom element manages its own:

- HTML structure
- Event handling
- Rendering
- Internal state

---

## Shadow DOM

Shadow DOM is used to isolate the component from the rest of the webpage.

Benefits include:

- Prevents CSS conflicts
- Encapsulates component structure
- Improves maintainability
- Makes the component reusable

---

## Asynchronous Programming

The application uses:

- `async`
- `await`
- `fetch()`
- Promise handling

These techniques allow weather requests to complete without blocking the user interface.

---

## Error Handling

The application handles several possible errors, including:

- User denies location permission
- Empty latitude field
- Empty longitude field
- API request failures

Whenever an error occurs, previous weather results are automatically cleared to prevent confusion.

---

# Challenges Encountered

## Challenge 1 – Connecting Buttons to Custom Element Logic

### Problem

Initially, the buttons appeared correctly in the HTML template, but clicking them did not update the weather information.

### Cause

Event listeners had not yet been attached.

### Solution

Added event listeners inside the `connectedCallback()` method for:

- Current Location button
- Manual Coordinates button

---

## Challenge 2 – Supporting Two Weather Sources

### Problem

The application needed to support two different methods of retrieving weather:

- Browser location
- Manual coordinates

The challenge was avoiding duplicated rendering code.

### Solution

Created a shared method:

```javascript
loadWeatherByCoordinates()
```

Both location methods call this same function, reducing duplicated code.

---

## Challenge 3 – Previous Weather Remaining After Errors

### Problem

When invalid coordinates were entered, the previous successful weather information remained visible.

This could confuse users.

### Solution

Created:

```javascript
clearWeather()
```

This method removes previous weather results whenever a request fails.

---

## Challenge 4 – Understanding Open-Meteo Weather Codes

### Problem

The Open-Meteo API returns numeric weather codes instead of readable descriptions.

Example:

```
Weather Code: 2
```

### Solution

Created:

```javascript
getWeatherDescription()
```

which converts weather codes into readable descriptions.

Example:

```
2 → Partly Cloudy
```

---

## Challenge 5 – Maintaining a Clean Project Structure

### Problem

During development, several additional features could have been added, but doing so would increase complexity.

### Solution

The final design focused on simplicity by using:

- One custom element
- One weather display area
- Shared rendering logic

This approach follows the design style demonstrated in the Festival Lineup example and keeps the code clean and maintainable.

---

# Testing Completed

The application was tested successfully in the following areas.

## Application Loading

Verified:

- Page loads correctly
- No JavaScript console errors

---

## Current Location

Tested:

- Browser location request
- Weather retrieval
- Permission handling

Result:

All functionality worked correctly.

---

## Manual Coordinates

Tested using:

**Latitude**

```
45.5088
```

**Longitude**

```
-73.5878
```

Result:

Weather information displayed correctly.

---

## Input Validation

Tested:

- Empty latitude
- Empty longitude

Result:

- Appropriate error message displayed
- Previous weather information cleared

---

## Weather Display

Verified that the application correctly displays:

- Temperature
- Wind Speed
- Wind Direction
- Weather Description

---

# Final Result

The completed application successfully implements a reusable weather custom element using modern JavaScript development practices.

The project demonstrates:

- Modular programming
- Object-oriented design
- Custom Web Components
- Shadow DOM
- Web API integration
- Asynchronous programming
- Clean frontend architecture
- Error handling
- User-friendly interaction

Overall, the application satisfies all project requirements while maintaining readable, reusable, and well-organized code.