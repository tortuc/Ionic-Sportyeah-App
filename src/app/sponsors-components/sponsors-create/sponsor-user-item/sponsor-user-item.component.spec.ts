/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { SponsorUserItemComponent } from "./sponsor-user-item.component";

describe("SponsorUserItemComponent", () => {
  let component: SponsorUserItemComponent;
  let fixture: ComponentFixture<SponsorUserItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorUserItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorUserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
