// Navbar.js
import React, { useState } from "react";
import './Navbar.css';  // To style the navbar

const Navbar = () => {
  // State to manage the logo image
  const [logo, setLogo] = useState("/Picture1.png");

  // Function to handle mouse hover (change the logo)
  const handleMouseEnter = () => {
    setLogo("/Picture2.png");  // Change to alternate logo
  };

  // Function to handle mouse leave (revert to original logo)
  const handleMouseLeave = () => {
    setLogo("/Picture1.png");  // Revert to original logo
  };

  return (
    <nav className="navbar">
      <div className="logo">
        {/* Logo image that changes on hover */}
        <img 
          src={logo} 
          alt="Logo" 
          className="logo-img" 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        />
      </div>
      <div className="name">
        <div>Mitchell</div>
        <div>Horn</div>
      </div>
      <div className="menu">
        <a href="#publications">Publications</a>
        <a href="#resources">Resources</a>
        <a href="#aboutme">About Me</a>
      </div>
    </nav>
  );
};

export default Navbar;
