import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { SwapiApiService } from 'src/swapi-api/swapi-api.service';

@Injectable()
export class PeopleService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly swapiApiService: SwapiApiService,
  ) {}

  async populate(): Promise<void> {
    const people = await this.swapiApiService.fetchAllPeople();

    await Promise.all(
      people.map((people) =>
        this.prismaService.person.upsert({
          where: { uid: people.uid },
          update: { ...people },
          create: { ...people },
        }),
      ),
    );
  }

  async getById(id: string) {
    const person = await this.prismaService.person.findFirst({
      where: {
        id,
      },
    });

    if (!person) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }

    return person;
  }

  async getListBySearchParam(searchParam: string) {
    // TODO: paginate this
    return await this.prismaService.person.findMany({
      where: {
        name: {
          contains: searchParam,
          mode: 'insensitive',
        },
      },
    });
  }
}
