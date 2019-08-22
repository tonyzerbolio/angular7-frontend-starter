import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';

import { Service1Component } from './service1/service1.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { AuthGuard } from './core/services/auth-guard.service';

const routes: Routes = [
  { path: 'customers',
    component: Service1Component,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  { path: 'accounts',
    component: Service1Component,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  { path: 'user-registration',
    component: UserRegistrationComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload'
    }),
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

