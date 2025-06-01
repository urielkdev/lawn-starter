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
