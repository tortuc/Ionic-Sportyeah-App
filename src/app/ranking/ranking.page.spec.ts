import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RankingPage } from './ranking.page';

describe('RankingPage', () => {
  let component: RankingPage;
  let fixture: ComponentFixture<RankingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RankingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
