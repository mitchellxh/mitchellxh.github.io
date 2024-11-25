// App.js
import React from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import MainContent from './MainContent'; // Import the MainContent component

import './App.css'; // Global styles (if any)

const App = () => {
  return (
    <div>
      {/* Navbar at the top of the page */}
      <Navbar />

      {/* Main content with text and image */}
      <MainContent />
    </div>
  );
};

export default App;
