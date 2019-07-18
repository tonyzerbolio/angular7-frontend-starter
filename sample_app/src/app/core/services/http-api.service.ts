import { Injectable, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service'
import { SvcResult } from '../models/service1.model';
import { Observable, throwError } from 'rxjs';
import { filter, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Service1ApiService {

  // MessageService provides messages about API activities

  // service_url: URL to service - defined in environments/environments.ts;
  // svcstr: passed as arg from component
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    public oauthService: OAuthService,
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // HttpClient API get() method => Fetch results
  getService1(svcurl: string, svcstr: string): Observable<SvcResult> {

    const accessToken = this.oauthService.getAccessToken();

    // Handle automatically refreshing auth token
    // this.oauthService.setupAutomaticSilentRefresh();

    this.oauthService.events.subscribe(e => {
      this.messageService.add('http-api.services: oauth/oidc event fired' + ' - type = ' + e.type);
    });

    this.oauthService.events
      .pipe(filter(e => e.type === 'token_expires' ))
      .subscribe(e => {
        this.messageService.add('http-api.services: oauth/oidc event type "token_expires" fired');
        this.oauthService.silentRefresh();
    });

    // Call Service 1 endpoint - get results
    return this.http.get<SvcResult>(svcurl + svcstr, {
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
