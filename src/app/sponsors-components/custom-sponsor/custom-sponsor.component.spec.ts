/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CustomSponsorComponent } from './custom-sponsor.component';

describe('CustomSponsorComponent', () => {
  let component: CustomSponsorComponent;
  let fixture: ComponentFixture<CustomSponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
