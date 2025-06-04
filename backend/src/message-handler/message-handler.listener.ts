import { Message } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';
import { StatisticsService } from 'src/statistics/statistics.service';

@Injectable()
export class MessageHandlerListener {
  constructor(private readonly statisticsService: StatisticsService) {}

  @SqsMessageHandler('myConsumer1', false)
  public async handleMessage(message: Message) {
    console.log(1);
    const body = message.Body ? JSON.parse(message.Body) : {};

    console.log(message.Body);

    if (body.command === 'generate-statistics') {
      // TODO: change console.logs with nest logger
      console.log('Handling generate-statistics command');
      await this.statisticsService.generate();
    } else {
      console.log('Unknown command:', body.command);
    }
    console.log(2);
  }

  @SqsConsumerEventHandler('myConsumer1', 'processing_error')
  public onProcessingError(error: Error, message: Message) {
    // report errors here
    console.log('error');
    console.error(error);
    console.error(message);
    console.log('error222');
  }
}
