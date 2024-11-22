import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { db } from "../firebaseConfig";
import "./RecyclingProgress.css"; // Import CSS file for styling

const RecyclingProgress = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    image: "",
    location: "",
  });

  const [coordinates, setCoordinates] = useState({ lat: 20.5937, lng: 78.9629 });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "location" && value.trim() !== "") {
      try {
        setLoading(true);
        const response = await axios.get("https://nominatim.openstreetmap.org/search", {
          params: { q: value, format: "json", addressdetails: 1, limit: 1 },
        });

        if (response.data.length > 0) {
          const locationData = response.data[0];
          setCoordinates({
            lat: parseFloat(locationData.lat),
            lng: parseFloat(locationData.lon),
          });
        } else {
          alert("Location not found, please try again.");
          setCoordinates({ lat: 20.5937, lng: 78.9629 });
        }
      } catch (error) {
        console.error("Error fetching geocoding data:", error);
        alert("Failed to fetch location. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageData = new FormData();
      imageData.append("file", file);
      imageData.append("upload_preset", "r5iwwudh");

      try {
        setLoading(true);
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dh4pjtete/image/upload`,
          imageData
        );
        setFormData({ ...formData, image: response.data.secure_url });
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      window.location.href = "/login";
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "recyclingSubmissions"), {
        ...formData,
        coordinates,
        timestamp: serverTimestamp(),
      });
      alert("Information submitted successfully!");
      setFormData({
        name: "",
        address: "",
        description: "",
        image: "",
        location: "",
      });
      setCoordinates({ lat: 20.5937, lng: 78.9629 });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1); 
  };



  return (
    <div className="recycling-progress-container">
      <h1 className="form-title">Recycling Progress Form</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label className="form-label">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleInputChange}
          className="form-input"
          required
        />

        <label className="form-label">Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address || ''}
          onChange={handleInputChange}
          className="form-input"
          required
        />

        <label className="form-label">Description:</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleInputChange}
          className="form-textarea"
          required
        />

        <label className="form-label">Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="form-input" required />

        <label className="form-label">Location (Type Area Name):</label>
        <input
          type="text"
          name="location"
          value={formData.location || ''}
          onChange={handleInputChange}
          placeholder="Enter your location"
          className="form-input"
          required
        />

        <div className="map-container">
          <MapContainer
            center={[coordinates.lat, coordinates.lng]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[coordinates.lat, coordinates.lng]} />
          </MapContainer>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      <div>
        <button type="button" onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

export default RecyclingProgress;
