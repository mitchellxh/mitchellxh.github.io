import React, { useState } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="nav-left">
          <img 
            src="/Logo1.png" 
            alt="Logo" 
            className="nav-logo"
          />
          <a href="/" className="nav-name">
            <span>Mitchell</span>
            <span>Horn</span>
          </a>
        </div>
        
        <div className="nav-center">
          <div 
            className="nav-item dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
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
          <a href="#about" className="nav-item">About Me</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 