import { Component, OnInit } from '@angular/core';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { timer } from 'rxjs';

import { MessageService } from './core/services/message.service'

export const authConfig: AuthConfig = {
  issuer: 'https://dev-486305.okta.com/oauth2/default',
  clientId: '0oakau102ZE29iuuJ356',
  redirectUri: window.location.origin + '/',
  responseType: 'token id_token code',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  scope: 'openid profile email',
  silentRefreshTimeout: 20000, // For faster testing decrease this value and/or use timeoutFactor.
  timeoutFactor: 0.5, // For faster testing set this value lower
  sessionChecksEnabled: false,
  showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  clearHashAfterLogin: false
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  // Stop Silent Refresh params
  currentCount = 1; // Initalizes incrementer for limiting silent refreshes
  refreshCount = 2; // Number of times silent refresh can happen before user is prompted or logged out

  // Inactivity timer params. If user does not respond to prompt, they get logged out.
  timeLeft = 60; // User must respond to prompt in this number of seconds
  interval;
  subscribeTimer: any;

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private messageService: MessageService
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

    // After silent refresh, make sure user is sent
    // to the nav route they selected
    this.oauthService.events
      .pipe(filter(e => e.type === 'silently_refreshed' ))
      .subscribe(e => {
        // tslint:disable-next-line:no-console
        console.log('silent refresh event in app.component.ts');

        // Increment and test to see if we need to prompt the user
        this.updateRefreshCount();
      });

    // Load Discovery Document and then try to login the user
    this.oauthService.loadDiscoveryDocument().then(doc => {
      this.oauthService.tryLogin({
        onTokenReceived: context => {
          // tslint:disable-next-line:no-console
          console.log('In app.component tryLogin callback', context);

          // Set silent refresh counter in session storage
          const key = 'refreshCount';
          sessionStorage.setItem(key, this.refreshCount.toString());
        }
      });
    });

  }

  /**
   * Increment counter
   * Get value of refreshCount (limit) from session storage
   * Test if counter is greater than limit
   * If so, prompt user and start the timer
   * If user does not respond before timer expires, they will be logged out
   */
  updateRefreshCount() {
    this.currentCount = this.currentCount + 1;
    this.refreshCount = parseInt(window.sessionStorage.refreshCount, 10);
    if (this.currentCount > this.refreshCount) {
      // Show dialog that warns that the session is about to expire
      this.messageService.add('Your session is about to expire. Would you like to renew it?');

      // Start the inactivity countdown. If it reaches 0, the user gets logged out.
      this.startTimer();
    }
  }

  // Initiates Okta logout
  logout() {
    this.oauthService.logOut();
  }

  // Inactivity timer to see if the user is still there
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.logout();
        this.stopAndResetTimer();
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  stopAndResetTimer() {
    clearInterval(this.interval);
    this.timeLeft = 60;
  }

  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      console.log(val, '-');
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  ngOnInit() { }
}
