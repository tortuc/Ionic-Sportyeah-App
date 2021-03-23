import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChallengesPotsOptionsIndivComponent } from './challenges-pots-options-indiv.component';

describe('ChallengesPotsOptionsIndivComponent', () => {
  let component: ChallengesPotsOptionsIndivComponent;
  let fixture: ComponentFixture<ChallengesPotsOptionsIndivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengesPotsOptionsIndivComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengesPotsOptionsIndivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
