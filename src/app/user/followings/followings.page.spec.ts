import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FollowingsPage } from './followings.page';

describe('FollowingsPage', () => {
  let component: FollowingsPage;
  let fixture: ComponentFixture<FollowingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FollowingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
