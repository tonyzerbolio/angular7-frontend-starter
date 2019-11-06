import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthGuard } from './core/services/auth-guard.service';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import {
  FooterComponent,
  HeaderComponent,
  SharedModule
} from './shared';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { AppRoutingModule } from './app-routing.module';
import { UserRegistrationModule } from './user-registration/user-registration.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AuthorsModule,
    BooksModule,
    UserRegistrationModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
