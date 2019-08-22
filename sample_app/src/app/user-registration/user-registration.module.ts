import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { UserRegistrationComponent } from './user-registration.component';
// import { MessagesComponent } from '../messages/messages.component';
import { AuthGuard } from '../core/services/auth-guard.service';

const routes: Routes = [
  { path: 'user-registration',
    component: UserRegistrationComponent,
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
      UserRegistrationComponent,
        // MessagesComponent
    ],
    exports: [
        UserRegistrationComponent
  ]
  })
  export class UserRegistrationModule {}
