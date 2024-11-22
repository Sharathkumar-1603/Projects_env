import React, { useState } from "react";
import { auth } from "../firebaseConfig"; // Import Firebase configuration
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import '../styles/Register.css'

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [from, setFrom] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    // Validate all fields
    if (!fullName || !email || !password || !phoneNumber || !age || !from) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (isNaN(age) || age <= 0) {
      setError("Please enter a valid age.");
      setLoading(false);
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Phone number must be a 10-digit number.");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Optionally, store additional user info like fullName, age, phoneNumber in Firestore
      navigate("/login"); // Navigate to login after successful registration
    } catch (err) {
      // Handle specific Firebase errors
      if (err.code === "auth/email-already-in-use") {
        setError("Email is already in use.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="register-input"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          className="register-input"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          className="register-input"
        />
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="From (e.g., City, Country)"
          className="register-input"
        />
        <button type="submit" className="register-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <p>if you form already <Link to="/login">Login</Link></p>
      </form>
      {error && <p className="register-error">{error}</p>}
    </div>
  );
};

export default Register;
