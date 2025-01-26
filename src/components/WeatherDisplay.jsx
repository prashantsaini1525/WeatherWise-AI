import React from 'react';
import "../styles/WeatherDisplay.css";  // Ensure you import the CSS file

const WeatherDisplay = ({ weather }) => {
    if (!weather) return <p className="no-data">No data available. Please check the city name.</p>;

    return (
        <div className="weather-display">
            <h2 className="city-name">{weather.location.name}</h2>
            <div className="weather-info">
                <img
                    src={`https:${weather.current.condition.icon}`}
                    alt={weather.current.condition.text}
                    className="weather-icon"
                />
                <div className="weather-details">
                    <p className="temp">
                        Temperature: {weather.current.temp_c}°C / {weather.current.temp_f}°F
                    </p>
                    <p className="condition">Weather: {weather.current.condition.text}</p>
                    <p className="humidity">Humidity: {weather.current.humidity}%</p>
                    <p className="wind-speed">Wind Speed: {weather.current.wind_kph} km/h</p>
                    <p className="feels-like">Feels Like: {weather.current.feelslike_c}°C</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;
