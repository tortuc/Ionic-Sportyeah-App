/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SocialNetworksPublicComponent } from './social-networks-public.component';

describe('SocialNetworksPublicComponent', () => {
  let component: SocialNetworksPublicComponent;
  let fixture: ComponentFixture<SocialNetworksPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialNetworksPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialNetworksPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
