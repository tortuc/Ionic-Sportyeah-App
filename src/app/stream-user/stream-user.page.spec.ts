import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StreamUserPage } from './stream-user.page';

describe('StreamUserPage', () => {
  let component: StreamUserPage;
  let fixture: ComponentFixture<StreamUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StreamUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
