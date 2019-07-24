import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  // Variable set in environments/environment.prod.ts and environments/environment.js
  prodBuild = `${environment.production}`;

  // Default mobile nav menu text
  public menuText = 'MENU';

  constructor(
    private oauthService: OAuthService
  ) { }

  // Change mobile nav menu button text
  changeText(): void {
    if (this.menuText === 'MENU') {
      this.menuText = 'CLOSE';
    } else {
      this.menuText = 'MENU';
    }
  }

  // Initiates Okta login
  login() {
    this.oauthService.initImplicitFlow();
  }
  // Initiates Okta logout
  logout() {
    this.oauthService.logOut();
  }
  // Gets full name of Okta authenticated user from claims
  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }

  ngOnInit() { }

}
