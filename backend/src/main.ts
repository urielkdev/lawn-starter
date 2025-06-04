import { AppModule } from './app.module';
import { LogsInterceptor } from './log/logs.interceptor';
import { MessageHandlerService } from './message-handler/message-handler.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const GENERATE_STATISTICS_INTERVAL = 1000 * 60 * 5; // 5 minutes

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  const messageHandlerService = app.get(MessageHandlerService);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalInterceptors(app.get(LogsInterceptor));

  setInterval(() => {
    // TODO: improve this to check what was the last time statistics were generated
    // and generate only if it was more than GENERATE_STATISTICS_INTERVAL ago
    messageHandlerService.sendMessage();
  }, GENERATE_STATISTICS_INTERVAL);

  const config = new DocumentBuilder()
    .setTitle('Star Wars Backend')
    .setDescription('The Star Wars Swagger')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
};

bootstrap();
