import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillyPage } from './billy.page';

describe('BillyPage', () => {
  let component: BillyPage;
  let fixture: ComponentFixture<BillyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
