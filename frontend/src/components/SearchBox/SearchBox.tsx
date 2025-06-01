import React, { useState } from 'react';
import './SearchBox.css';

const SearchBox: React.FC = () => {
  const [type, setType] = useState<'people' | 'movies'>('people');
  const [query, setQuery] = useState('');

  return (
    <div className="search-box">
      <p>What are you searching for?</p>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            value="people"
            checked={type === 'people'}
            onChange={() => setType('people')}
          />
          People
        </label>
        <label>
          <input
            type="radio"
            value="movies"
            checked={type === 'movies'}
            onChange={() => setType('movies')}
          />
          Movies
        </label>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button>SEARCH</button>
    </div>
  );
};

export default SearchBox;
