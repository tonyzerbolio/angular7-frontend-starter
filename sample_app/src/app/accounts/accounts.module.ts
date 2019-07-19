import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Service2Component } from './service2.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule
    ],
    declarations: [
      Service2Component
    ],
    exports: [
      Service2Component
    ]
  })
  export class Service2Module {}
