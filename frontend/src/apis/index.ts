import {
  type MovieSimplified,
  type PersonSimplified,
  type SearchResults,
  type SearchType,
} from '../types';

const BASE_URL =
  import.meta.env.VITE_STAR_WARS_API_BASE_URL || 'http://localhost:3000';

const getListBySearchParam = async (
  searchType: SearchType,
  searchQuery: string
) => {
  const url =
    searchType === 'people' ? `${BASE_URL}/people` : `${BASE_URL}/movies`;

  const response = await fetch(`${url}?search-param=${searchQuery}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  // TODO: handle error response properly in the frontend
  if (!response.ok) {
    throw new Error(result.message);
  }

  return (
    searchType === 'people'
      ? (result.people as PersonSimplified[])
      : (result.movies as MovieSimplified[])
  ) as SearchResults;
};

export const starWarsApi = {
  getListBySearchParam,
};
