import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { personFactory } from 'test/factories';

import { SwapiApiService } from 'src/swapi-api/swapi-api.service';

import { PeopleService } from '../people.service';

describe('PeopleService', () => {
  let peopleService: PeopleService;
  let prismaService: PrismaService;
  let swapiApiService: SwapiApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        { provide: PrismaService, useValue: { person: { upsert: jest.fn() } } },
        {
          provide: SwapiApiService,
          useValue: { fetchAllPeople: jest.fn() },
        },
      ],
    }).compile();

    peopleService = module.get<PeopleService>(PeopleService);
    prismaService = module.get<PrismaService>(PrismaService);
    swapiApiService = module.get<SwapiApiService>(SwapiApiService);
  });

  describe('populate', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call functions with correct params', async () => {
      const peopleMock = personFactory.buildList(1);

      swapiApiService.fetchAllPeople = jest.fn().mockResolvedValue(peopleMock);
      prismaService.person.upsert = jest.fn().mockResolvedValue(peopleMock[0]);

      await peopleService.populate();

      expect(prismaService.person.upsert).toHaveBeenCalledTimes(
        peopleMock.length,
      );
      expect(prismaService.person.upsert).toHaveBeenCalledWith({
        where: { uid: peopleMock[0].uid },
        update: { ...peopleMock[0] },
        create: { ...peopleMock[0] },
      });
    });

    it('should not call upsert if no people are returned', async () => {
      swapiApiService.fetchAllPeople = jest.fn().mockResolvedValue([]);

      await peopleService.populate();

      expect(prismaService.person.upsert).toHaveBeenCalledTimes(0);
    });

    it('should throw an error if swapiApiService.fetchAllPeople fails', async () => {
      swapiApiService.fetchAllPeople = jest
        .fn()
        .mockRejectedValue(new Error('Error'));

      await expect(peopleService.populate()).rejects.toThrow('Error');
    });
  });

  describe('getById', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call functions with correct params', async () => {
      const peopleMock = personFactory.build();
      const peopleId = peopleMock.id;

      prismaService.person.findFirst = jest.fn().mockResolvedValue(peopleMock);

      const result = await peopleService.getById(peopleId);

      expect(prismaService.person.findFirst).toHaveBeenCalledWith({
        where: { id: peopleId },
      });
      expect(result).toEqual(peopleMock);
    });

    it('should throw NotFoundException if people is not found', async () => {
      const peopleId = 'non-existent-id';

      prismaService.person.findFirst = jest.fn().mockResolvedValue(null);

      await expect(peopleService.getById(peopleId)).rejects.toThrow(
        `Person with id ${peopleId} not found`,
      );
    });
  });
});
