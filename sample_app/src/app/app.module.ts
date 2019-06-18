import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { OktaAuthModule, OktaAuthService } from '@okta/okta-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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
import { PeopleModule } from './people/people.module';
import { CustomersComponent } from './customers/customers.component';
import { Service1Component } from './service1/service1.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    CustomersComponent,
    Service1Component],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    SharedModule,
    HomeModule,
    PeopleModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    OktaAuthModule.initAuth({
      issuer: 'https://dev-486305.okta.com/oauth2/default',
      redirectUri: 'http://localhost:4200',
      clientId: '0oakau102ZE29iuuJ356'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
