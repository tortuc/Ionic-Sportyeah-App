/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExperienceItemPreviewFilesComponent } from './experience-item-preview-files.component';

describe('ExperienceItemPreviewFilesComponent', () => {
  let component: ExperienceItemPreviewFilesComponent;
  let fixture: ComponentFixture<ExperienceItemPreviewFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceItemPreviewFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceItemPreviewFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
