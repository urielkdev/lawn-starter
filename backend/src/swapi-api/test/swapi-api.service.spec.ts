import { Test, TestingModule } from '@nestjs/testing';
import { swapiApiMovieFactory, swapiApiPersonFactory } from 'test/factories';

import { SwapiApiService } from '../swapi-api.service';

describe('SwapiApiService', () => {
  let swapiApiService: SwapiApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwapiApiService],
    }).compile();

    swapiApiService = module.get<SwapiApiService>(SwapiApiService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchAllPeople', () => {
    it('should fetch and map a single page of people', async () => {
      const mockApiResponse = {
        results: [swapiApiPersonFactory.build()],
        total_pages: 1,
      };

      const person = mockApiResponse.results[0];
      const personProprerties = person.properties;

      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockApiResponse),
      } as any);

      const result = await swapiApiService.fetchAllPeople();

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual([
        {
          uid: person.uid,
          name: personProprerties.name,
          birthYear: personProprerties.birth_year,
          gender: personProprerties.gender,
          eyeColor: personProprerties.eye_color,
          hairColor: personProprerties.hair_color,
          height: personProprerties.height,
          mass: personProprerties.mass,
        },
      ]);
    });

    it('should fetch and map multiple pages of people', async () => {
      const mockApiResponses = [
        {
          results: [swapiApiPersonFactory.build()],
          total_pages: 2,
        },
        {
          results: [swapiApiPersonFactory.build()],
          total_pages: 2,
        },
      ];

      const person1 = mockApiResponses[0].results[0];
      const personProprerties1 = person1.properties;
      const person2 = mockApiResponses[1].results[0];
      const personProprerties2 = person2.properties;

      let call = 0;
      global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockApiResponses[call++]),
        }),
      );

      const result = await swapiApiService.fetchAllPeople();

      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(result).toEqual([
        {
          uid: person1.uid,
          name: personProprerties1.name,
          birthYear: personProprerties1.birth_year,
          gender: personProprerties1.gender,
          eyeColor: personProprerties1.eye_color,
          hairColor: personProprerties1.hair_color,
          height: personProprerties1.height,
          mass: personProprerties1.mass,
        },
        {
          uid: person2.uid,
          name: personProprerties2.name,
          birthYear: personProprerties2.birth_year,
          gender: personProprerties2.gender,
          eyeColor: personProprerties2.eye_color,
          hairColor: personProprerties2.hair_color,
          height: personProprerties2.height,
          mass: personProprerties2.mass,
        },
      ]);
    });

    it('should return an empty array if no results', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          results: [],
          total_pages: 1,
        }),
      } as any);

      const result = await swapiApiService.fetchAllPeople();

      expect(result).toEqual([]);
    });

    it('should throw if fetch fails', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      await expect(swapiApiService.fetchAllPeople()).rejects.toThrow(
        'Network error',
      );
    });
  });

  describe('fetchAllMovies', () => {
    it('should fetch and map all movies', async () => {
      const mockApiResponse = { result: swapiApiMovieFactory.buildList(1) };

      const movie = mockApiResponse.result[0];
      const movieProperties = movie.properties;

      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockApiResponse),
      } as any);

      const result = await swapiApiService.fetchAllMovies();

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual([
        {
          uid: movie.uid,
          title: movieProperties.title,
          openingCrawl: movieProperties.opening_crawl,
          peopleUids: movieProperties.characters.map(
            (character: string) => character.split('people/')[1],
          ),
        },
      ]);
    });

    it('should return an empty array if no movies', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ result: [] }),
      } as any);

      const result = await swapiApiService.fetchAllMovies();

      expect(result).toEqual([]);
    });

    it('should throw if fetch fails', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      await expect(swapiApiService.fetchAllMovies()).rejects.toThrow(
        'Network error',
      );
    });
  });
});
