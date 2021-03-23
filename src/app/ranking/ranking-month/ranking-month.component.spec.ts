import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RankingMonthComponent } from './ranking-month.component';

describe('RankingMonthComponent', () => {
  let component: RankingMonthComponent;
  let fixture: ComponentFixture<RankingMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingMonthComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RankingMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
