import { faker } from '@faker-js/faker';
import { Person } from '@prisma/client';
import * as Factory from 'factory.ts';

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
