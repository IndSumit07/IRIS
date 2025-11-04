import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Brain, Gauge, Sprout } from 'lucide-react';
import Navbar from '../components/Navbar';
import '../styles/LandingPage.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <Navbar />
      
      <div className="content-grid">
        {/* Left Column - Branding & Features */}
        <div className="branding-section">
          <h1 className="hero-headline">IRIS: AI-Powered Smart Irrigation</h1>
          <p className="hero-description">
            Optimize water usage, enhance crop health, and simplify farm management with intelligent automation. 
            A proof-of-concept for sustainable agriculture.
          </p>
          
          <ul className="benefits-list">
            <li className="benefit-item">
              <Gauge className="benefit-icon" />
              <div>
                <strong>Real-time Sensor Data:</strong> Precision monitoring.
              </div>
            </li>
            <li className="benefit-item">
              <Brain className="benefit-icon" />
              <div>
                <strong>AI-Driven Scheduling:</strong> Adaptive watering plans.
              </div>
            </li>
            <li className="benefit-item">
              <Droplets className="benefit-icon" />
              <div>
                <strong>Water Conservation:</strong> Reduce waste, save resources.
              </div>
            </li>
          </ul>
        </div>

        {/* Right Column - Call to Action */}
        <div className="cta-section">
          <h2 className="cta-headline">Experience the Future of Farming</h2>
          
          <div className="visual-container">
            <Sprout className="visual-icon" />
          </div>
          
          <div className="button-group">
            <Link to="/demo" className="btn-demo">
              View Live Demo
            </Link>
            <Link to="/register" className="btn-access">
              Request Early Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;