/**
 * App Component
 */
import { Component, OnInit, NgZone } from '@angular/core';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { Router, RouterStateSnapshot } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * Okta Configuration
 * 
 * @param {string} issuer The URL to the Okta service
 * @param {string} clientId The client ID for the Okta service
 * @param {string} redirectUri  Where you are returned after authenticating
 * @param {string} responseType What is returned to the app after authenticating
 * @param {string} silentRefreshRedirectUri URL to silent-refresh.html doc in your project
 * @param {string} scope  Defines what information is returned from the Okta app
 * @param {number} silentRefreshTimeout Amount of time silent refresh will attempt to refresh (in milliseconds)
 * @param {number} timeoutFactor  How much time before the token expires that silent refresh will fire (0-1)
 * @param {boolean} sessionChecksEnabled  Enable/Disable session checks
 * @param {boolean} showDebugInformation  Enable/Disable showing debug info
 * @param {boolean} clearHashAfterLogin Enable/Disable clearing hash post-login
 */
export const authConfig: AuthConfig = {
  issuer: 'https://dev-486305.okta.com/oauth2/default',
  clientId: '0oakau102ZE29iuuJ356',
  redirectUri: window.location.origin + '/',
  responseType: 'token id_token code',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  scope: 'openid profile email',
  silentRefreshTimeout: 20000, // For faster testing
  timeoutFactor: 0.5, // For faster testing
  sessionChecksEnabled: false,
  showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  clearHashAfterLogin: false
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private oauthService: OAuthService, private router: Router) {

    this.oauthService.configure(authConfig);  // Apply Okta configuration (from above)
    this.oauthService.tokenValidationHandler = new JwksValidationHandler(); // Set token validation handler
    this.oauthService.setupAutomaticSilentRefresh();  // Initialize Automatic Silent Refresh

    /**
     * Token Expires Event - Informs about events, like token_received or token_expires. See the string enum EventType for a full list of event types.
     * Fires when token expires
     * Attempts silent refresh
     */
    this.oauthService.events
      .pipe(filter(e => e.type === 'token_expires' ))
      .subscribe(e => {
        // tslint:disable-next-line:no-console
        console.log('In app.component', e);
        this.oauthService.silentRefresh()
        .then(info => console.log('refresh ok', info))
        .catch(err => console.log('refresh error', err));
    });
    /**
     * Loads the discovery document to configure most properties of this service. The url of the discovery document is infered from the issuer's url according to the OpenId Connect spec. To use another url you can pass it to to optional parameter fullUrl.
     * 
     * @param fullUrl
     * 
     * @param onTokenReceived
     * Is called, after a token has been received and successfully validated.
     * Deprecated: Use property events on OAuthService instead.
     * 
     */
    this.oauthService.loadDiscoveryDocument().then(doc => {
      this.oauthService.tryLogin({
        onTokenReceived: context => {
          // tslint:disable-next-line:no-console
          console.log('In app.component tryLogin callback', context);
        }
      });
    });
  }

  ngOnInit() { }
}
