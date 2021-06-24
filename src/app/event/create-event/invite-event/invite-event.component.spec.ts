import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InviteEventComponent } from './invite-event.component';

describe('InviteEventComponent', () => {
  let component: InviteEventComponent;
  let fixture: ComponentFixture<InviteEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteEventComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InviteEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
