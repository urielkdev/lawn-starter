import { Module } from '@nestjs/common';

import { SwapiApiService } from './swapi-api.service';

@Module({
  providers: [SwapiApiService],
  exports: [SwapiApiService],
})
export class SwapiApiModule {}
