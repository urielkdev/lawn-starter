import { Movie } from '@prisma/client';

export class MoviesView {
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
