import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AuthGuard } from './core/services/auth-guard.service';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import {
  FooterComponent,
  HeaderComponent,
  SharedModule
} from './shared';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { CustomersModule } from './customers/customers.module';
import { AccountsModule } from './accounts/accounts.module';
// import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    // MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    SharedModule,
    HomeModule,
    CustomersModule,
    AccountsModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
