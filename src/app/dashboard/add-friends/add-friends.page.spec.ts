import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddFriendsPage } from './add-friends.page';

describe('AddFriendsPage', () => {
  let component: AddFriendsPage;
  let fixture: ComponentFixture<AddFriendsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFriendsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddFriendsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
