/**
 * Footer Component
 */
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-layout-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  today: number = Date.now();

  constructor(private oauthService: OAuthService) { }
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
   * <li *ngIf="!givenName" class="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
   *              <a class="usa-footer__primary-link" href="javascript:void(0);" (click)="login()">Login</a>
   * </li>
   * <li *ngIf="givenName" class="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
   *              <a class="usa-footer__primary-link" href="javascript:void(0);" (click)="logout()">Logout</a>
   * </li>
   */
  get givenName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }

}
