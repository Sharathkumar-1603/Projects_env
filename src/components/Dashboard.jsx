import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import '../styles/Dashboard.css'

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
      } else {
        console.log("No user logged in, redirecting to login...");
        navigate("/login");
      }
    });


    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      console.log("User signed out successfully");
      navigate("/"); 
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };


  if (!user) {
    return <div>Loading...</div>; 
  }

  return (


    <> 
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
        <div className="dashboard-container">
      <h1>Welcome, {user.displayName || user.email}</h1>
      <h2>Explore our services and track your progress.</h2>
      <div>
        <Link to="/air-quality">
          <button>Check Air Quality</button>
        </Link>
      </div>
      <div>
        <Link to="/recycling-progress">
          <button>Track Recycling Progress</button>
        </Link>
      </div>
    </div></>

  );
};

export default Dashboard;
