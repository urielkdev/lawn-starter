import React from 'react';
import type { SearchType } from '../../types';
import './SearchBox.css';

interface SearchBoxProps {
  searchType: SearchType;
  setSearchType: React.Dispatch<React.SetStateAction<SearchType>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => Promise<void>;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchType,
  setSearchType,
  searchQuery,
  setSearchQuery,
  handleSearch,
}) => {
  return (
    <div className="search-box-container">
      <p>What are you searching for?</p>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="people"
            checked={searchType === 'people'}
            onChange={() => setSearchType('people')}
          />
          People
        </label>
        <label>
          <input
            type="radio"
            value="movies"
            checked={searchType === 'movies'}
            onChange={() => setSearchType('movies')}
          />
          Movies
        </label>
      </div>
      <input
        type="text"
        placeholder={
          searchType === 'people'
            ? 'e.g. Chewbacca, Yoda, Boba Fett'
            : 'e.g. Jedi, New Hope'
        }
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={() => handleSearch()}>SEARCH</button>
    </div>
  );
};

export default SearchBox;
