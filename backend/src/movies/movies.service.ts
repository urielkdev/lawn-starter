import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { SwapiApiService } from 'src/swapi-api/swapi-api.service';

@Injectable()
export class MoviesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly swapiApiService: SwapiApiService,
  ) {}

  async populate(): Promise<void> {
    const movies = await this.swapiApiService.fetchAllMovies();

    await Promise.all(
      movies.map(async ({ peopleUids, ...movie }) => {
        return await this.prismaService.movie.upsert({
          where: { uid: movie.uid },
          update: {
            ...movie,
            people: {
              // TODO: fix this when the uid does not exist in the database
              connect: peopleUids.map((uid) => ({ uid })),
            },
          },
          create: {
            ...movie,
            people: {
              connect: peopleUids.map((uid) => ({ uid })),
            },
          },
        });
      }),
    );
  }

  async getById(id: string) {
    const movie = await this.prismaService.movie.findFirst({
      where: {
        id,
      },
      include: {
        people: true,
      },
    });

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    return movie;
  }

  async getListBySearchParam(searchParam: string) {
    return await this.prismaService.movie.findMany({
      where: {
        title: {
          contains: searchParam,
          mode: 'insensitive',
        },
      },
    });
  }
}
