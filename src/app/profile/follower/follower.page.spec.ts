import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FollowerPage } from './follower.page';

describe('FollowerPage', () => {
  let component: FollowerPage;
  let fixture: ComponentFixture<FollowerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FollowerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
