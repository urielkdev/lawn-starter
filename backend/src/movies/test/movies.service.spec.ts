import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { fetchAllMoviesFactory } from 'test/factories';

import { SwapiApiService } from 'src/swapi-api/swapi-api.service';

import { MoviesService } from '../movies.service';

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let prismaService: PrismaService;
  let swapiApiService: SwapiApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: PrismaService,
          useValue: { movie: { upsert: jest.fn(), findFirst: jest.fn() } },
        },
        {
          provide: SwapiApiService,
          useValue: { fetchAllMovies: jest.fn() },
        },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    prismaService = module.get<PrismaService>(PrismaService);
    swapiApiService = module.get<SwapiApiService>(SwapiApiService);
  });

  describe('populate', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call functions with correct params', async () => {
      const moviesMock = fetchAllMoviesFactory.buildList(1);
      const { peopleUids, ...movieMock } = moviesMock[0];
      const expectedPeopleConnect = peopleUids.map((uid) => ({ uid }));

      swapiApiService.fetchAllMovies = jest.fn().mockResolvedValue(moviesMock);
      prismaService.movie.upsert = jest.fn().mockResolvedValue(moviesMock[0]);

      await moviesService.populate();
      expect(swapiApiService.fetchAllMovies).toHaveBeenCalledTimes(1);
      expect(prismaService.movie.upsert).toHaveBeenCalledWith({
        where: { uid: movieMock.uid },
        update: {
          ...movieMock,
          people: {
            connect: expectedPeopleConnect,
          },
        },
        create: {
          ...movieMock,
          people: {
            connect: expectedPeopleConnect,
          },
        },
      });
      expect(prismaService.movie.upsert).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if swapiApiService.fetchAllMovies fails', async () => {
      swapiApiService.fetchAllMovies = jest
        .fn()
        .mockRejectedValue(new Error('Error'));

      await expect(moviesService.populate()).rejects.toThrow('Error');
    });
  });
});
