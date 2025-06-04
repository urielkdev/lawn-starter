import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueryLogModule } from './log/log.module';
import { MoviesModule } from './movies/movies.module';
import { PeopleModule } from './people/people.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule, PeopleModule, MoviesModule, QueryLogModule],
  controllers: [AppController],
  providers: [AppService, providePrismaClientExceptionFilter()],
})
export class AppModule {}
