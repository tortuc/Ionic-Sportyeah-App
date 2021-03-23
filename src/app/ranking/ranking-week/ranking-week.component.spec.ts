import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RankingWeekComponent } from './ranking-week.component';

describe('RankingWeekComponent', () => {
  let component: RankingWeekComponent;
  let fixture: ComponentFixture<RankingWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingWeekComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RankingWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
