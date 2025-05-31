import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PersonView } from './person.view';
import { Module } from '@nestjs/common';

import { SwapiApiModule } from 'src/swapi-api/swapi-api.module';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PersonView],
  imports: [SwapiApiModule],
})
export class PersonModule {}
