export interface Movie {
  id: string;
  title: string;
  openingCrawl: string;
  people: PersonSimplified[];
}

export interface PersonSimplified {
  id: string;
  name: string;
}

export interface Person {
  id: string;
  name: string;
  birthYear: string;
  gender: string;
  eyeColor: string;
  hairColor: string;
  height: string;
  mass: string;
  movies: MovieSimplified[];
}

export interface MovieSimplified {
  id: string;
  title: string;
}

export type SearchType = 'people' | 'movies';

export const SearchTypeEnum: Record<string, SearchType> = {
  PEOPLE: 'people',
  MOVIES: 'movies',
};

export type SearchResults = PersonSimplified[] | MovieSimplified[];
