import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Service1Component } from './service1.component';
import { MessagesComponent } from '../messages/messages.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule
    ],
    declarations: [
        Service1Component,
        MessagesComponent
    ],
    exports: [
        Service1Component
  ]
  })
  export class Service1Module {}
