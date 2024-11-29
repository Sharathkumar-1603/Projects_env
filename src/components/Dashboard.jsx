import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut, updateProfile, updateEmail } from "firebase/auth";
import "../styles/Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faSignOutAlt, faCog, faBars, faHome, faAddressBook, faBook } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // For mobile navbar toggle
  const [settingsOpen, setSettingsOpen] = useState(false); // For settings dropdown
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

  const handleUpdateName = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      setUser({ ...user, displayName: newName });
      console.log("Name updated successfully");
      setEditName(false);
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handleUpdateEmail = async () => {
    try {
      await updateEmail(auth.currentUser, newEmail);
      setUser({ ...user, email: newEmail });
      console.log("Email updated successfully");
      setEditEmail(false);
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-header">
          <Link to="/" className="navbar-logo">ES</Link>  
          <button className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <ul className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>
          <li>
            <Link to="/" className="nav-link"> <FontAwesomeIcon icon={faHome} />Home</Link>
          </li>
          <li>
            <Link to="/about" className="nav-link"><FontAwesomeIcon icon={faAddressBook} />About</Link>
          </li>
          <li>
            <Link to="/dashboard" className="nav-link"> <FontAwesomeIcon icon={faBook} /> Dashboard</Link>
          </li>
          <li className="settings-menu">
            <div onClick={() => setSettingsOpen(!settingsOpen)} className="settings-toggle">
              <FontAwesomeIcon icon={faCog} /> Settings
            </div>
            {settingsOpen && (
              <div className="settings-dropdown">
                <div className="settings-item">
                  <FontAwesomeIcon icon={faUser} />{" "}
                  {!editName ? (
                    <>
                      <span>{user.displayName || "N/A"}</span>
                      <button onClick={() => setEditName(true)}>Edit</button>
                    </>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Enter new name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                      <button onClick={handleUpdateName}>Save</button>
                      <button onClick={() => setEditName(false)}>Cancel</button>
                    </>
                  )}
                </div>
                <div className="settings-item">
                  <FontAwesomeIcon icon={faEnvelope} />{" "}
                  {!editEmail ? (
                    <>
                      <span>{user.email}</span>
                      <button onClick={() => setEditEmail(true)}>Edit</button>
                    </>
                  ) : (
                    <>
                      <input
                        type="email"
                        placeholder="Enter new email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                      />
                      <button onClick={handleUpdateEmail}>Save</button>
                      <button onClick={() => setEditEmail(false)}>Cancel</button>
                    </>
                  )}
                </div>
              </div>
            )}
          </li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </li>
        </ul>
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
      </div>
    </>
  );
};

export default Dashboard;
