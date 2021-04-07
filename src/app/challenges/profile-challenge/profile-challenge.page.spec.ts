import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfileChallengePage } from './profile-challenge.page';

describe('ProfileChallengePage', () => {
  let component: ProfileChallengePage;
  let fixture: ComponentFixture<ProfileChallengePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileChallengePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileChallengePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
