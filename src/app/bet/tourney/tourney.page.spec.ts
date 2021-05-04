import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TourneyPage } from './tourney.page';

describe('TourneyPage', () => {
  let component: TourneyPage;
  let fixture: ComponentFixture<TourneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourneyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TourneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
