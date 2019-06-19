import { Injectable, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Svc1Result } from '../models/service1.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Service1ApiService {

   // service1_url: defined in environments/environments.ts;

   path = 'svc1'; // << Hardcoding for now - should be passed as arg

  constructor(
    public oktaAuth: OktaAuthService,
    private http: HttpClient
    ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  // HttpClient API get() method => Fetch results
  getService1(): Observable<Svc1Result> {

    const accessToken = this.oktaAuth.getAccessToken();
    return this.http.get<Svc1Result>(`${environment.service1_url}/` + this.path + `/world`, {
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
     if(error.error instanceof ErrorEvent) {
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
