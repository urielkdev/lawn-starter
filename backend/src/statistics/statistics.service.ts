import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStatistic, StatisticsTypesEnum } from 'src/types';

const LAST_X_MINUTES = 135;

@Injectable()
export class StatisticsService {
  private readonly logger = new Logger('StatisticsService');

  constructor(private readonly prismaService: PrismaService) {}

  async generate() {
    const statisticsToRun = [
      {
        name: StatisticsTypesEnum.GET_AVERAGE_DURATION_PER_ROUTE,
        functionToRun: () => this.getAverageDurationPerRoute(),
      },
      {
        name: StatisticsTypesEnum.GET_ACCESSED_ROUTES_RANK,
        functionToRun: () => this.getAccessedRoutesRank(),
      },
      {
        name: StatisticsTypesEnum.GET_MOVIES_SEARCHES_RANK,
        functionToRun: () => this.getMoviesSearchesRank(),
      },
      {
        name: StatisticsTypesEnum.GET_PEOPLE_SEARCHES_RANK,
        functionToRun: () => this.getPeopleSearchesRank(),
      },
    ];

    Promise.all(
      statisticsToRun.map(async ({ name, functionToRun }) => {
        this.logger.log(`Running statistic: ${name}`);

        const statisticResult = await functionToRun();

        const createData = {
          type: name,
          data: statisticResult,
        };

        await this.create(createData);
      }),
    );
  }

  async create(data: CreateStatistic) {
    await this.prismaService.statistic.create({ data });
  }

  async getList() {
    return await this.prismaService.statistic.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      distinct: ['type'],
    });
  }

  async getAverageDurationPerRoute() {
    const xMinutesInPastDate = this.getLastXMinutesDate(LAST_X_MINUTES);

    const stats = await this.prismaService.log.groupBy({
      by: ['route', 'method'],
      where: {
        createdAt: {
          gte: xMinutesInPastDate,
        },
      },
      _avg: {
        durationMs: true,
      },
    });

    return stats.map((stat) => ({
      method: stat.method,
      route: stat.route,
      average: stat._avg.durationMs,
    }));
  }

  async getAccessedRoutesRank() {
    const xMinutesInPastDate = this.getLastXMinutesDate(LAST_X_MINUTES);

    const stats = await this.prismaService.log.groupBy({
      by: ['route', 'method'],
      where: {
        createdAt: {
          gte: xMinutesInPastDate,
        },
      },
      _count: {
        route: true,
      },
      orderBy: {
        _count: {
          route: 'desc',
        },
      },
    });

    return stats.map((stat) => ({
      method: stat.method,
      route: stat.route,
      count: stat._count.route,
    }));
  }

  async getMoviesSearchesRank() {
    const xMinutesInPastDate = this.getLastXMinutesDate(LAST_X_MINUTES);

    const stats = await this.prismaService.log.groupBy({
      by: ['routeParams'],
      where: {
        createdAt: {
          gte: xMinutesInPastDate,
        },
        method: 'GET',
        route: {
          contains: '/movies/:id',
        },
      },
      _count: {
        route: true,
      },
      orderBy: {
        _count: {
          routeParams: 'desc',
        },
      },
    });

    return stats.map((stat) => ({
      movieId: JSON.parse(stat.routeParams).id,
      count: stat._count.route,
    }));
  }

  async getPeopleSearchesRank() {
    const xMinutesInPastDate = this.getLastXMinutesDate(LAST_X_MINUTES);

    const stats = await this.prismaService.log.groupBy({
      by: ['routeParams'],
      where: {
        createdAt: {
          gte: xMinutesInPastDate,
        },
        method: 'GET',
        route: {
          contains: '/people/:id',
        },
      },
      _count: {
        route: true,
      },
      orderBy: {
        _count: {
          routeParams: 'desc',
        },
      },
    });

    return stats.map((stat) => ({
      personId: JSON.parse(stat.routeParams).id,
      count: stat._count.route,
    }));
  }

  private getLastXMinutesDate(minutes: number): Date {
    return new Date(Date.now() - minutes * 60 * 1000);
  }
}
