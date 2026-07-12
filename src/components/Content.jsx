import React from 'react';
import TerminalBio from './TerminalBio';
import CareerMap from './CareerMap';
import '../styles/Content.css';

const Content = () => {
  return (
    <main className="content">
      <div className="main-content">
        <section className="text-section">
          <div className="text-container">
            <TerminalBio />
          </div>
        </section>

        <section className="content-section">
          <div className="image-container">
            <img 
              src="/prof-1-brain.webp"
              alt="Profile" 
              className="profile-image" 
            />
          </div>
          
          <CareerMap />
        </section>
      </div>
    </main>
  );
};

export default Content; 
