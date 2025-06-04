import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';

@Injectable()
export class MessageHandlerService {
  public constructor(private readonly sqsService: SqsService) {}

  public async sendMessage() {
    await this.sqsService.send('myProducer1', {
      id: new Date().getTime().toString(),
      body: { command: 'generate-statistics' },
      messageAttributes: {},
      delaySeconds: 0,
    });
  }
}
