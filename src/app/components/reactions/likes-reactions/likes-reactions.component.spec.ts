import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LikesReactionsComponent } from './likes-reactions.component';

describe('LikesReactionsComponent', () => {
  let component: LikesReactionsComponent;
  let fixture: ComponentFixture<LikesReactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikesReactionsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LikesReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
