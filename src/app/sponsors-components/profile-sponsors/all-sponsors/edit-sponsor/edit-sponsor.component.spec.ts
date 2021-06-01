/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditSponsorComponent } from './edit-sponsor.component';

describe('EditSponsorComponent', () => {
  let component: EditSponsorComponent;
  let fixture: ComponentFixture<EditSponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 