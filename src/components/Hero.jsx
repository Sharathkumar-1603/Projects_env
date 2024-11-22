import React from "react";
import { Link } from "react-router-dom";
import '../styles/Hero.css'
import  hero from "../images/environment.webp"

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            Building a Sustainable Future for Our Planet
          </h1>
          <p className="hero-description">
            We are committed to protecting the environment through innovative solutions. From recycling initiatives to renewable energy, our mission is to build a greener, sustainable future for generations to come. Join us in this mission to make a meaningful difference.
          </p>
          <Link to="/about" className="hero-btn">
            Learn More
          </Link>
        </div>
        <div className="hero-image">
          <img src={hero} alt="Sustainable Future" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
