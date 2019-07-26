/**
 * home.component.ts provides initial user interface
 * and login/logout capabilites as well as default
 * content for anonymous users and specific content
 * for authenticated users.
 */
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private oauthService: OAuthService) { }

  /**
   * login funtion for authenticating with Okta
   * Successful authentication provides the applications
   * with an access_token that is used to expose protected
   * routes and to communicate with protected backing
   * services.
   */
  login() {
    this.oauthService.initImplicitFlow();
  }

  /**
   * Logs the user out and destroys the access_token returning
   * the application to it's original, unauthenticated state.
   * Protected routes are no longer available to the user and
   * therefore, protected backing services are also rendered
   * unavailable.
   */
  logout() {
    this.oauthService.logOut();
  }

  /**
   * giveName() retrieves the full name of an authenticated user.
   * It is provided in a 'claims' object that contains user info
   * as it exists in the Okta service configuration.
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
