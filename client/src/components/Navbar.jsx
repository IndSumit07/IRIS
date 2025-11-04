import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import "./Navbar.css";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // mobile overlay
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // user dropdown
  const { isAuthenticated, user, logoutUser } = useAuth();
  const userMenuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((s) => !s);
  const toggleUserMenu = () => setIsUserMenuOpen((s) => !s);

  const isLoggedIn = Boolean(isAuthenticated && user);
  const firstName = user?.fullname?.firstname || "User";

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userNavItems = [
    { label: "Dashboard", to: "/dashboard" },
    { label: "Profile", to: "/profile" },
    { label: "Settings", to: "/settings" },
  ];

  const handleLogout = async () => {
    // call your auth logout if available
    await logoutUser();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Leaf className="logo-icon" />
          <span className="logo-text">IRIS</span>
        </div>

        {/* Desktop: Auth / Welcome + user dropdown */}
        <div className="navbar-auth">
          {isLoggedIn ? (
            <div className="welcome-wrap" ref={userMenuRef}>
              <span className="welcome-text">Welcome, {firstName}</span>
              <button
                className="user-menu-trigger"
                aria-label="Open user menu"
                onClick={toggleUserMenu}
              >
                <Menu size={18} />
              </button>

              {isUserMenuOpen && (
                <div className="user-dropdown" role="menu">
                  {userNavItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="user-dropdown-item"
                      onClick={() => setIsUserMenuOpen(false)}
                      role="menuitem"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <button
                    className="user-dropdown-item user-dropdown-danger"
                    onClick={handleLogout}
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-login">
                Login
              </Link>
              <Link to="/register" className="btn-signup">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            {isLoggedIn ? (
              <div className="mobile-auth">
                <span className="welcome-text" style={{ textAlign: "center" }}>
                  Welcome, {firstName}
                </span>

                {/* Same nav options on mobile */}
                {userNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="mobile-link"
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                <button
                  className="mobile-link"
                  onClick={() => {
                    toggleMenu();
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mobile-auth">
                <Link to="/login" className="btn-login" onClick={toggleMenu}>
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-signup"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
