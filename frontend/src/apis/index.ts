import {
  SearchTypeEnum,
  type Movie,
  type Person,
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
    searchType === SearchTypeEnum.PEOPLE
      ? `${BASE_URL}/people`
      : `${BASE_URL}/movies`;

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
    searchType === SearchTypeEnum.PEOPLE ? result.people : result.movies
  ) as SearchResults;
};

async function getOneById(
  searchType: 'people' | 'movies',
  id: string
): Promise<Person | Movie> {
  const url = `${BASE_URL}/${searchType}`;

  const response = await fetch(`${url}/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  console.log(result);

  return searchType === SearchTypeEnum.PEOPLE
    ? (result as Person)
    : (result as Movie);
}

export const starWarsApi = {
  getListBySearchParam,
  getOneById,
};
