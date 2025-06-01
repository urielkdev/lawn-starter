import { MoviesService } from './movies.service';
import { MoviesView } from './movies.view';
import { Controller, Get, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly moviesView: MoviesView,
  ) {}

  @Put('populate')
  async populate() {
    await this.moviesService.populate();
    return { message: 'Movies populated successfully' };
  }

  @Get()
  async getListBySearchParam(@Query('search-param') searchParam: string) {
    const movies = await this.moviesService.getListBySearchParam(searchParam);

    return this.moviesView.renderGetListBySearchParam(movies);
  }
}
