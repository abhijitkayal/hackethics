import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    document.body.setAttribute("data-bs-theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
    setDarkMode(!darkMode);
  };

  // Set default dark theme on component mount
  React.useEffect(() => {
    document.body.setAttribute("data-bs-theme", "dark");
    document.body.setAttribute("data-theme", "dark");
  }, []);

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center text-white">
          <i className="bi bi-shield-lock-fill fs-4 me-2 text-white"></i>
          <div>
            <div className="fw-bold text-white">Hackethics138</div>
            <div className="small opacity-75 text-white">Cybersecurity · OSINT · AI</div>
          </div>
        </Link>

        <div className="navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/courses" className="nav-link text-white">
                Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/features" className="nav-link text-white">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/osinttool" className="nav-link text-white">
                OSINT Tools
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/gpt" className="nav-link text-white">
                AI Agent
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-white">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link text-white">
                Dashboard
              </Link>
            </li>
            
            <SignedOut>
              <li className="nav-item">
                <Link to="/login" className="nav-link text-white">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link text-white">
                  Sign Up
                </Link>
              </li>
            </SignedOut>
            
            <SignedIn>
              <li className="nav-item d-flex align-items-center">
                <UserButton afterSignOutUrl="/" />
              </li>
            </SignedIn>

            <li className="nav-item ms-3 d-flex align-items-center">
              <div className="form-check form-switch mb-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="themeToggle"
                  aria-label="Toggle dark mode"
                  onClick={toggleTheme}
                />
                <label
                  className="form-check-label small text-white"
                  htmlFor="themeToggle"
                >
                  <i id="themeIcon" className="bi bi-sun"></i>
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





