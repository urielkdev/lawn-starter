import { AppService } from './app.service';
import { Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @ApiTags('Health')
  health() {
    return this.appService.health();
  }

  @Put('populate')
  async populate() {
    await this.appService.populate();
    return { message: 'People populated successfully' };
  }
}
