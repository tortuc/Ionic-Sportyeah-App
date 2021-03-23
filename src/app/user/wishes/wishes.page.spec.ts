import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WishesPage } from './wishes.page';

describe('WishesPage', () => {
  let component: WishesPage;
  let fixture: ComponentFixture<WishesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WishesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
