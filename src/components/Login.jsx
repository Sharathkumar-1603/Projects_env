import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase Auth
import { auth } from "../firebaseConfig";
import '../styles/Register.css'

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("Username:", username); // Debugging log
    console.log("Password:", password); // Debugging log

    try {
      // Use Firebase to sign in
      await signInWithEmailAndPassword(auth, username, password);
      setIsLoggedIn(true); // Update state to indicate logged in
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (error) {
      console.error("Login failed:", error.message); // Debugging log
      alert("Invalid credentials");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Login</h2>
      <form className="register-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
          className="register-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="register-input"
        />
        <button className="register-button" onClick={handleLogin}>
          Login
        </button>
        <p>you not form already <Link to="/register">Regsier</Link></p>
      </form>
    </div>
  );
};

export default Login;
