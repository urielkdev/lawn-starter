import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { personFactory } from 'test/factories';

import { SwapiApiService } from 'src/swapi-api/swapi-api.service';

import { PersonService } from '../person.service';

describe('PersonService', () => {
  let personService: PersonService;
  let prismaService: PrismaService;
  let swapiApiService: SwapiApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        { provide: PrismaService, useValue: { person: { upsert: jest.fn() } } },
        {
          provide: SwapiApiService,
          useValue: { fetchAllPeople: jest.fn() },
        },
      ],
    }).compile();

    personService = module.get<PersonService>(PersonService);
    prismaService = module.get<PrismaService>(PrismaService);
    swapiApiService = module.get<SwapiApiService>(SwapiApiService);
  });

  describe('populatePeople', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call functions with correct params', async () => {
      const personMock = personFactory.buildList(1);

      swapiApiService.fetchAllPeople = jest.fn().mockResolvedValue(personMock);
      prismaService.person.upsert = jest.fn().mockResolvedValue(personMock[0]);

      await personService.populate();

      expect(prismaService.person.upsert).toHaveBeenCalledTimes(
        personMock.length,
      );
      expect(prismaService.person.upsert).toHaveBeenCalledWith({
        where: { uid: personMock[0].uid },
        update: { ...personMock[0] },
        create: { ...personMock[0] },
      });
    });

    it('should throw an error if swapiApiService.fetchAllPeople fails', async () => {
      swapiApiService.fetchAllPeople = jest
        .fn()
        .mockRejectedValue(new Error('Error'));

      await expect(personService.populate()).rejects.toThrow('Error');
    });
  });

  describe('getById', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call functions with correct params', async () => {
      const personMock = personFactory.build();
      const personId = personMock.id;

      prismaService.person.findFirst = jest.fn().mockResolvedValue(personMock);

      const result = await personService.getById(personId);

      expect(prismaService.person.findFirst).toHaveBeenCalledWith({
        where: { id: personId },
      });
      expect(result).toEqual(personMock);
    });

    it('should return null if no person is found', async () => {
      const personId = '123';

      prismaService.person.findFirst = jest.fn().mockResolvedValue(null);

      const result = await personService.getById(personId);

      expect(prismaService.person.findFirst).toHaveBeenCalledWith({
        where: { id: personId },
      });
      expect(result).toBeNull();
    });
  });
});
