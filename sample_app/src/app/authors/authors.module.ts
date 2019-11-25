import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AuthorsComponent } from './authors.component';
// import { MessagesComponent } from '../messages/messages.component';
import { AuthGuard } from '../core/services/auth-guard.service';

const routes: Routes = [
  { path: 'authors',
    component: AuthorsComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild(routes)
    ],
    declarations: [
      AuthorsComponent,
        // MessagesComponent
    ],
    exports: [
      AuthorsComponent
  ]
  })
  export class AuthorsModule {}
