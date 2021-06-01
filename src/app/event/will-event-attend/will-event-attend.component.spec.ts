import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WillEventAttendComponent } from './will-event-attend.component';

describe('WillEventAttendComponent', () => {
  let component: WillEventAttendComponent;
  let fixture: ComponentFixture<WillEventAttendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WillEventAttendComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WillEventAttendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
