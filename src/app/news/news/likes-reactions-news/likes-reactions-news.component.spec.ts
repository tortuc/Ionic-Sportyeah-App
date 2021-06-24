import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LikesReactionsNewsComponent } from './likes-reactions-news.component';

describe('LikesReactionsNewsComponent', () => {
  let component: LikesReactionsNewsComponent;
  let fixture: ComponentFixture<LikesReactionsNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikesReactionsNewsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LikesReactionsNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
