import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogsModule } from './log/logs.module';
import { MessageHandlerListener } from './message-handler/message-handler.listener';
import { MessageHandlerModule } from './message-handler/message-handler.module';
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
    MessageHandlerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    providePrismaClientExceptionFilter(),
    MessageHandlerListener,
  ],
})
export class AppModule {}
