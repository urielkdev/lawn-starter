import React from 'react';
import type { Person } from '../../types';
import './PersonDetailsPage.css';

const personMock: Person = {
  id: '0eb267f5-f6c9-42ae-8000-73d3d8ce15b1',
  name: 'Lobot',
  birthYear: '37BBY',
  gender: 'male',
  eyeColor: 'blue',
  hairColor: 'none',
  height: '175',
  mass: '79',
  movies: [
    {
      id: 'ade279d9-14a9-480d-939e-2607d99ff855',
      title: 'The Empire Strikes Back',
    },
    {
      id: 'e33ae81c-71e6-4757-b095-29dcbd4ad194',
      title: 'A New Hope',
    },
  ],
};

const PersonDetailsPage: React.FC = () => {
  return (
    <div className="details-container">
      <h2>{personMock.name}</h2>
      <div className="details-grid">
        <div className="details-section">
          <h3>Details</h3>
          <hr />
          <p>Birth Year: {personMock.birthYear}</p>
          <p>Gender: {personMock.gender}</p>
          <p>Eye Color: {personMock.eyeColor}</p>
          <p>Hair Color: {personMock.hairColor}</p>
          <p>Height: {personMock.height}</p>
          <p>Mass: {personMock.mass}</p>
        </div>
        <div className="details-section">
          <h3>Movies</h3>
          <hr />
          {personMock.movies.map((movie) => (
            <p key={movie.id}>
              {/* TODO: react-router-dom to navigate to /movies/{movie.id} */}
              <a href={`#movies/${movie.id}`}>{movie.title}</a>
            </p>
          ))}
        </div>
      </div>
      <button className="back-button">BACK TO SEARCH</button>
    </div>
  );
};

export default PersonDetailsPage;
