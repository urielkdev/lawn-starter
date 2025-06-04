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
      // TODO: put in environment variables
      consumers: [
        {
          name: 'myConsumer1',
          queueUrl:
            'http://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/statistics-queue',
          region: 'us-east-1',
          sqs: new SQSClient({
            endpoint: 'http://localhost:4566',
            region: 'us-east-1',
            credentials: {
              accessKeyId: 'test',
              secretAccessKey: 'test',
            },
          }),
        },
      ],
      producers: [
        {
          name: 'myProducer1',
          queueUrl:
            'http://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/statistics-queue',
          region: 'us-east-1',
          sqs: new SQSClient({
            endpoint: 'http://localhost:4566',
            region: 'us-east-1',
            credentials: {
              accessKeyId: 'test',
              secretAccessKey: 'test',
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
