/**
 * auth-guard.service.ts is used to define what routes require
 * the user to be authenticated in order for them to be made
 * available to the application.
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private oauthService: OAuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    /**
     * Checks to see if a valid token is currently in
     * local session storage. If the user was previously
     * logged in but their session expired, this will
     * detect that and implment a silent-refresh when the
     * user attempts to interact with the protected route.
     */
    if (this.oauthService.hasValidIdToken()) {
      return true;
    } else {
      // Token has expired - do silent refresh
      this.oauthService.silentRefresh()
      .then(info => console.log('refresh ok', info))
      .catch(err => console.log('refresh error', err));

      // After silent refresh, make sure user is sent
      // to the nav route they selected
      this.oauthService.events
      .pipe(filter(e => e.type === 'silently_refreshed' ))
      .subscribe(e => {
        // Send user on to selected nav route
        this.router.navigate([state['url']]);
      });
    }
    return false;
  }
}
