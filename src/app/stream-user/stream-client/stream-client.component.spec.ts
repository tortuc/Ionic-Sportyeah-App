import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StreamClientComponent } from './stream-client.component';

describe('StreamClientComponent', () => {
  let component: StreamClientComponent;
  let fixture: ComponentFixture<StreamClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamClientComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StreamClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
