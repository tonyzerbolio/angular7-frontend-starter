/**
 * messages.component.ts will output messages to any component
 * that imports this service and has the <app-messages></app-messages>
 * selector in it's HTML template.
 *
 * @example
 * <div class="container">
 *              <p>Here is some static text</p>
 *              <app-messages></app-messages>
 * </div>
 */
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { MessageService } from '../core/services/message.service';
import { filter } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  // Stop Silent Refresh params
  currentCount = 1; // Initalizes incrementer for limiting silent refreshes

  // Inactivity timer params. If user does not respond to prompt, they get logged out.
  timeLeft = 60; // User must respond to prompt in this number of seconds
  interval;
  subscribeTimer: any;

  constructor(
    private oauthService: OAuthService,
    public messageService: MessageService
  ) {
    // After silent refresh, make sure user is sent
    // to the nav route they selected
    this.oauthService.events
    .pipe(filter(e => e.type === 'silently_refreshed' ))
    .subscribe(e => {
      // tslint:disable-next-line:no-console
      console.log('silent refresh event in messages.component.ts');

      // Increment and test to see if we need to prompt the user
      this.updateRefreshCount();
    });
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
        this.timeLeft = 60;
        this.logout();
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
  /**
   * Increment counter
   * Get value of refreshCount (limit) from session storage
   * Test if counter is greater than limit
   * If so, prompt user and start the timer
   * If user does not respond before timer expires, they will be logged out
   */
  updateRefreshCount() {
    this.currentCount = this.currentCount + 1;
    const refreshCount = parseInt(window.sessionStorage.refreshCount, 10);
    if (this.currentCount > refreshCount) {
      // Show dialog that warns that the session is about to expire
      this.messageService.add('Your session is about to expire. Would you like to renew it?');
      this.startTimer();
    }
  }
  ngOnInit() {}

}
