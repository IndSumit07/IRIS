import React from 'react';
import WaterDroplets from './WaterDroplets';
import './CenteredAuthLayout.css';

const CenteredAuthLayout = ({ children }) => {
  return (
    <div className="centered-auth-layout">
      <WaterDroplets />
      <div className="centered-auth-container">
        {children}
      </div>
    </div>
  );
};

export default CenteredAuthLayout;