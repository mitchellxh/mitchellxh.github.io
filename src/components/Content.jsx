import React from 'react';
import TerminalBio from './TerminalBio';
import CareerMap from './CareerMap';
import '../styles/Content.css';

const Content = () => {
  return (
    <main className="content">
      <div className="main-content">
        <section className="text-section">
          <div className="text-container whoami-panel">
            <div className="whoami-bio">
              <TerminalBio />
            </div>
            <img
              src="/prof-1-brain.webp"
              alt="Mitchell Horn"
              className="whoami-face"
            />
          </div>
        </section>

        <section className="content-section">
          <CareerMap />
        </section>
      </div>
    </main>
  );
};

export default Content;
