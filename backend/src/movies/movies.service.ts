import { Injectable } from '@nestjs/common';
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
}
