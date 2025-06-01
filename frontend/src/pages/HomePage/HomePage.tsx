import React from 'react';
import SearchBox from '../../components/SearchBox/SearchBox';
import SearchResultList from '../../components/SearchResultList/SearchResultList';

const HomePage: React.FC = () => {
  return (
    <>
      <SearchBox />
      <SearchResultList />
    </>
  );
};

export default HomePage;
