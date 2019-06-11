import { Component, OnInit } from '@angular/core';
import { PEOPLE } from '../core/models/mock-people';
import { Person } from 'app/core/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  people = PEOPLE;
  selectedPerson: Person;

  constructor() { }

  onSelect(person: Person): void {
    this.selectedPerson = person;
  }

  ngOnInit() {
  }

}
