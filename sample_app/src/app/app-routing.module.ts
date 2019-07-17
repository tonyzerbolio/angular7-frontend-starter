import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';

import { Service1Component } from './service1/service1.component';
import { Service2Component } from './service2/service2.component';
import { AuthGuard } from './core/services/auth-guard.service';

const routes: Routes = [
  { path: 'service1', component: Service1Component, canActivate: [AuthGuard] },
  { path: 'service2', component: Service2Component, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    OAuthModule.forRoot()
  ],
  providers: [
    AuthGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

