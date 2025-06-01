import React from 'react';
import './App.css';
import Navbar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <HomePage />
      </div>
    </div>
  );
};

export default App;
