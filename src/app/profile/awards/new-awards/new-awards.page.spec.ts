import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewAwardsPage } from './new-awards.page';

describe('NewAwardsPage', () => {
  let component: NewAwardsPage;
  let fixture: ComponentFixture<NewAwardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAwardsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewAwardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
