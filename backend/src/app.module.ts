import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movie.module';
import { PeopleModule } from './people/people.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule, PeopleModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService, providePrismaClientExceptionFilter()],
})
export class AppModule {}
