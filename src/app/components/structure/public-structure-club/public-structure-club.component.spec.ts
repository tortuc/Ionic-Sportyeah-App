/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublicStructureClubComponent } from './public-structure-club.component';

describe('PublicStructureClubComponent', () => {
  let component: PublicStructureClubComponent;
  let fixture: ComponentFixture<PublicStructureClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicStructureClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicStructureClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
