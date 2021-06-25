import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileNewsViewComponent } from './mobile-news-view.component';

describe('MobileNewsViewComponent', () => {
  let component: MobileNewsViewComponent;
  let fixture: ComponentFixture<MobileNewsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileNewsViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileNewsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
