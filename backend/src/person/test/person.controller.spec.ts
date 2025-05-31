import { Test, TestingModule } from '@nestjs/testing';

import { PersonController } from '../person.controller';
import { PersonService } from '../person.service';
import { PersonView } from '../person.view';

describe('PersonController', () => {
  let controller: PersonController;
  let personService: PersonService;
  let personView: PersonView;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [
        { provide: PersonService, useValue: {} },
        { provide: PersonView, useValue: {} },
      ],
    }).compile();

    controller = module.get<PersonController>(PersonController);
    personService = module.get<PersonService>(PersonService);
    personView = module.get<PersonView>(PersonView);
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

    it('should call personService.populatePeople', async () => {
      personService.populate = jest.fn().mockResolvedValue(undefined);

      const result = await controller.populate();

      expect(personService.populate).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ message: 'People populated successfully' });
    });

    it('should throw an error if personService.populatePeople fails', async () => {
      personService.populate = jest.fn().mockRejectedValue(new Error('Error'));

      await expect(controller.populate()).rejects.toThrow('Error');
    });
  });
});
