import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChallengePage } from './challenge.page';

describe('ChallengePage', () => {
  let component: ChallengePage;
  let fixture: ComponentFixture<ChallengePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChallengePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
