import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { OktaAuthModule } from '@okta/okta-angular';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import {
  FooterComponent,
  HeaderComponent,
  SharedModule
} from './shared';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { PeopleComponent } from './people/people.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent, PeopleComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AuthModule,
    AppRoutingModule,
    OktaAuthModule.initAuth({
      issuer: 'https://dev-167188.okta.com/oauth2/default',
      redirectUri: 'http://localhost:4200/implicit/callback',
      clientId: '0oap9awncShF0sL5R356'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
