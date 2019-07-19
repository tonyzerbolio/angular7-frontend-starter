import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AuthGuard,
  ApiService,
  MessageService
} from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuard,
    ApiService,
    MessageService
  ],
  declarations: []
})
export class CoreModule { }
