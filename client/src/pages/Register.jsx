import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Leaf } from 'lucide-react';
import { authAPI } from '../utils/api';
import CenteredAuthLayout from '../components/CenteredAuthLayout';
import AuthFormCard from '../components/AuthFormCard';
import '../styles/LoginPage.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authAPI.register(registerData);
      setSuccess('Registration successful! Please check your email for verification.');
      console.log('Registration successful:', response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
          <p className="login-subtitle">Create your IRIS account</p>
        </div>
        {error && (
          <div className="login-error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="login-error-message" style={{background: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.3)', color: '#16a34a'}}>
            {success}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="name" className="login-form-label">Full Name</label>
            <div className="relative">
              <User className="login-input-icon" />
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="login-form-input"
                placeholder="Full Name"
              />
            </div>
          </div>

          <div className="login-form-group">
            <label htmlFor="email" className="login-form-label">Email Address</label>
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

          <div className="login-form-group">
            <label htmlFor="confirmPassword" className="login-form-label">Confirm Password</label>
            <div className="relative">
              <Lock className="login-input-icon" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="login-form-input"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="login-password-toggle"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login-submit-button"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <div className="login-form-links">
            <Link to="/login" className="login-form-link">
              Already have an account? Sign In
            </Link>
          </div>
        </form>
      </AuthFormCard>
    </CenteredAuthLayout>
  );
};

export default Register;