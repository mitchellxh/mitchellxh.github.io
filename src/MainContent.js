// MainContent.js
import React from "react";
import "./MainContent.css";

const MainContent = () => {
  const [particles, setParticles] = React.useState([]);
  
  // Generate initial particles
  React.useEffect(() => {
    const particleCount = 50;
    const initialParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * -100, // Start before left edge
      y: Math.random() * -100, // Start before top edge
      speed: 1 + Math.random(), // Random speed for variety
      hue: Math.random() * 360 // Initial random color
    }));
    
    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Move diagonally
          let newX = particle.x + particle.speed;
          let newY = particle.y + particle.speed;
          
          // Reset position if particle goes off screen
          if (newX > 200 || newY > 200) {
            newX = Math.random() * -100;
            newY = Math.random() * -100;
          }
          
          // Slowly change color
          let newHue = (particle.hue + 0.1) % 360;
          
          return {
            ...particle,
            x: newX,
            y: newY,
            hue: newHue
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-content">
      <div className="content-block">
        <p>I am a senior research data specialist focused on empowering researchers with advanced computing, data management, and AI-driven solutions to enhance research efficiency and innovation.</p>
      </div>
      <div className="image-container">
        <div className="particle-container">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                backgroundColor: `hsla(${particle.hue}, 70%, 50%, 0.5)`
              }}
            />
          ))}
        </div>
        <img alt="Profile" src={`${process.env.PUBLIC_URL}/BigPicture3.png`} />
      </div>
    </div>
  );
};

export default MainContent;
