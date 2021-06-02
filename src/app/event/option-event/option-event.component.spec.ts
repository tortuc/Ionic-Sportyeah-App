import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OptionEventComponent } from './option-event.component';

describe('OptionEventComponent', () => {
  let component: OptionEventComponent;
  let fixture: ComponentFixture<OptionEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionEventComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OptionEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
