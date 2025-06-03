import React from 'react';
import { Link } from 'react-router-dom';
import type { SearchResults, SearchType } from '../../types';
import './SearchResultList.css';

interface SearchResultListProps {
  isSearching: boolean;
  searchType: SearchType;
  results: SearchResults;
}

const SearchResultList: React.FC<SearchResultListProps> = ({
  isSearching,
  searchType,
  results,
}) => {
  return (
    // TODO: this card should be the same width everywhere and with scrolling
    <div className="results-list-container">
      <h3>Results</h3>
      <hr />
      {/* TODO: styling center these <p> */}
      {isSearching ? (
        <p className="p-no-result">Searching...</p>
      ) : results.length === 0 ? (
        <p className="p-no-result">
          There are zero matches. Use the form to search for People or Movies.
        </p>
      ) : (
        results.map((result) => (
          <div key={result.id} className="result-item">
            <span>{'name' in result ? result.name : result.title}</span>
            <Link
              className="result-item-button"
              to={`/${searchType}/${result.id}`}
            >
              SEE DETAILS
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResultList;
