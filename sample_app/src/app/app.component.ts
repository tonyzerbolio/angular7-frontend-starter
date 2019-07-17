import { Component, OnInit, NgZone } from '@angular/core';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://dev-486305.okta.com/oauth2/default',
  clientId: '0oakau102ZE29iuuJ356',
  redirectUri: window.location.origin + '/',
  responseType: 'token id_token code',
  // silentRefreshRedirectUri: window.location.origin + '/login',
  scope: 'openid profile email offline_access'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private oauthService: OAuthService) {

    this.oauthService.configure(authConfig);

    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    // Load Discovery Document and then try to login the user
    this.oauthService.loadDiscoveryDocument().then((doc) => {
      this.oauthService.tryLogin()
        .catch(err => {
          console.log( 'Authorization error - ', err );
        })
        .then(() => {
          if (!this.oauthService.hasValidAccessToken()) {
            console.log('No token found. You need to log in.', doc);
            // this.oauthService.initImplicitFlow();
          }
        });
    });
  }

  ngOnInit() { }
}
