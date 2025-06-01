import { Injectable } from '@nestjs/common';
import { Person } from '@prisma/client';
import { SwapiApiMovieDTO, SwapiApiPersonDTO } from 'src/types';

@Injectable()
export class SwapiApiService {
  private readonly BASE_URL =
    process.env.SWAPI_API_URL || 'https://swapi.tech/api';
  private readonly PAGE_LIMIT = 10;

  async fetchAllPeople(): Promise<SwapiApiPersonDTO[]> {
    const allPeople: Person[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const url = `${this.BASE_URL}/people/?page=${page}&limit=${this.PAGE_LIMIT}&expanded=true`;
      const response = await fetch(url);
      const data = await response.json();

      const peoplePage = data.results.map(this.mapPersonData);

      allPeople.push(...peoplePage);
      totalPages = data.total_pages;
      page++;
    } while (page <= totalPages);

    return allPeople;
  }

  private mapPersonData(person: any): SwapiApiPersonDTO {
    const { properties } = person;

    return {
      uid: person.uid,
      name: properties.name,
      birthYear: properties.birth_year,
      gender: properties.gender,
      eyeColor: properties.eye_color,
      hairColor: properties.hair_color,
      height: properties.height,
      mass: properties.mass,
    };
  }

  async fetchAllMovies(): Promise<SwapiApiMovieDTO[]> {
    const url = `${this.BASE_URL}/films?expanded=true`;
    const response = await fetch(url);
    const data = await response.json();

    const allMovies = data.result.map((movie) => this.mapMovieData(movie));

    return allMovies;
  }

  private mapMovieData(movie: any): SwapiApiMovieDTO {
    const { properties } = movie;

    return {
      uid: movie.uid,
      title: properties.title,
      openingCrawl: properties.opening_crawl,
      peopleUids: properties.characters.map(this.extractCharacterUid),
    };
  }

  private extractCharacterUid(character: string): string {
    return character.split('people/')[1];
  }
}
