import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { Service1Component } from './service1.component';
import { MessagesComponent } from '../messages/messages.component';
import { AuthGuard } from '../core/services/auth-guard.service';

const routes: Routes = [
  { path: 'service1',
    component: Service1Component,
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
        Service1Component,
        MessagesComponent
    ],
    exports: [
        Service1Component
  ]
  })
  export class Service1Module {}
