// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {FooterComponent} from './footer.component';
import { OAuthService, UrlHelperService, OAuthLogger } from 'angular-oauth2-oidc';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FooterComponent
      ],
      providers: [ OAuthService, HttpClient, HttpHandler, UrlHelperService, OAuthLogger ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  });

  it(`The application should create a Footer Component`, async () => {
    fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`The Footer Component should contain phone number`, async () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.contact-phone-number a').textContent).toContain('(800) CALL-GOVT');
  });

  it(`The Footer Component should contain an email address`, async () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.contact-email-address a').textContent).toContain('info@agency.gov');
  });

});
