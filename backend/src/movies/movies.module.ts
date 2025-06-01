import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MoviesView } from './movies.view';
import { Module } from '@nestjs/common';

import { SwapiApiModule } from 'src/swapi-api/swapi-api.module';

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, MoviesView],
  imports: [SwapiApiModule],
})
export class MoviesModule {}
