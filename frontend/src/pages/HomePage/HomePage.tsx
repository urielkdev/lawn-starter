import React, { useState } from 'react';
import { starWarsApi } from '../../apis';
import SearchBox from '../../components/SearchBox/SearchBox';
import SearchResultList from '../../components/SearchResultList/SearchResultList';
import {
  SearchTypeEnum,
  type SearchResults,
  type SearchType,
} from '../../types';

const HomePage: React.FC = () => {
  const [searchType, setSearchType] = useState<SearchType>(
    SearchTypeEnum.PEOPLE
  );
  const [resultSearchType, setResultSearchType] = useState<SearchType>(
    SearchTypeEnum.PEOPLE
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResults>([]);

  // TODO: useSearchParams to handle back buttons // useSearchParams()

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
