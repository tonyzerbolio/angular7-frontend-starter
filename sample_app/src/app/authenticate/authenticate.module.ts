import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthenticateComponent } from './authenticate.component';
import { SharedModule } from '../shared';
import { AuthenticateRoutingModule } from './authenticate-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AuthenticateRoutingModule
  ],
  declarations: [
    AuthenticateComponent
  ],
  providers: [ ]
})
export class AuthenticateModule {}
