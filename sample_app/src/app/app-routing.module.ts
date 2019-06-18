import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';

import { AuthComponent } from './auth/auth.component';

import { Service1Component } from './service1/service1.component';
import { PeopleComponent } from './people/people.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  { path: 'service1', component: Service1Component },
  { path: 'people', component: PeopleComponent },
  { path: 'customers', component: CustomersComponent },
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule'
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path: 'editor',
    loadChildren: './editor/editor.module#EditorModule'
  },
  {
    path: 'article',
    loadChildren: './article/article.module#ArticleModule'
  },
  {
    path: 'login', component: AuthComponent
  },
  {
    path: 'implicit/callback', component: OktaCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export function onAuthRequired({ oktaAuth, router }) {
  router.navigate(['/login']);
}
