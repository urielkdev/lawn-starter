import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PersonView } from './person.view';
import { Module } from '@nestjs/common';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PersonView],
})
export class PersonModule {}
