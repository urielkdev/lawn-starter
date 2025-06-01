import React from 'react';
import './SearchResultList.css';

const results = [
  'Biggs Darklighter',
  'Obi-Wan Kenobi',
  'Jar Jar Binks',
  'Bib Fortuna',
];

const SearchResultList: React.FC = () => {
  return (
    <div className="results-list-container">
      <h3>Results</h3>
      {results.map((name) => (
        // TODO: change the key to {id}
        <div key={name} className="result-item">
          <span>{name}</span>
          <button>SEE DETAILS</button>
        </div>
      ))}
    </div>
  );
};

export default SearchResultList;
