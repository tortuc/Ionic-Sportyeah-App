/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { SponsorsSearchComponent } from "./sponsors-search.component";

describe("SponsorsSearchComponent", () => {
  let component: SponsorsSearchComponent;
  let fixture: ComponentFixture<SponsorsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorsSearchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
