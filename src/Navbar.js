// Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import './Navbar.css';  // To style the navbar

const Navbar = () => {
  const [logo, setLogo] = useState("/Picture1.png");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setLogo("/Picture2.png");
  };

  const handleMouseLeave = () => {
    setLogo("/Picture1.png");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img 
            src={logo} 
            alt="Logo" 
            className="logo-img" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
          />
        </Link>
      </div>
      <div className="name">
        <Link to="/" className="name-link">
          <div className="name-part mitchell">Mitchell</div>
          <div className="name-part horn">Horn</div>
        </Link>
      </div>
      <div className="menu">
        <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
          <Link to="/publications" className="menu-item">Publications</Link>
          {dropdownVisible && (
            <div className="dropdown-content">
              <a href="https://orcid.org">ORCID</a>
              <a href="https://www.researchgate.net">ResearchGate</a>
              <a href="https://scholar.google.com">Google Scholar</a>
            </div>
          )}
        </div>
        <a href="#resources" className="menu-item">Resources</a>
        <a href="#aboutme" className="menu-item">About Me</a>
      </div>
    </nav>
  );
};

export default Navbar;
