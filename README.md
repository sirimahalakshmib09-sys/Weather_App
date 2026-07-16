# Weather App 🌦️

A modern and responsive weather application built with React and Open-Meteo API. The application allows users to search weather information for any city worldwide or fetch weather data based on their current location. It provides real-time weather conditions, temperature details, humidity, wind speed, sunrise and sunset timings, and a 5-day forecast with dynamic weather backgrounds.

---

## Project Overview

This project was developed to strengthen frontend development skills using React while integrating real-world APIs and responsive UI design principles.

The application delivers weather information in a clean and visually appealing interface with weather-based dynamic backgrounds and mobile-friendly responsiveness.

---

## STAR Description

### Situation

People often need quick access to weather information for different locations. Most weather platforms contain excessive information and complex interfaces that can reduce usability.

### Task

Build a responsive weather application that provides essential weather information in a simple, user-friendly, and visually engaging format.

### Action

* Developed the application using React and Vite.
* Integrated Open-Meteo Geocoding API to convert city names into coordinates.
* Integrated Open-Meteo Weather API to fetch live weather data and forecasts.
* Implemented location-based weather using the browser's Geolocation API.
* Added dynamic weather backgrounds based on current weather conditions.
* Displayed temperature in both Celsius and Fahrenheit.
* Implemented sunrise and sunset time formatting in AM/PM format.
* Designed reusable weather information cards using modern glassmorphism UI.
* Added mobile-responsive layouts using CSS Media Queries.
* Implemented loading and error handling for improved user experience.

### Result

* Successfully built a fully functional weather application with real-time weather data.
* Improved API integration and React state management skills.
* Created a responsive user interface compatible with desktop, tablet, and mobile devices.
* Delivered a visually engaging weather experience through dynamic backgrounds and forecast cards.

---

## Features

* Search weather by city name
* Current location weather using Geolocation API
* Real-time temperature display
* Celsius and Fahrenheit conversion
* Weather condition indicators
* Humidity information
* Wind speed information
* Sunrise and sunset timings
* Dynamic weather backgrounds
* 5-Day weather forecast
* Error handling for invalid cities
* Loading state indicators
* Mobile-responsive design

---

## Screenshots

### Home Screen

![Home Screen](./screenshots/home-screen.png)

Clean and intuitive interface that allows users to search weather information by city name or use their current location.

---

### Weather Search Result

![City Weather](./screenshots/city-weather.png)

Displays real-time weather information including temperature, weather condition, humidity, wind speed, sunrise, sunset, and a 5-day forecast.

---

### Current Location Weather

![Location Weather](./screenshots/location-weather.png)

Uses browser geolocation to fetch and display weather information for the user's current location.

---

## Tech Stack

### Frontend

* React.js
* JavaScript (ES6+)
* CSS3
* Vite

### APIs

* Open-Meteo Geocoding API
* Open-Meteo Weather Forecast API

### Tools

* Git
* GitHub
* GitHub Pages

---

## Project Structure

```plaintext
src/
│
├── assets/
│   ├── sunny.jpg
│   ├── cloudy.jpg
│   └── rainy.jpg
│
├── App.jsx
├── App.css
├── main.jsx
│
public/
│
package.json
vite.config.js
README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Project

```bash
cd weather_api
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

---

## Live Demo

Add your deployed GitHub Pages link here:

```text
https://sirimahalakshmib09-sys.github.io/Weather_App/
```

---

## Learning Outcomes

Through this project, I gained hands-on experience in:

* React Hooks (useState)
* API Integration
* Asynchronous JavaScript
* Geolocation API
* Responsive Web Design
* State Management
* Error Handling
* Git and GitHub Workflow
* Deploying React Applications using GitHub Pages

---

## Future Improvements

* Air Quality Index (AQI)
* Hourly Forecast
* Weather Maps
* Multiple Theme Options
* Weather Alerts
* Favorite Locations
* Dark Mode Support

---

## Author

**Siri Maha Lakshmi Burugupilli**
Open to SWE internships
GitHub: [https://github.com/sirimahalakshmib09-sys]
LinkedIn: [www.linkedin.com/in/siri-maha-lakshmi-burugupilli-b964a3361]

---

⭐ If you found this project useful, consider giving it a star on GitHub.
