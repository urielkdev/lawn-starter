import { Person } from '@prisma/client';

export class PersonView {
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
      people: people.map((person) => ({
        id: person.id,
        name: person.name,
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
