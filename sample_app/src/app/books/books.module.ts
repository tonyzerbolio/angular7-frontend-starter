import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { BooksComponent } from './books.component';
// import { MessagesComponent } from '../messages/messages.component';
import { AuthGuard } from '../core/services/auth-guard.service';

const routes: Routes = [
  { path: 'books',
    component: BooksComponent,
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
      BooksComponent,
      // MessagesComponent
    ],
    exports: [
      BooksComponent
  ]
  })
  export class BooksModule {}
