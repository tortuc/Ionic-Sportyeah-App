import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewpasswordPage } from './newpassword.page';

describe('NewpasswordPage', () => {
  let component: NewpasswordPage;
  let fixture: ComponentFixture<NewpasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
