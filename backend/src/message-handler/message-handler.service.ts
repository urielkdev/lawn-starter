import { Injectable, Logger } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';

@Injectable()
export class MessageHandlerService {
  private readonly logger = new Logger('MessageHandlerService');

  public constructor(private readonly sqsService: SqsService) {}

  public async sendMessage() {
    try {
      await this.sqsService.send('statistics-queue-producer', {
        id: new Date().getTime().toString(),
        body: { command: 'generate-statistics' },
        messageAttributes: {},
        delaySeconds: 0,
      });
    } catch (error) {
      this.logger.error('Error sending message:', error);
    }
  }
}
