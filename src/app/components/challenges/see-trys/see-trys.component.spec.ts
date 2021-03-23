import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeeTrysComponent } from './see-trys.component';

describe('SeeTrysComponent', () => {
  let component: SeeTrysComponent;
  let fixture: ComponentFixture<SeeTrysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeTrysComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeeTrysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
