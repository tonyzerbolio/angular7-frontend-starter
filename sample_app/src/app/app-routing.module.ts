/**
 * App Routing Module
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';

import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AuthGuard } from './core/services/auth-guard.service';

/**
 * Routing - Represents a route configuration for the Router service. An array of Route objects, used in Router.config and for nested route configurations in Route.children.
 * 
 * @param {string} path The path to match against, a URL string that uses router matching notation. Can be a wild card (**) that matches any URL (see Usage Notes below). Default is "/" (the root path).
 * @param {class alias} component  The component to instantiate when the path matches. Can be empty if child routes specify components.
 * @param {class alias} canActivate An array of dependency-injection tokens used to look up CanActivate() handlers, in order to determine if the current user is allowed to activate the component. By default, any user can activate.
 * 
 */
const routes: Routes = [
  { path: 'service1', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'service2', component: AccountsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: [window.location.origin, window.location.origin + '/'],
        sendAccessToken: true
      }
    })
  ],
  providers: [
    AuthGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

