import React from 'react';
import '../styles/WaterDroplets.css';

const WaterDroplets = () => {
  return (
    <>
      <div className="water-droplets">
        <div className="droplet"></div>
        <div className="droplet"></div>
        <div className="droplet"></div>
        <div className="droplet"></div>
        <div className="droplet"></div>
        <div className="droplet"></div>
        <div className="droplet"></div>
        <div className="droplet"></div>
      </div>
      <div className="water-ripples">
        <div className="ripple"></div>
        <div className="ripple"></div>
        <div className="ripple"></div>
      </div>
    </>
  );
};

export default WaterDroplets;