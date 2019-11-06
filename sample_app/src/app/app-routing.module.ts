import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { AuthGuard } from './core/services/auth-guard.service';

const routes: Routes = [
  { path: 'books',
    component: BooksComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  },
  { path: 'authors',
    component: AuthorsComponent,
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

