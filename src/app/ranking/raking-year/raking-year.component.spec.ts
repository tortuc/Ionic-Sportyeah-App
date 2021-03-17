import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RakingYearComponent } from './raking-year.component';

describe('RakingYearComponent', () => {
  let component: RakingYearComponent;
  let fixture: ComponentFixture<RakingYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RakingYearComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RakingYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
