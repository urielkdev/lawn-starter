import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLog } from 'src/types';

@Injectable()
export class LogsService {
  private readonly logger = new Logger('LogService');

  constructor(private readonly prismaService: PrismaService) {}

  async log(data: CreateLog) {
    this.logger.log(
      `[${data.method}] ${data.route} (${data.statusCode}) - ${data.durationMs}ms - Query: ${data.queryParams} - Params: ${data.routeParams}`,
    );

    await this.prismaService.log.create({ data });
  }
}
