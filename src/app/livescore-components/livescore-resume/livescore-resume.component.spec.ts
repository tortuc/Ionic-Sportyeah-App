import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LivescoreResumeComponent } from './livescore-resume.component';

describe('LivescoreResumeComponent', () => {
  let component: LivescoreResumeComponent;
  let fixture: ComponentFixture<LivescoreResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivescoreResumeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LivescoreResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
