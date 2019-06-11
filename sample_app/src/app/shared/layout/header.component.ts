import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

import { User, UserService } from '../../core';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  isAuthenticated: boolean; // Okta

  constructor(
    private userService: UserService,
    private oktaAuth: OktaAuthService
    
  ) {
    // Okta
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated
    );
  }

  ngOnInit() {
    // Okta
    this.oktaAuth.isAuthenticated().then((auth) => {
      this.isAuthenticated = auth;
    });
    // Conduit
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    );
  }

  // Okta
  logout() {
    this.oktaAuth.logout('/');
  }
}
