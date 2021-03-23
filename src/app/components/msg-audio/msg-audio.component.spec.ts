import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MsgAudioComponent } from './msg-audio.component';

describe('MsgAudioComponent', () => {
  let component: MsgAudioComponent;
  let fixture: ComponentFixture<MsgAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgAudioComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MsgAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
