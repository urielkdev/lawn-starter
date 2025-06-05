import { MessageHandlerListener } from './message-handler.listener';
import { MessageHandlerService } from './message-handler.service';
import { SQSClient } from '@aws-sdk/client-sqs';
import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { StatisticsModule } from 'src/statistics/statistics.module';

@Module({
  imports: [
    StatisticsModule,
    SqsModule.register({
      consumers: [
        {
          name: 'statistics-queue-consumer',
          queueUrl:
            process.env.STATISTICS_QUEUE_URL ||
            'http://localhost:9324/queue/statistics-queue',
          region: process.env.AWS_REGION || 'elasticmq',
          sqs: new SQSClient({
            endpoint: process.env.SQS_ENDPOINT || 'http://localhost:9324',
            region: process.env.AWS_REGION || 'elasticmq',
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'x',
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'x',
            },
          }),
        },
      ],
      producers: [
        {
          name: 'statistics-queue-producer',
          queueUrl:
            process.env.STATISTICS_QUEUE_URL ||
            'http://localhost:9324/queue/statistics-queue',
          region: process.env.AWS_REGION || 'elasticmq',
          sqs: new SQSClient({
            endpoint: process.env.SQS_ENDPOINT || 'http://localhost:9324',
            region: process.env.AWS_REGION || 'elasticmq',
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'x',
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'x',
            },
          }),
        },
      ],
    }),
  ],
  providers: [MessageHandlerListener, MessageHandlerService],
  exports: [MessageHandlerService],
})
export class MessageHandlerModule {}
