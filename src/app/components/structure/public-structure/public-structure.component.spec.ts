/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublicStructureComponent } from './public-structure.component';

describe('PublicStructureComponent', () => {
  let component: PublicStructureComponent;
  let fixture: ComponentFixture<PublicStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
