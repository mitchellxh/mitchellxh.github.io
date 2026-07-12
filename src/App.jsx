import React from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';
import ThemeToggle from './components/ThemeToggle';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <ThemeToggle />
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
