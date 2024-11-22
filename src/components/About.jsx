import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css'

const About = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2 className="about-title">Building a Sustainable Future for Our Planet</h2>
        <p className="about-description">
          At our core, we believe in creating a world that thrives for generations to come. Our mission is to 
          spearhead environmental conservation efforts that make a lasting positive impact on our planet. 
          Through innovative solutions, sustainable practices, and community engagement, we aim to address the 
          urgent challenges of climate change, waste management, and renewable energy. We envision a future 
          where humans live in harmony with nature, reducing our carbon footprint, conserving natural resources, 
          and fostering biodiversity.
        </p>
        <p className="about-description">
          Our focus is on inspiring change at both the local and global levels. We work alongside individuals, 
          organizations, and governments to promote policies that support environmental sustainability, raise 
          awareness, and drive impactful actions. From reducing waste to adopting cleaner energy solutions, we 
          believe every small step counts toward making a big difference.
        </p>
        <Link to="/" className='about-btn'>Back</Link>
      </div>
    </section>
  );
};

export default About;
