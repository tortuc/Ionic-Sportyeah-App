import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RankingTodayComponent } from './ranking-today.component';

describe('RankingTodayComponent', () => {
  let component: RankingTodayComponent;
  let fixture: ComponentFixture<RankingTodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingTodayComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RankingTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
