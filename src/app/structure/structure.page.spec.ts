import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StructurePage } from './structure.page';

describe('StructurePage', () => {
  let component: StructurePage;
  let fixture: ComponentFixture<StructurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructurePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StructurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
