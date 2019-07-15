import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  AuthGuard,
  Service1ApiService,
  MessageService
} from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AuthGuard,
    Service1ApiService,
    MessageService
  ],
  declarations: []
})
export class CoreModule { }
