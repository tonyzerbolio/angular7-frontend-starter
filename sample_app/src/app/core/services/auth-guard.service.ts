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

    if (this.oauthService.hasValidIdToken()) {
      return true;
    } else {
      // Token has expired - do silent refresh
      this.oauthService.silentRefresh();

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
