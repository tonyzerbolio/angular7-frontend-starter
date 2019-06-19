import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-service1',
  templateUrl: './service1.component.html',
  styleUrls: ['./service1.component.css']
})
export class Service1Component implements OnInit {

  Results: any = [];
  path = 'svc1'; // << Hardcoding for now - should be passed as arg

  constructor(
    public oktaAuth: OAuthService,
    private http: HttpClient
  ) { }

  async ngOnInit() {
    const accessToken = await this.oktaAuth.getAccessToken();
    return this.http.get(`${environment.service1_url}/` + this.path + `/world`, {
      headers: {
        ResponseType: 'text/plain',
        Authorization: 'Bearer ' + accessToken,
      }
    }).subscribe((data: any) => {
      // Use the data returned by the API
      data => data.text();
      console.log(data);
    }, (error) => {
      console.error(error);
    });
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

  // Get Service1 (results)
  // loadService1() {
  //   return this.service1Api.getService1().subscribe((data: {}) => {
  //     this.Results = data;
  //   })
  // }

}
