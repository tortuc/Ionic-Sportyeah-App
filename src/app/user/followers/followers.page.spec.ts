import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FollowersPage } from './followers.page';

describe('FollowersPage', () => {
  let component: FollowersPage;
  let fixture: ComponentFixture<FollowersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FollowersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
