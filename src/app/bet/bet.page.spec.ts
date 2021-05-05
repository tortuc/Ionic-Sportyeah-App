import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BetPage } from './bet.page';

describe('BetPage', () => {
  let component: BetPage;
  let fixture: ComponentFixture<BetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
