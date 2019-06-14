import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeopleComponent } from './people.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    PeopleComponent
  ],
  exports: [
    PeopleComponent
]
})
export class PeopleModule {}
