import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { starWarsApi } from '../../apis';
import { LinkWithQueryParams } from '../../components/LinkWithQueryParams/LinkWithQueryParams';
import { SearchTypeEnum, type Person } from '../../types';
import './PersonDetailsPage.css';

const PersonDetailsPage: React.FC = () => {
  const location = useLocation();
  const id = location.pathname.split('/').pop() || '';

  const [person, setPerson] = useState<Person | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleFetchPerson = useCallback(async () => {
    setIsSearching(true);

    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      const data = await starWarsApi.getOneById(SearchTypeEnum.PEOPLE, id);

      setPerson(data as Person);
    } catch (error) {
      // TODO: if 404, redirect to 404 page
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  }, [id]);

  useEffect(() => {
    handleFetchPerson();
  }, [handleFetchPerson]);

  return (
    <div className="details-container">
      {isSearching || !person ? (
        <p className="p-no-result">Searching...</p>
      ) : (
        <>
          <h2>{person.name}</h2>
          <div className="details-grid">
            <div className="details-section">
              <h3>Details</h3>
              <hr />
              <p>Birth Year: {person.birthYear}</p>
              <p>Gender: {person.gender}</p>
              <p>Eye Color: {person.eyeColor}</p>
              <p>Hair Color: {person.hairColor}</p>
              <p>Height: {person.height}</p>
              <p>Mass: {person.mass}</p>
            </div>
            <div className="details-section">
              <h3>Movies</h3>
              <hr />
              {person.movies.map((movie, index) => (
                <div key={movie.id}>
                  <LinkWithQueryParams to={`/movies/${movie.id}`}>
                    {movie.title}
                  </LinkWithQueryParams>
                  {index < person.movies.length - 1 && ', '}
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

export default PersonDetailsPage;
