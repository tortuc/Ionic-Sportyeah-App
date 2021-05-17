import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LivescoreComponent } from './livescore.component';

describe('LivescoreComponent', () => {
  let component: LivescoreComponent;
  let fixture: ComponentFixture<LivescoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivescoreComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LivescoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
