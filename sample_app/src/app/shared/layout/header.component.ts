/**
 * Header Component
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

  changeNavButtonText(): void {
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
  /**
   * get givenName() function
   *
   * Gets claims object from Okta that provides information
   * about the authenticated user that can be used to show/hide
   * elements (see example) or display returned data like user's
   * full name or email address.
   *
   * @example
   *
   * <li *ngIf="!givenName" class="usa-nav__primary-item">
   *              <button class="usa-button" (click)="login()">Login</button>
   * </li>
   * <li *ngIf="givenName" class="usa-nav__primary-item">
   *              <button class="usa-button" (click)="logout()">Logout</button>
   * </li>
   */
  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }

  ngOnInit() { }

}
