// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import {Component, Directive} from '@angular/core';
import {ArticleListComponent} from './article-list.component';
import {ArticlesService} from '../../core';

@Injectable()
class MockArticlesService { }

describe('ArticleListComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ArticleListComponent
      ],
      providers: [
        {provide: ArticlesService, useClass: MockArticlesService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(ArticleListComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #setPageTo()', async () => {
    // const result = component.setPageTo(pageNumber);
  });

  it('should run #runQuery()', async () => {
    // const result = component.runQuery();
  });

});
