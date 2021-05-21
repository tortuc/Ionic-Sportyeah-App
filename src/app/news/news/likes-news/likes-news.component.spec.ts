import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LikesNewsComponent } from './likes-news.component';

describe('LikesNewsComponent', () => {
  let component: LikesNewsComponent;
  let fixture: ComponentFixture<LikesNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikesNewsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LikesNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
