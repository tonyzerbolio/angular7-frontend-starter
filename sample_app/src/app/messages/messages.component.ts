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
import { Component, OnInit, HostListener } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { MessageService } from '../core/services/message.service';
import { filter } from 'rxjs/operators';
import { timer, Subject } from 'rxjs';

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

  userActivity;
  userInactive: Subject<any> = new Subject();

  // If user's mouse doesn't move for (X msec), prompt "Are you here?"
  // Uses timeLeft value and multiplys by XX,000 to change to msec.
  // If timeLeft value is 60 (1 minute), then activityTimeout * 20000 will be ~ 20min.
  // activityTimeout = (this.timeLeft * 1000) + 1000; // << For faster testing
  activityTimeout = this.timeLeft * 20000;

  constructor(
    private oauthService: OAuthService,
    public messageService: MessageService
  ) {

    // Initialize user timeout value
    this.setTimeout();
    this.userInactive.subscribe(() => {
      if (this.oauthService.hasValidIdToken()) {
        this.messageService.add('Are you still here?');
        this.startTimer();
      }
    });

  }
  
  /**
   * Used to verify that an authenticated user is still using the app
   */
  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(), this.activityTimeout);
  }

  /**
   * If the user's mouse doesn't move for a period of time
   * we want to prompt them to prove they are still here.
   */
  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  // Initiates Okta logout
  logout() {
    this.oauthService.logOut();
  }

  /**
   * Simple countdown timer to give the user an amount of time
   * to prove they are still using the app before they get
   * logged out.
   */
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.messageService.clear();
        this.timeLeft = 60;
        this.logout();
      }
    }, 1000)
  }

  stopAndResetTimer() {
    clearInterval(this.interval);
    this.timeLeft = 60;
  }

  ngOnInit() {}

}
