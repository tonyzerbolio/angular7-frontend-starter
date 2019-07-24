import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { Service2Component } from './service2.component';
import { AuthGuard } from '../core/services/auth-guard.service';

const routes: Routes = [
  { path: 'service2',
    component: Service2Component,
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
      Service2Component
    ],
    exports: [
      Service2Component
    ]
  })
  export class Service2Module {}
