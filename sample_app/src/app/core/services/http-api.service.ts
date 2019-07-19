/**
 * HTTP Request Service
 */
import { Injectable, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { filter, retry, catchError } from 'rxjs/operators';

import { MessageService } from './message.service'
import { SvcResult } from '../models/http-api-service.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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

  /**
   * svcurl and svcstr are defined in src/environments/environment.prod.ts
   * and src/environments/environment.ts
   * 
   * @param {string} svcurl Primary URL for service endpoint
   * @param {string} svcstr Service name appended to service endpoint url
   * 
   * @returns JSON Object with data from the service endpoint
   */
  getService1(svcurl: string, svcstr: string): Observable<SvcResult> {

    const accessToken = this.oauthService.getAccessToken(); // Get access token from Okta service

    // If using the message component, this adds a useful message that can be displayed to the user
    this.oauthService.events.subscribe(e => {
      this.messageService.add('http-api.services: oauth/oidc event fired' + ' - type = ' + e.type);
    });

    // Token Expires event
    this.oauthService.events
      .pipe(filter(e => e.type === 'token_expires' ))
      .subscribe(e => {
        this.messageService.add('http-api.services: oauth/oidc event type "token_expires" fired');
        this.oauthService.silentRefresh()
        .then(info => console.log('refresh ok', info))
        .catch(err => console.log('refresh error', err));
    });

    // Add bearer token to service request header
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
