import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import {
  AuthGuard,
  // JwtService,
  Service1ApiService,
  MessageService
} from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    AuthGuard,
    // JwtService,
    Service1ApiService,
    MessageService
  ],
  declarations: []
})
export class CoreModule { }
