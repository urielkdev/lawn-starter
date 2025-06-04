import { LogsInterceptor } from './logs.interceptor';
import { LogsService } from './logs.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [LogsInterceptor, LogsService],
  exports: [LogsInterceptor],
})
export class LogsModule {}
