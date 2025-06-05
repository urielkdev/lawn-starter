import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { PeopleView } from './people.view';
import { Module } from '@nestjs/common';

import { SwapiApiModule } from 'src/swapi-api/swapi-api.module';

@Module({
  controllers: [PeopleController],
  providers: [PeopleService, PeopleView],
  imports: [SwapiApiModule],
  exports: [PeopleService],
})
export class PeopleModule {}
