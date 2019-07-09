import { Injectable, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service'
import { Svc1Result } from '../models/service1.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Service1ApiService {

  // MessageService provide messages about API activities

  // service1_url: URL to service - defined in environments/environments.ts;
  // svcstr: passed as arg from component

  constructor(
    public oktaAuth: OAuthService,
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  // HttpClient API get() method => Fetch results
  getService1(svcurl: string, svcstr: string): Observable<Svc1Result> {

    const accessToken = this.oktaAuth.getAccessToken();

    // Display API activity on home page
    // TODO: send the message _after_ fetching the data
    this.messageService.add('Service 1: fetched data');

    // Call Service 1 endpoint - get results
    return this.http.get<Svc1Result>(svcurl + svcstr, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      }
    })
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling
  handleError(error) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }
}
