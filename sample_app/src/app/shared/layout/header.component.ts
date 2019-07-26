/**
 * header.component.ts - This is the global header that is used
 * on the entire site. It contains global site navigation, a
 * (nonfunctional) search input field, general branding and
 * a hidden div that provides information about sites that are
 * using the USWDS Style Guide and other Gov't site info.
 */
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

  /**
   * changeText() {}
   *
   * Switches the MENU button text to CLOSE for when the user is
   * viewing the application in at a mobile breakpoint. It is used
   * to prompt the user to close the navigation menu.
   *
   * @todo Make menu automatically close after user selects a nav
   * item.
   */
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
