import { Test, TestingModule } from '@nestjs/testing';

import { PeopleController } from '../people.controller';
import { PeopleService } from '../people.service';
import { PeopleView } from '../people.view';

describe('PeopleController', () => {
  let controller: PeopleController;
  let peopleService: PeopleService;
  let peopleView: PeopleView;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [
        { provide: PeopleService, useValue: {} },
        { provide: PeopleView, useValue: {} },
      ],
    }).compile();

    controller = module.get<PeopleController>(PeopleController);
    peopleService = module.get<PeopleService>(PeopleService);
    peopleView = module.get<PeopleView>(PeopleView);
  });

  /**
   * Please read this:
   * As in this application the controller is only calling the service function,
   * I decided not to unit test the controller (for reasons of time)
   */

  describe('populate', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should call peopleService.populatePeople', async () => {
      peopleService.populate = jest.fn().mockResolvedValue(undefined);

      const result = await controller.populate();

      expect(peopleService.populate).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ message: 'People populated successfully' });
    });

    it('should throw an error if peopleService.populatePeople fails', async () => {
      peopleService.populate = jest.fn().mockRejectedValue(new Error('Error'));

      await expect(controller.populate()).rejects.toThrow('Error');
    });
  });
});
