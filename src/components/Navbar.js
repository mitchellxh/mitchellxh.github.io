import React, { useState } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="nav-left">
          <img src="/Logo1.png" alt="Logo" className="nav-logo" />
          <a href="/" className="nav-name">Mitchell Horn</a>
        </div>

        <div className="social-links">
          <a href="https://ask.cyberinfrastructure.org/u/mitchellxh/summary" target="_blank" rel="noopener noreferrer">
            <img src="/icons/askci.png" alt="AskCI" className="social-icon" />
          </a>
          <a href="https://www.linkedin.com/in/mitchell-horn-92a279106/" target="_blank" rel="noopener noreferrer">
            <img src="/icons/linkedin.png" alt="LinkedIn" className="social-icon" />
          </a>
          <a href="https://x.com/MitchellHorn_" target="_blank" rel="noopener noreferrer">
            <img src="/icons/x.png" alt="Twitter" className="social-icon" />
          </a>
          <a href="https://github.com/mitchellxh/" target="_blank" rel="noopener noreferrer">
            <img src="/icons/gh.png" alt="GitHub" className="social-icon" />
          </a>
          <a href="https://environment.yale.edu/directory/staff/mitchell-horn" target="_blank" rel="noopener noreferrer">
            <img src="/icons/yse.png" alt="Yale" className="social-icon" />
          </a>
        </div>

        <div className="nav-right">
          <div className="nav-item dropdown"
               onMouseEnter={() => setIsDropdownOpen(true)}
               onMouseLeave={() => setIsDropdownOpen(false)}>
            <span>Publications</span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <a href="https://orcid.org/0000-0002-8249-5793">ORCID</a>
                <a href="https://scholar.google.com/citations?user=eBbRfewAAAAJ&hl=en">Google Scholar</a>
                <a href="https://www.researchgate.net/profile/Mitchell-Horn">ResearchGate</a>
              </div>
            )}
          </div>
          <a href="https://yse-rc.github.io/" className="nav-item">Resources</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 