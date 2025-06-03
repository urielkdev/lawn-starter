import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { starWarsApi } from '../../apis';
import SearchBox from '../../components/SearchBox/SearchBox';
import SearchResultList from '../../components/SearchResultList/SearchResultList';
import { useStateFromQueryParam } from '../../hooks';
import {
  SearchTypeEnum,
  type SearchResults,
  type SearchType,
} from '../../types';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [, setSearchParams] = useSearchParams();

  const [searchType, setSearchType] = useStateFromQueryParam<SearchType>(
    'searchType',
    SearchTypeEnum.PEOPLE
  );
  const [resultSearchType, setResultSearchType] = useState<SearchType>(
    SearchTypeEnum.PEOPLE
  );
  const [searchQuery, setSearchQuery] = useStateFromQueryParam<string>(
    'searchQuery',
    ''
  );
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResults>([]);

  const handleSearch = React.useCallback(async () => {
    setSearchParams({ searchType, searchQuery });
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
  }, [searchQuery, searchType, setSearchParams]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-page-container">
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
    </div>
  );
};

export default HomePage;
