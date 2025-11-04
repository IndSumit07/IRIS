import React from 'react';
import './AuthFormCard.css';

const AuthFormCard = ({ children }) => {
  return (
    <div className="auth-form-card">
      {children}
    </div>
  );
};

export default AuthFormCard;