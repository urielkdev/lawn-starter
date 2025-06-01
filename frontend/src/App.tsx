import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import PersonDetailsPage from './pages/PersonDetailsPage/PersonDetailsPage';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/people/:id" element={<PersonDetailsPage />} />
            <Route path="/movies/:id" element={<MovieDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
