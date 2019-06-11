import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { OktaCallbackComponent, OktaAuthGuard, OktaAuthService } from '@okta/okta-angular';

import { AuthComponent } from './auth/auth.component';

import { PeopleComponent } from './people/people.component';

const routes: Routes = [
  { path: 'people', component: PeopleComponent },
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule',
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired }
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired }
  },
  {
    path: 'editor',
    loadChildren: './editor/editor.module#EditorModule',
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired }
  },
  {
    path: 'article',
    loadChildren: './article/article.module#ArticleModule',
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired }
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
