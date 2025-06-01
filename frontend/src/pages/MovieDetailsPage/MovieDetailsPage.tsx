import React from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../../types';
import './MovieDetailsPage.css';

const movieMock: Movie = {
  id: 'ade279d9-14a9-480d-939e-2607d99ff855',
  title: 'The Empire Strikes Back',
  openingCrawl:
    'It is a dark time for the\r\nRebellion. Although the Death\r\nStar has been destroyed,\r\nImperial troops have driven the\r\nRebel forces from their hidden\r\nbase and pursued them across\r\nthe galaxy.\r\n\r\nEvading the dreaded Imperial\r\nStarfleet, a group of freedom\r\nfighters led by Luke Skywalker\r\nhas established a new secret\r\nbase on the remote ice world\r\nof Hoth.\r\n\r\nThe evil lord Darth Vader,\r\nobsessed with finding young\r\nSkywalker, has dispatched\r\nthousands of remote probes into\r\nthe far reaches of space....',
  people: [
    {
      id: '0eb267f5-f6c9-42ae-8000-73d3d8ce15b1',
      name: 'Lobot',
    },
    {
      id: '7979acf9-8053-4f6a-8893-df3082b899f2',
      name: 'Palpatine',
    },
  ],
};

const MovieDetailsPage: React.FC = () => {
  const movie = movieMock; // Replace with actual movie data from API

  /* TODO: break this in another component, //repeated code (PersonDetailsPage)... */
  return (
    <div className="movie-container">
      <h2>{movie.title}</h2>
      <div className="movie-grid">
        <div className="movie-section">
          <h3>Opening Crawl</h3>
          <hr />
          <p>{movie.openingCrawl}</p>
        </div>
        <div className="movie-section">
          <h3>Characters</h3>
          <hr />
          {movie.people.map((person) => (
            <p key={person.id}>
              <Link to={`/people/${person.id}`}>{person.name}</Link>
            </p>
          ))}
        </div>
      </div>
      <Link className="back-button" to="/">
        BACK TO SEARCH
      </Link>
    </div>
  );
};

export default MovieDetailsPage;
