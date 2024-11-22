import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Make sure to import your Firebase configuration
import { onAuthStateChanged, signOut } from "firebase/auth";
import Hero from "./Hero";
import '../styles/Home.css'

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user when the auth state changes
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("There was an error logging out. Please try again.");
    }
  };

  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
        </ul>
        <div className="auth-links">
          {user ? (
            <>
              <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
              <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/register" className="nav-link">Register</Link></li>
              <li><Link to="/login" className="nav-link">Login</Link></li>
            </>
          )}
        </div>
      </nav>

          {/* Main Content */}
          <div className="main-content">
        <h2>Welcome, {user ? user.displayName : "Guest"}!</h2>
        <p>
          {user ? "You're logged in, explore your dashboard!" : "Please log in or register to get started."}
        </p>
      </div>

      <Hero />

    </div>
  );
};

export default Home;
