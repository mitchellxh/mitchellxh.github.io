import React from 'react';
import TerminalBio from './TerminalBio';
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
              src="/prof-1-brain.png" 
              alt="Profile" 
              className="profile-image" 
            />
          </div>
          
          <div className="iframe-container">
            <iframe 
              src='https://flo.uri.sh/visualisation/20745838/embed' 
              title='Interactive or visual content' 
              className='flourish-embed-iframe' 
              frameBorder='0' 
              scrolling='no' 
              style={{
                width: '100%', 
                height: '800px'
              }} 
              sandbox='allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation'
            />
            <div className="flourish-credit">
              <img alt='Made with Flourish' 
                   src='https://public.flourish.studio/resources/made_with_flourish.svg' 
                   style={{width: '105px', height: '16px', border: 'none', margin: 0}} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Content; 
