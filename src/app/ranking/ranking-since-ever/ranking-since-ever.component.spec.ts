import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RankingSinceEverComponent } from './ranking-since-ever.component';

describe('RankingSinceEverComponent', () => {
  let component: RankingSinceEverComponent;
  let fixture: ComponentFixture<RankingSinceEverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingSinceEverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RankingSinceEverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
