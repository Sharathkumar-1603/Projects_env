import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/AirQuality.css'

const AirQuality = () => {
  const [airQuality, setAirQuality] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [locationDetails, setLocationDetails] = useState({ city: "", state: "", country: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => setError("Unable to retrieve your location.")
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchAirQuality = async () => {
      if (location.lat && location.lon) {
        try {
          const apiKey = "0a3268c161bf99b890901132475ac31f"; 
          const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`;
          const response = await fetch(airQualityUrl);

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

          const data = await response.json();
          if (data.list && data.list.length > 0) {
            setAirQuality(data.list[0]);
          } else {
            setError("No air quality data available.");
          }

          const geoUrl = `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lon}&format=json`;
          const geoResponse = await fetch(geoUrl);

          if (!geoResponse.ok) {
            throw new Error(`Error fetching location name: ${geoResponse.statusText}`);
          }

          const geoData = await geoResponse.json();
          const address = geoData.address;

          setLocationDetails({
            city: address.city || address.town || address.village || "Unknown City",
            state: address.state || "Unknown State",
            country: address.country || "Unknown Country",
          });
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchAirQuality();
  }, [location]);

  const getAirQualityStatus = (aqi) => {
    if (aqi <= 50) {
      return "Good";
    } else if (aqi <= 100) {
      return "Moderate";
    } else if (aqi <= 150) {
      return "Unhealthy for Sensitive Groups";
    } else if (aqi <= 200) {
      return "Unhealthy";
    } else if (aqi <= 300) {
      return "Very Unhealthy";
    } else {
      return "Hazardous";
    }
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!airQuality) {
    return <div className="loading">Loading...</div>;
  }

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="air-quality-container">
      <h1>Air Quality</h1>
      <p>Location: {locationDetails.city}, {locationDetails.state}, {locationDetails.country}</p>
      <p>AQI: {airQuality.main.aqi}</p>
      <p>CO: {airQuality.components.co}</p>
      <p>NO: {airQuality.components.no}</p>
      <p>NO2: {airQuality.components.no2}</p>
      <h2>Status: {getAirQualityStatus(airQuality.main.aqi)}</h2>
      <p>
        {`The air quality in this area is ${getAirQualityStatus(
          airQuality.main.aqi
        )}.`}
      </p>
      <div>
        <button type="button" onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

export default AirQuality;
