// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import MainContent from './MainContent'; // Import the MainContent component
import Publications from './Publications'; // New component for publications

import './App.css'; // Global styles (if any)

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/publications" element={<Publications />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
