import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';



@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private oauthService: OAuthService) { }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }

  ngOnInit() { }
}
