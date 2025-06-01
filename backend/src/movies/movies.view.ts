import { Movie, Person } from '@prisma/client';

export class MoviesView {
  renderGetById(movie: Movie & { people: Partial<Person>[] }) {
    return {
      id: movie.id,
      title: movie.title,
      openingCrawl: movie.openingCrawl,
      people: movie.people.map((movie) => ({
        id: movie.id,
        name: movie.name,
      })),
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }

  renderGetListBySearchParam(movies: Movie[]) {
    return {
      movies: movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
      })),
      pagination: {
        // TODO: Implement real pagination
        total: movies.length,
        page: 1,
        pageSize: movies.length,
      },
    };
  }
}
