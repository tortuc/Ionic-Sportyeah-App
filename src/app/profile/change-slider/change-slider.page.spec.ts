import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeSliderPage } from './change-slider.page';

describe('ChangeSliderPage', () => {
  let component: ChangeSliderPage;
  let fixture: ComponentFixture<ChangeSliderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeSliderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeSliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
