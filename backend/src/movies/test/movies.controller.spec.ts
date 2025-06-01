import { Test, TestingModule } from '@nestjs/testing';

import { MoviesController } from '../movies.controller';
import { MoviesService } from '../movies.service';
import { MoviesView } from '../movies.view';

describe('PeopleController', () => {
  let controller: MoviesController;
  let moviesService: MoviesService;
  let moviesView: MoviesView;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        { provide: MoviesService, useValue: {} },
        { provide: MoviesView, useValue: {} },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    moviesService = module.get<MoviesService>(MoviesService);
    moviesView = module.get<MoviesView>(MoviesView);
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

    it('should call moviesService.populatePeople', async () => {
      moviesService.populate = jest.fn().mockResolvedValue(undefined);

      const result = await controller.populate();

      expect(moviesService.populate).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ message: 'Movies populated successfully' });
    });

    it('should throw an error if moviesService.populatePeople fails', async () => {
      moviesService.populate = jest.fn().mockRejectedValue(new Error('Error'));

      await expect(controller.populate()).rejects.toThrow('Error');
    });
  });
});
