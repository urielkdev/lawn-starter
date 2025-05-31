import { Person } from '@prisma/client';

export class PeopleView {
  renderGetById(person: Person) {
    return {
      id: person.id,
      name: person.name,
      birthYear: person.birthYear,
      gender: person.gender,
      eyeColor: person.eyeColor,
      hairColor: person.hairColor,
      height: person.height,
      mass: person.mass,
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
