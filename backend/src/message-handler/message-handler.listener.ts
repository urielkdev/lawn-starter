import { Message } from '@aws-sdk/client-sqs';
import { Injectable, Logger } from '@nestjs/common';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';
import { StatisticsService } from 'src/statistics/statistics.service';

@Injectable()
export class MessageHandlerListener {
  private readonly logger = new Logger('MessageHandlerListener');

  constructor(private readonly statisticsService: StatisticsService) {}

  @SqsMessageHandler('statistics-queue-consumer', false)
  public async handleMessage(message: Message) {
    const body = message.Body ? JSON.parse(message.Body) : {};

    this.logger.log(`Message body (raw): ${message.Body}`);

    if (body.command === 'generate-statistics') {
      await this.statisticsService.generate();
      this.logger.log('Command "generate-statistics" processed successfully.');
    } else {
      this.logger.warn(`Unknown command: ${body.command}`);
    }
    this.logger.log('Message processing finished.');
  }
  // TODO: create DLQ to handle errors

  @SqsConsumerEventHandler('statistics-queue', 'processing_error')
  public onProcessingError(error: Error, message: Message) {
    this.logger.error('--- SQS PROCESSING ERROR ---');
    this.logger.error(`Error: ${error}`);
    this.logger.error(
      `SQS message that caused the error: ${
        message ? message.Body : 'Message body unavailable'
      }`,
    );
  }
}
