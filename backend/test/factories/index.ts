import { faker } from '@faker-js/faker';
import { Movie, Person } from '@prisma/client';
import * as Factory from 'factory.ts';
import { SwapiApiMovieDTO } from 'src/types';

export const personFactory = Factory.Sync.makeFactory<Person>({
  id: faker.string.uuid(),
  uid: faker.string.uuid(),
  name: faker.commerce.department(),
  birthYear: faker.date.past().getFullYear().toString(),
  eyeColor: faker.color.human(),
  hairColor: faker.color.human(),
  gender: faker.color.human(),
  height: faker.number.int({ min: 150, max: 200 }).toString(),
  mass: faker.number.int({ min: 50, max: 100 }).toString(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
});

export const movieFactory = Factory.Sync.makeFactory<Movie>({
  id: faker.string.uuid(),
  uid: faker.string.uuid(),
  title: faker.commerce.department(),
  openingCrawl: faker.lorem.paragraph(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
});

export const fetchAllMoviesFactory = Factory.Sync.makeFactory<SwapiApiMovieDTO>(
  {
    uid: faker.string.uuid(),
    title: faker.commerce.department(),
    openingCrawl: faker.lorem.paragraph(),
    peopleUids: [`base_url/people/${faker.string.uuid()}`],
  },
);

export const swapiApiPersonFactory = Factory.Sync.makeFactory({
  uid: faker.string.uuid(),
  properties: {
    name: faker.commerce.department(),
    birth_year: faker.date.past().getFullYear().toString(),
    eye_color: faker.color.human(),
    hair_color: faker.color.human(),
    gender: faker.color.human(),
    height: faker.number.int({ min: 150, max: 200 }).toString(),
    mass: faker.number.int({ min: 50, max: 100 }).toString(),
  },
});

export const swapiApiMovieFactory = Factory.Sync.makeFactory({
  uid: faker.string.uuid(),
  properties: {
    title: faker.commerce.department(),
    opening_crawl: faker.lorem.paragraph(),
    characters: [`base_url/people/${faker.string.uuid()}`],
  },
});
