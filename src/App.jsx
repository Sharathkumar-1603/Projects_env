import React, { useState } from "react";  // Import useState here
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AirQuality from "./components/AirQuality";
import RecyclingProgress from "./components/RecyclingProgress";
import Register from "./components/Register";
import Login from "./components/Login";
import About from "./components/About";
import Dashboard from "./components/Dashboard";

import './App.css'
import RecyclingAdmin from "./components/RecyclingAdmin";
import Hero from "./components/Hero";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hero" element={<Hero />} />
        <Route path="/air-quality" element={<AirQuality />} />
        <Route path="/recycling-progress" element={<RecyclingProgress />} />
        <Route path="/recycling-admin" element={<RecyclingAdmin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
