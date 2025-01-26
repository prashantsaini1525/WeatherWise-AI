import React, { useState } from "react";

const GlobalComparison = () => {
    const [cities, setCities] = useState([""]); // Starts with one empty input field
    const [suggestions, setSuggestions] = useState([]); // Suggestions for city search
    const [activeInput, setActiveInput] = useState(null); // Track the active input
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(false);

    const apiKey = import.meta.env.VITE_API_KEY;

    // Update city input and fetch suggestions
    const handleCityChange = async (index, value) => {
        const updatedCities = [...cities];
        updatedCities[index] = value;
        setCities(updatedCities);

        // Fetch suggestions for the city
        if (value.trim()) {
            try {
                const response = await fetch(
                    `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${value.trim()}`
                );
                const data = await response.json();
                setSuggestions(data);
                setActiveInput(index); // Set the active input to this field
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        } else {
            setSuggestions([]);
        }
    };

    // Select city from suggestions
    const handleCitySelect = (index, suggestion) => {
        const cityName = `${suggestion.name}, ${suggestion.region}, ${suggestion.country}`;
        const updatedCities = [...cities];
        updatedCities[index] = cityName;
        setCities(updatedCities);

        // Clear suggestions and reset the active input
        setSuggestions([]);
        setActiveInput(null);
    };

    // Add a new input field for another city
    const handleAddCity = () => {
        setCities([...cities, ""]);
    };

    // Remove a city from the list
    const handleRemoveCity = (index) => {
        const updatedCities = cities.filter((_, i) => i !== index);
        setCities(updatedCities);
    };

    // Fetch weather data for all cities
    const handleCompare = async () => {
        setLoading(true);
        setWeatherData([]);

        try {
            const results = await Promise.all(
                cities.map(async (city) => {
                    if (!city.trim()) {
                        return { city, error: "City name cannot be empty." };
                    }
                    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    if (data.error) {
                        return { city, error: data.error.message };
                    }
                    return { city, data };
                })
            );
            setWeatherData(results);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Input fields for cities */}
            {cities.map((city, index) => (
                <div key={index} style={{ marginBottom: "10px", position: "relative" }}>
                    <input
                        type="text"
                        placeholder={`City ${index + 1}`}
                        value={city}
                        onChange={(e) => handleCityChange(index, e.target.value)}
                        onFocus={() => setActiveInput(index)} // Set active input
                        onBlur={() => setTimeout(() => setSuggestions([]), 200)} // Delay clearing to allow click
                        style={{ marginRight: "10px", width: "300px" }}
                    />
                    <button onClick={() => handleRemoveCity(index)} disabled={cities.length === 1}>
                        Remove
                    </button>

                    {/* Suggestions dropdown */}
                    {activeInput === index && suggestions.length > 0 && (
                        <ul
                            style={{
                                position: "absolute",
                                top: "40px",
                                left: 0,
                                listStyleType: "none",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc",
                                padding: "10px",
                                maxHeight: "150px",
                                overflowY: "auto",
                                zIndex: 10,
                                width: "300px",
                            }}
                        >
                            {suggestions.map((suggestion, i) => (
                                <li
                                    key={i}
                                    onClick={() => handleCitySelect(index, suggestion)}
                                    style={{
                                        cursor: "pointer",
                                        padding: "5px",
                                    }}
                                >
                                    {suggestion.name}, {suggestion.region}, {suggestion.country}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}

            <button onClick={handleAddCity} style={{ marginTop: "10px" }}>
                Add City
            </button>

            <button
                onClick={handleCompare}
                style={{ marginLeft: "10px" }}
                disabled={cities.some((city) => !city.trim())} // Disable if any input is empty
            >
                Compare Weather
            </button>

            {loading && <p>Loading weather data...</p>}

            {/* Weather data display */}
            {weatherData.length > 0 && (
                <table border="1" style={{ marginTop: "20px", width: "100%" }}>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Temperature (°C)</th>
                            <th>Condition</th>
                            <th>Humidity (%)</th>
                            <th>Feels Like (°C)</th>
                            <th>Error</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weatherData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.city || "N/A"}</td>
                                <td>{item.data?.current?.temp_c || "N/A"}</td>
                                <td>{item.data?.current?.condition?.text || "N/A"}</td>
                                <td>{item.data?.current?.humidity || "N/A"}</td>
                                <td>{item.data?.current?.feelslike_c || "N/A"}</td>
                                <td>{item.error || "None"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GlobalComparison;
