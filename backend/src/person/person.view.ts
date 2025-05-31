import { Person } from '@prisma/client';

export class PersonView {
  renderGetById(person: Person) {
    return {
      id: person.id,
    };
  }
}
