import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Leaf } from 'lucide-react';
import { authAPI } from '../utils/api';
import CenteredAuthLayout from '../components/CenteredAuthLayout';
import AuthFormCard from '../components/AuthFormCard';
import '../styles/LoginPage.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      console.log('Login successful:', response.data);
      // Handle successful login (redirect, store token, etc.)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CenteredAuthLayout>
      <AuthFormCard>
        <div className="login-form-header">
          <div className="login-logo">
            <Leaf className="login-logo-icon" />
            <h2 className="login-logo-text">IRIS</h2>
          </div>
          <p className="login-subtitle">Login to your Dashboard</p>
        </div>

        {error && (
          <div className="login-error-message">
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email" className="login-form-label">Email</label>
            <div className="relative">
              <Mail className="login-input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="login-form-input"
                placeholder="Email"
              />
            </div>
          </div>

          <div className="login-form-group">
            <label htmlFor="password" className="login-form-label">Password</label>
            <div className="relative">
              <Lock className="login-input-icon" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                className="login-form-input"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-password-toggle"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-submit-button"
          >
            {loading ? 'Signing in...' : 'Secure Login'}
          </button>

          <div className="login-form-links">
            <Link to="/forgot-password" className="login-form-link">
              Forgot Password?
            </Link>
            <Link to="/register" className="login-form-link">
              Sign Up
            </Link>
          </div>
        </form>
      </AuthFormCard>
    </CenteredAuthLayout>
  );
};

export default Login;