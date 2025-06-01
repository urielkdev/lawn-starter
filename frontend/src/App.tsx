import React from 'react';
import './App.css';
import Navbar from './components/NavBar/NavBar';
import PersonDetailsPage from './pages/PersonDetailsPage/PersonDetailsPage';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        {/* <HomePage /> */}
        <PersonDetailsPage />
      </div>
    </div>
  );
};

export default App;
