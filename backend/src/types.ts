import { Log } from '@prisma/client';

export type SwapiApiPersonDTO = {
  uid: string;
  name: string;
  birthYear: string;
  gender: string;
  eyeColor: string;
  hairColor: string;
  height: string;
  mass: string;
};

export type SwapiApiMovieDTO = {
  uid: string;
  title: string;
  openingCrawl: string;
  peopleUids: string[];
};

export type CreateLog = Omit<Log, 'id' | 'createdAt'>;
