import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FollowingPage } from './following.page';

describe('FollowingPage', () => {
  let component: FollowingPage;
  let fixture: ComponentFixture<FollowingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FollowingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
