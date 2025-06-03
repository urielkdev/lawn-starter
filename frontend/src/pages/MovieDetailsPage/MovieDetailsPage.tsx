import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { starWarsApi } from '../../apis';
import { LinkWithQueryParams } from '../../components/LinkWithQueryParams/LinkWithQueryParams';
import { SearchTypeEnum, type Movie } from '../../types';
import './MovieDetailsPage.css';

const MovieDetailsPage: React.FC = () => {
  const location = useLocation();
  const id = location.pathname.split('/').pop() || '';

  const [movie, setMovie] = useState<Movie | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleFetchMovie = useCallback(async () => {
    setIsSearching(true);

    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      const data = await starWarsApi.getOneById(SearchTypeEnum.MOVIES, id);

      setMovie(data as Movie);
    } catch (error) {
      // TODO: if 404, redirect to 404 page
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  }, [id]);

  useEffect(() => {
    handleFetchMovie();
  }, [handleFetchMovie]);
  /* TODO: break this in another component, //repeated code (PersonDetailsPage)... */
  return (
    <div className="movie-container">
      {isSearching || !movie ? (
        <p className="p-no-result">Searching...</p>
      ) : (
        <>
          <h2>{movie.title}</h2>
          <div className="movie-grid">
            <div className="movie-section">
              <h3>Opening Crawl</h3>
              <hr />
              <p className="white-spacing-pre">{movie.openingCrawl}</p>
            </div>
            <div className="movie-section">
              <h3>Characters</h3>
              <hr />
              {movie.people.map((person, index) => (
                <div key={person.id}>
                  <LinkWithQueryParams to={`/people/${person.id}`}>
                    {person.name}
                  </LinkWithQueryParams>
                  {index < movie.people.length - 1 && ', '}
                </div>
              ))}
            </div>
          </div>
          <LinkWithQueryParams className="back-button" to="/">
            BACK TO SEARCH
          </LinkWithQueryParams>
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
