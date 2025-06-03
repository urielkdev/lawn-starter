import React from 'react';
import type { SearchResults, SearchType } from '../../types';
import { LinkWithQueryParams } from '../LinkWithQueryParams/LinkWithQueryParams';
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
        <div className="p-no-result">
          <p>Searching...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="p-no-result">
          <p>
            There are zero matches.
            <br /> Use the form to search for People or Movies.
          </p>
        </div>
      ) : (
        results.map((result) => (
          <div key={result.id}>
            <div className="result-item">
              <span>{'name' in result ? result.name : result.title}</span>
              <LinkWithQueryParams
                className="result-item-button"
                to={`/${searchType}/${result.id}`}
              >
                SEE DETAILS
              </LinkWithQueryParams>
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResultList;
