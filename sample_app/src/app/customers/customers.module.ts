import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersComponent } from './customers.component';
import { MessagesComponent } from '../messages/messages.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CustomersComponent,
    MessagesComponent
  ],
  exports: [
    CustomersComponent
  ]
})
export class CustomersModule {}
