import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { Observable } from 'rxjs';


@Injectable()
export class OktaAuthGuard implements CanActivate {
  isAuthenticated: boolean; // Okta
  constructor(
    private router: Router,
    private oktaAuth: OktaAuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return this.oktaAuth.$authenticationState;

  }
}
