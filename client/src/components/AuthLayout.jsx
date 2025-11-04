import React from 'react';
import { Leaf } from 'lucide-react';
import './AuthLayout.css';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        {/* Left Column - Farmer & Branding */}
        <div className="auth-left-column">
          <div className="farmer-container">
            <img 
              src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Farmer" 
              className="farmer-image"
            />
          </div>
          <div className="auth-branding">
            <h1 className="auth-title">Welcome to IRIS.</h1>
            <div className="auth-tagline">
              <Leaf className="tagline-icon" />
              <span>AI-Powered Decisions for a Greener Tomorrow</span>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="auth-right-column">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;