import { PeopleService } from './people.service';
import { PeopleView } from './people.view';
import { Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(
    private readonly peopleService: PeopleService,
    private readonly peopleView: PeopleView,
  ) {}

  @Put('populate')
  async populate() {
    await this.peopleService.populate();
    return { message: 'People populated successfully' };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const people = await this.peopleService.getById(id);

    return this.peopleView.renderGetById(people);
  }

  @Get()
  async getListBySearchParam(@Query('search-param') searchParam: string) {
    const people = await this.peopleService.getListBySearchParam(searchParam);

    return this.peopleView.renderGetListBySearchParam(people);
  }
}
