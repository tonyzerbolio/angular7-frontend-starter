import { Person } from './person.model';

export const PEOPLE: Person[] = [
  {
    type: 'Individual',
    id: 1,
    firstName: 'Adam',
    lastName: 'Kowalski',
    fullName: 'Adam Kowalski',
    account: '12345',
    phoneNumber: '123-555-1234'
  },
  {
    type: 'Individual',
    id: 2,
    firstName: 'Anna',
    lastName: 'Malinowska',
    fullName: 'Anna Malinowska',
    account: '12346',
    phoneNumber: '123-555-2345'
  },
  {
    type: 'Individual',
    id: 3,
    firstName: 'Pawel',
    lastName: 'Michalski',
    fullName: 'Pawel Michalski',
    account: '12347',
    phoneNumber: '123-555-3456'
  },
  {
    type: 'Individual',
    id: 4,
    firstName: 'Karolina',
    lastName: 'Lewandowska',
    fullName: 'Karolina Lewandowska',
    account: '12348',
    phoneNumber: '123-555-4567'
  }
];
