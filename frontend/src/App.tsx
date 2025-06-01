import React from 'react';
import './App.css';
import Navbar from './components/NavBar/NavBar';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        {/* <HomePage /> */}
        {/* <PersonDetailsPage /> */}
        <MovieDetailsPage />
      </div>
    </div>
  );
};

export default App;
