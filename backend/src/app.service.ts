import { MoviesService } from './movies/movies.service';
import { PeopleService } from './people/people.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private readonly peopleService: PeopleService,
    private readonly moviesService: MoviesService,
  ) {}

  health() {
    return { ok: true };
  }

  async populate() {
    await this.peopleService.populate();
    await this.moviesService.populate();
  }
}
