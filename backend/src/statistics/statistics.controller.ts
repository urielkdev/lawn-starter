import { StatisticsService } from './statistics.service';
import { Controller, Get, Post } from '@nestjs/common';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // Route just to test the service
  @Post()
  generate() {
    return this.statisticsService.generate();
  }

  @Get()
  getList() {
    return this.statisticsService.getList();
  }
}
