import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogsModule } from './log/logs.module';
import { MoviesModule } from './movies/movies.module';
import { PeopleModule } from './people/people.module';
import { PrismaModule } from './prisma/prisma.module';
import { StatisticsModule } from './statistics/statistics.module';
import { Module } from '@nestjs/common';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule,
    PeopleModule,
    MoviesModule,
    LogsModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService, providePrismaClientExceptionFilter()],
})
export class AppModule {}
