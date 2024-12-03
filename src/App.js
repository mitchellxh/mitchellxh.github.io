// App.js
import React from 'react';
import Navbar from './components/Navbar';
import Content from './components/Content';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Content />
    </div>
  );
}

export default App;
