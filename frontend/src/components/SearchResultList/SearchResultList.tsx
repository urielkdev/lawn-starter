import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResultList.css';

const results = [
  {
    id: '80e6a96e-936c-4375-b2b4-3c0679ca39cb',
    name: 'Luke Skywalker',
  },
  {
    id: 'ac61e3d6-bdd1-4383-857e-59b2cbafe05a',
    name: 'Luminara Unduli',
  },
];

const SearchResultList: React.FC = () => {
  const searchType = 'movies';
  return (
    <div className="results-list-container">
      <h3>Results</h3>
      {results.map((result) => (
        // TODO: change the key to {id}
        <div key={result.id} className="result-item">
          <span>{result.name}</span>
          <Link
            className="result-item-button"
            to={`/${searchType}/${result.id}`}
          >
            SEE DETAILS
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SearchResultList;
