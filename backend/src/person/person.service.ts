import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PersonService {
  constructor(private readonly prismaService: PrismaService) {}

  async getById(id: string) {
    return await this.prismaService.person.findFirst({
      where: {
        id,
      },
    });
  }
}
