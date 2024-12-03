import React from 'react';
import '../styles/Content.css';

const Content = () => {
  return (
    <main className="content">
      <section className="text-section">
        <div className="text-container">
          <p>I am a senior research data specialist focused on empowering researchers with advanced computing, data management, and AI-driven solutions to enhance research efficiency and innovation.</p>
        </div>
      </section>

      <section className="image-section">
        <div className="image-container">
          <img src="/Picture1.png" alt="Profile" className="profile-image" />
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
      </section>
    </main>
  );
};

export default Content; 