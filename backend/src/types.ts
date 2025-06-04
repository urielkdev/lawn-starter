import { Log, Statistic } from '@prisma/client';

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

export type CreateStatistic = Omit<Statistic, 'id' | 'createdAt'>;

export enum StatisticsTypesEnum {
  GET_AVERAGE_DURATION_PER_ROUTE = 'get-average-duration-per-route',
  GET_ACCESSED_ROUTES_RANK = 'get-accessed-routes-rank',
  GET_MOVIES_SEARCHES_RANK = 'get-movies-searches-rank',
  GET_PEOPLE_SEARCHES_RANK = 'get-people-searches-rank',
}

export type StatisticsTypes = `${StatisticsTypesEnum}`;
