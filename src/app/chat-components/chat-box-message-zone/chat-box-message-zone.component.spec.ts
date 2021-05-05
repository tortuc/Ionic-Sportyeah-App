import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChatBoxMessageZoneComponent } from './chat-box-message-zone.component';

describe('ChatBoxMessageZoneComponent', () => {
  let component: ChatBoxMessageZoneComponent;
  let fixture: ComponentFixture<ChatBoxMessageZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatBoxMessageZoneComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatBoxMessageZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
