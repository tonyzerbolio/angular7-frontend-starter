import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-authenticate-page',
  templateUrl: './authenticate.component.html'
})
export class AuthenticateComponent implements OnInit {

  claims = this.oauthService.getIdentityClaims();

  constructor(private oauthService: OAuthService) { };

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get givenName() {
    if (!this.claims) {
      console.log('claims did not return a given name');
      return null;
    }
    return this.claims['name'];
  }

  ngOnInit() { }
}
