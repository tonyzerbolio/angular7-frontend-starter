/**
 * http-api.service.ts is used to consume RESTful services
 * 
 * It passes a bearer token to the back end so that protected
 * back end services can be authorized to allow the front end
 * to use them.
 */
import { Injectable, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service'
import { SvcResult } from '../models/serviceData.model';
import { Observable, throwError } from 'rxjs';
import { filter, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * Initial httpOptions configuration
   */
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
   * These parameters are initially defined in src/environments/environment(.prod).ts
   * They are the constants used to build the endpoint urls used by components.
   * The components themselves will append the final parameters to claify the
   * specific service being used.
   * 
   * @param {string} svcurl defines the http protocol and initial service URL
   * @param {string} svcstr completes the service url
   * 
   * @returns {JSON} results from RESTful endpoint
   *
   * The parameters in this example will retrieve a JSON object with customer
   * information.
   * @example
   * svcurl = 'http://zuul.comet:8081'
   * svcstr = '/service1/customers'
   * 
   */
  getService(svcurl: string, svcstr: string): Observable<SvcResult> {

    const accessToken = this.oauthService.getAccessToken();

    /**
     * We subscribe to oauthService events and generate messages
     * that can be displayed in other components using the
     * messages component. This can be useful for debugging Okta
     * and OAuth issues.
     */
    this.oauthService.events.subscribe(e => {
      this.messageService.add('http-api.services: oauth/oidc event fired' + ' - type = ' + e.type);
    });

    /**
     * This event generates a message when OAuth emits the `token_expires` event
     * and infomation about the status of the silent-refresh
     */
    this.oauthService.events
      .pipe(filter(e => e.type === 'token_expires' ))
      .subscribe(e => {
        this.messageService.add('http-api.services: oauth/oidc event type "token_expires" fired');
        this.oauthService.silentRefresh()
        .then(info => console.log('refresh ok', info))
        .catch(err => console.log('refresh error', err));
    });

    /**
     * Returned results from the RESTful service endpoint
     */
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
