import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChallengesPage } from './challenges.page';

describe('ChallengesPage', () => {
  let component: ChallengesPage;
  let fixture: ComponentFixture<ChallengesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
