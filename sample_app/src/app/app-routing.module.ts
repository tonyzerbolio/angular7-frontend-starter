import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';

import { Service1Component } from './service1/service1.component';
import { PeopleComponent } from './people/people.component';
import { CustomersComponent } from './customers/customers.component';
import { AuthGuard } from './core/services/auth-guard.service';

const routes: Routes = [
  { path: 'service1', component: Service1Component, canActivate: [AuthGuard] },
  { path: 'people', component: PeopleComponent },
  { path: 'customers', component: CustomersComponent },
  {
    path: '**',
    redirectTo: ''
  }
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

