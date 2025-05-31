import { Injectable, NotFoundException } from '@nestjs/common';
import { Person } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { SwapiApiService } from 'src/swapi-api/swapi-api.service';

@Injectable()
export class PersonService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly swapiApiService: SwapiApiService,
  ) {}

  async populate(): Promise<void> {
    const people: Person[] = await this.swapiApiService.fetchAllPeople();

    await Promise.all(
      people.map((person) =>
        this.prismaService.person.upsert({
          where: { uid: person.uid },
          update: { ...person },
          create: { ...person },
        }),
      ),
    );
  }

  async getById(id: string) {
    const people = await this.prismaService.person.findFirst({
      where: {
        id,
      },
    });

    if (!people) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }

    return people;
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
