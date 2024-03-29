import { Component, OnInit } from '@angular/core';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { MessageService } from './core/services/message.service'

export const authConfig: AuthConfig = {
  issuer: 'https://dev-486305.okta.com/oauth2/default',
  clientId: '0oakau102ZE29iuuJ356',
  redirectUri: window.location.origin + '/',
  responseType: 'token id_token code',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  scope: 'openid profile email',
  silentRefreshTimeout: 20000, // Timeout set when there is an error in the silentRefresh iframe.
  timeoutFactor: 1, // Set to to a value between 0 and 1. For faster testing set this value lower. 
  sessionChecksEnabled: false,
  showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  clearHashAfterLogin: false
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    public messageService: MessageService
  ) {

    // Configure authorization and silent refresh
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();

    // Token Expires event
    this.oauthService.events
      .pipe(filter(e => e.type === 'token_expires' ))
      .subscribe(e => {
        // tslint:disable-next-line:no-console
        console.log('In app.component', e);
        this.oauthService.silentRefresh()
        .then(info => console.log('refresh ok', info))
        .catch(err => console.log('refresh error', err));
      });

    // Load Discovery Document and then try to login the user
    this.oauthService.loadDiscoveryDocument().then(doc => {
      this.oauthService.tryLogin({
        onTokenReceived: context => {
          // tslint:disable-next-line:no-console
          console.log('In app.component tryLogin callback', context);

          // Do stuff here when token is received

        }
      });
    });

  }

  ngOnInit() { }
}
