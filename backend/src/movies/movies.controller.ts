import { MoviesService } from './movies.service';
import { MoviesView } from './movies.view';
import { Controller, Get, Param, Put, Query } from '@nestjs/common';
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

  @Get(':id')
  async getById(@Param('id') id: string) {
    const movie = await this.moviesService.getById(id);

    return this.moviesView.renderGetById(movie);
  }

  @Get()
  async getListBySearchParam(@Query('search-param') searchParam: string) {
    const movies = await this.moviesService.getListBySearchParam(searchParam);

    return this.moviesView.renderGetListBySearchParam(movies);
  }
}
