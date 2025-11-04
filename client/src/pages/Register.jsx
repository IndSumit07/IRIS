import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Leaf,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import CenteredAuthLayout from "../components/CenteredAuthLayout";
import AuthFormCard from "../components/AuthFormCard";
import "../styles/LoginPage.css";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const { registerUser, verifyEmail } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      fullname: {
        firstname: formData.firstName.trim(),
        lastname: formData.lastName.trim(),
      },
      email: formData.email.trim(),
      password: formData.password,
    };

    const success = await registerUser(payload);
    if (success) {
      setStep(2);
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      otp: otp,
    };
    await verifyEmail(payload);
  };

  const handleResendOtp = async () => {
    setLoadingResend(true);
    console.log("Resending OTP for:", formData.email);

    // Simulate resend delay
    setTimeout(() => {
      setLoadingResend(false);
      alert("OTP resent!");
    }, 800);
  };

  return (
    <CenteredAuthLayout>
      <AuthFormCard>
        <div className="login-form-header">
          <div className="login-logo">
            <Leaf className="login-logo-icon" />
            <h2 className="login-logo-text">IRIS</h2>
          </div>
          <p className="login-subtitle">
            {step === 1 ? "Create your IRIS account" : "Verify your email"}
          </p>
        </div>

        {/* Step indicator */}
        <div
          className="login-stepper"
          style={{ display: "flex", gap: 8, marginBottom: 16 }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: step >= 1 ? "#16a34a" : "#e5e7eb",
            }}
          />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: step >= 2 ? "#16a34a" : "#e5e7eb",
            }}
          />
        </div>

        {step === 1 && (
          <form className="login-form" onSubmit={handleRegisterSubmit}>
            <div className="login-form-group">
              <label htmlFor="firstName" className="login-form-label">
                First Name
              </label>
              <div className="relative">
                <User className="login-input-icon" />
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="login-form-input"
                  placeholder="First Name"
                />
              </div>
            </div>

            <div className="login-form-group">
              <label htmlFor="lastName" className="login-form-label">
                Last Name
              </label>
              <div className="relative">
                <User className="login-input-icon" />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="login-form-input"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="login-form-group">
              <label htmlFor="email" className="login-form-label">
                Email Address
              </label>
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
              <label htmlFor="password" className="login-form-label">
                Password
              </label>
              <div className="relative">
                <Lock className="login-input-icon" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
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
              disabled={loadingRegister}
              className="login-submit-button"
            >
              {loadingRegister ? "Creating account..." : "Continue"}
            </button>

            <div className="login-form-links">
              <Link to="/login" className="login-form-link">
                Already have an account? Sign In
              </Link>
            </div>
          </form>
        )}

        {step === 2 && (
          <form className="login-form" onSubmit={handleVerifySubmit}>
            <div className="login-form-group">
              <label htmlFor="otp" className="login-form-label">
                Enter Verification Code
              </label>
              <div className="relative">
                <ShieldCheck className="login-input-icon" />
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="login-form-input"
                  placeholder="6-digit code"
                />
              </div>
              <div
                className="login-form-help"
                style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}
              >
                We sent the code to <strong>{formData.email}</strong>
              </div>
            </div>

            <button
              type="submit"
              disabled={loadingVerify}
              className="login-submit-button"
            >
              {loadingVerify ? "Verifying..." : "Verify & Finish"}
            </button>

            <div
              className="login-form-links"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loadingResend}
                className="login-form-link"
                style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
              >
                <RefreshCw size={16} />
                {loadingResend ? "Resending..." : "Resend code"}
              </button>

              <Link to="/login" className="login-form-link">
                Go to Sign In
              </Link>
            </div>
          </form>
        )}
      </AuthFormCard>
    </CenteredAuthLayout>
  );
};

export default Register;
