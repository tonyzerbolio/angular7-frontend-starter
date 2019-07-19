/**
 * App Routing Module
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';

import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AuthGuard } from './core/services/auth-guard.service';

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

