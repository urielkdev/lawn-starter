import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [],
})
export class StatisticsModule {}
