/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditSocialNetworksComponent } from './edit-social-networks.component';

describe('EditSocialNetworksComponent', () => {
  let component: EditSocialNetworksComponent;
  let fixture: ComponentFixture<EditSocialNetworksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSocialNetworksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSocialNetworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
