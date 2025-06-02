import React, { useState } from 'react';
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
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay until we use the real API
      setResults([
        {
          id: '80e6a96e-936c-4375-b2b4-3c0679ca39cb',
          name: 'Luke Skywalker',
        },
        {
          id: 'ac61e3d6-bdd1-4383-857e-59b2cbafe05a',
          name: 'Luminara Unduli',
        },
      ]);
      // TODO: Replace with actual API call
      // const data = await api...(searchType, searchQuery);
      // setResults(searchType === "people" ? data.people || [] : data.movies || []);
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
