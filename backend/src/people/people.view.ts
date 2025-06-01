import { Movie, Person } from '@prisma/client';

export class PeopleView {
  renderGetById(person: Person & { movies: Movie[] }) {
    return {
      id: person.id,
      name: person.name,
      birthYear: person.birthYear,
      gender: person.gender,
      eyeColor: person.eyeColor,
      hairColor: person.hairColor,
      height: person.height,
      mass: person.mass,
      movies: person.movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
      })),
      createdAt: person.createdAt,
      updatedAt: person.updatedAt,
    };
  }

  renderGetListBySearchParam(people: Person[]) {
    return {
      people: people.map((people) => ({
        id: people.id,
        name: people.name,
      })),
      pagination: {
        // TODO: Implement real pagination
        total: people.length,
        page: 1,
        pageSize: people.length,
      },
    };
  }
}
