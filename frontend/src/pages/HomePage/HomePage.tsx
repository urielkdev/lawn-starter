import React, { useState } from 'react';
import { starWarsApi } from '../../apis';
import SearchBox from '../../components/SearchBox/SearchBox';
import SearchResultList from '../../components/SearchResultList/SearchResultList';
import type { SearchResults, SearchType } from '../../types';

const HomePage: React.FC = () => {
  const [searchType, setSearchType] = useState<SearchType>('people');
  const [resultSearchType, setResultSearchType] =
    useState<SearchType>('people');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResults>([]);

  const handleSearch = async () => {
    setResultSearchType(searchType);

    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

      const data = await starWarsApi.getListBySearchParam(
        searchType,
        searchQuery
      );

      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <SearchBox
        searchType={searchType}
        setSearchType={setSearchType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <SearchResultList
        isSearching={isSearching}
        searchType={resultSearchType}
        results={results}
      />
    </>
  );
};

export default HomePage;
