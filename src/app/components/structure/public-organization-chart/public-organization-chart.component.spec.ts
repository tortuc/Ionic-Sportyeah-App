/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublicOrganizationChartComponent } from './public-organization-chart.component';

describe('PublicOrganizationChartComponent', () => {
  let component: PublicOrganizationChartComponent;
  let fixture: ComponentFixture<PublicOrganizationChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicOrganizationChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicOrganizationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
