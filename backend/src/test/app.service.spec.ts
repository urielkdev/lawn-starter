import { AppService } from './app.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  describe('health', () => {
    it('should return { ok: true }', async () => {
      const result = await appService.health();

      expect(result).toEqual({ ok: true });
    });
  });
});
