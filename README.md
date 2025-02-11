# WeatherWise AI

![WeatherWise AI Banner](https://via.placeholder.com/1200x300?text=WeatherWise+AI)

**WeatherWise AI** is a modern, full-featured weather application that delivers real-time weather updates and personalized recommendations using cutting-edge web technologies. Built with React and Vite on the frontend and leveraging secure serverless functions on Vercel, this project demonstrates a strong grasp of modern web development, API integration, and scalable architecture.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technical Highlights](#technical-highlights)
- [Architecture & Design](#architecture--design)
- [Challenges & Solutions](#challenges--solutions)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Live Demo](#live-demo)

---

## Overview

WeatherWise AI provides accurate and real-time weather information for any city worldwide. Users can search for locations, view detailed weather metrics (temperature, humidity, wind speed, air quality, and more), and even see recent search history. By using serverless functions to fetch data securely, the app ensures that sensitive API keys remain hidden and minimizes CORS issues—an approach that highlights best practices in secure API integration and modern deployment.

---

## Features

- **City Search & Suggestions:** Quickly find weather data for any city with real-time search suggestions.
- **Detailed Weather Display:** View comprehensive weather metrics including temperature (°C/°F), humidity, wind speed, local time, and air quality.
- **Recent Searches:** Automatically store and display your last five searched cities.
- **Serverless API Integration:** Utilize Vercel serverless functions to securely fetch weather data without exposing API keys.
- **Responsive & Modern UI:** A clean, intuitive design built with React and CSS that performs seamlessly on both desktop and mobile devices.
- **Continuous Deployment:** Leveraging Vercel's deployment platform for automatic builds and updates.

---

## Technical Highlights

This project is a showcase of modern web development techniques and technical acumen:

- **React & Vite:** Fast, efficient, and modern frontend development.
- **Serverless Architecture:** Secure data fetching using Vercel's serverless functions, which abstracts backend logic and protects sensitive credentials.
- **API Integration:** Seamless consumption of WeatherAPI for real-time weather data.
- **Environment Variable Management:** Use of environment variables to manage API keys both locally (via a `.env` file) and in production (via Vercel's Dashboard).
- **Responsive Design & UI/UX:** Custom CSS for a responsive and user-friendly interface.
- **Robust Error Handling:** Comprehensive error management and user feedback throughout the application.
- **Version Control & Continuous Deployment:** Git for version control and Vercel for automated deployments, ensuring rapid iteration and continuous improvement.

---

## Architecture & Design

**WeatherWise AI** is designed with a clear separation of concerns:

- **Frontend:** Built with React and Vite, the user interface is organized into modular components (SearchBar, WeatherDisplay, etc.), promoting reusability and maintainability.
- **Backend (Serverless Functions):** API calls are handled by Vercel serverless functions (e.g., `fetchWeather.js`), ensuring that sensitive API keys are not exposed to the client and that CORS issues are mitigated.
- **Data Flow:** The client communicates with the serverless functions which, in turn, interface with external APIs (WeatherAPI). This layered approach enhances security and scalability.

---

## Challenges & Solutions

During development, several challenges were addressed:

- **API Key Exposure & Security:**  
  _Challenge:_ Directly calling external APIs from the client exposed sensitive API keys.  
  _Solution:_ Implemented serverless functions on Vercel to act as a proxy, securely fetching data and keeping API keys hidden.

- **CORS Issues:**  
  _Challenge:_ Client-side API calls often run into CORS restrictions.  
  _Solution:_ Using serverless functions effectively bypasses these issues by handling API requests on the server side.

- **Performance Optimization:**  
  _Challenge:_ Ensuring the app remained responsive even with real-time data updates.  
  _Solution:_ Employed React best practices, efficient state management, and asynchronous API calls.

- **Responsive UI Design:**  
  _Challenge:_ Designing a user interface that works well on both desktop and mobile devices.  
  _Solution:_ Developed a custom CSS layout and rigorously tested across various screen sizes.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/prashantsaini1525/WeatherWise-AI.git
   cd weatherwise-app

   ```

2. **Install dependencies:**

   ```bash
    npm install
   # or
    yarn install

   ```

3. **Set Up Environment Variables:**

   - Create a .env file in the root directory and add: <br>

   ```bash

    VITE_API_KEY=your_weatherapi_key

   ```

   - **Note:** For production, set these variables in the Vercel Dashboard under Project Settings → Environment Variables.

4. **Run the App Locally:**
   ```bash
   - npm run dev
   ```
   - Visit http://localhost:3000 in your browser.
