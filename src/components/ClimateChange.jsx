import React, { useState, useEffect } from 'react';

const ClimateChange = () => {
    const [city, setCity] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [climateData, setClimateData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCoordinates = async (city) => {
        try {
            const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
            const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${city}`
            );
            const data = await response.json();
            console.log(data); // Add this log to check geocoding results
            if (data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry;
                setLatitude(lat);
                setLongitude(lng);
            } else {
                setError('City not found!');
            }
        } catch (err) {
            setError('Failed to fetch coordinates');
        }
    };

    const fetchClimateData = async () => {
        if (latitude && longitude) {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,wind_speed_10m,pressure_msl,uv_index,visibility`
                );
                const data = await response.json();
                console.log(data); // Add this log to check the response structure
                setClimateData(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch climate data');
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`); // Check if coordinates are set
        if (latitude && longitude) {
            fetchClimateData();
        }
    }, [latitude, longitude]);

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleSearch = () => {
        fetchCoordinates(city);
    };

    const formatDate = (hourIndex) => {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + hourIndex); // Adjust based on index
        return currentDate.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };


    if (loading) return <div>Loading climate data...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Climate Change Data</h2>
            <input
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder="Enter city name"
            />
            <button onClick={handleSearch}>Search</button>

            <div>
                <h3>Temperature Trends</h3>
                {climateData && climateData.hourly ? (
                    <ul>
                        {climateData.hourly.temperature_2m.slice(0, 5).map((temp, index) => (
                            <li key={index}>
                                {formatDate(index)}: {temp}°C,
                                Precipitation: {climateData.hourly.precipitation[index]} mm,
                                Wind Speed: {climateData.hourly.wind_speed_10m[index]} m/s,
                                Pressure: {climateData.hourly.pressure_msl[index]} hPa,
                                UV Index: {climateData.hourly.uv_index[index]},
                                Visibility: {climateData.hourly.visibility[index]} km
                                {/* Humidity: {climateData.hourly.humidity_2m[index]}%, */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No climate data available</p>
                )}
            </div>
        </div>
    );
};

export default ClimateChange;
