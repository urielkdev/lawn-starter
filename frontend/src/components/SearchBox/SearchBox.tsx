import React from 'react';
import { SearchTypeEnum, type SearchType } from '../../types';
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
            checked={searchType === SearchTypeEnum.PEOPLE}
            onChange={() => setSearchType(SearchTypeEnum.PEOPLE)}
          />
          People
        </label>
        <label>
          <input
            type="radio"
            value="movies"
            checked={searchType === SearchTypeEnum.MOVIES}
            onChange={() => setSearchType(SearchTypeEnum.MOVIES)}
          />
          Movies
        </label>
      </div>
      <input
        type="text"
        placeholder={
          searchType === SearchTypeEnum.PEOPLE
            ? 'e.g. Chewbacca, Yoda, Boba Fett'
            : 'e.g. Jedi, New Hope'
        }
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            await handleSearch();
          }
        }}
      />
      <button onClick={() => handleSearch()}>SEARCH</button>
    </div>
  );
};

export default SearchBox;
