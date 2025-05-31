import { PersonService } from './person.service';
import { PersonView } from './person.view';
import { Controller, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    private readonly personView: PersonView,
  ) {}

  @Put('populate')
  async populate() {
    await this.personService.populate();
    return { message: 'People populated successfully' };
  }

  @Get(':id')
  async getUserSummaryByCategory(@Param('id') id: string) {
    const person = await this.personService.getById(id);

    return this.personView.renderGetById(person);
  }
}
