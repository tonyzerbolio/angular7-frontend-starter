// tslint:disable
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import { HeaderComponent } from './header.component';
import { OAuthService, UrlHelperService, OAuthLogger } from 'angular-oauth2-oidc';
import { HttpClient, HttpHandler } from '@angular/common/http';

@Injectable()
class MockUserService { }

describe('HeaderComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        HeaderComponent
      ],
      providers: [ OAuthService, HttpClient, HttpHandler, UrlHelperService, OAuthLogger ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.debugElement.componentInstance;
  });

  it(
    'should be initialized',
    inject([OAuthService], (oauthService: OAuthService) => {
      expect(oauthService).toBeTruthy();
    })
  );


  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
  });

});
