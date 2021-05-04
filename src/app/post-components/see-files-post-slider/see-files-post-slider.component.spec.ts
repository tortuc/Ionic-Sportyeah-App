import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeeFilesPostSliderComponent } from './see-files-post-slider.component';

describe('SeeFilesPostSliderComponent', () => {
  let component: SeeFilesPostSliderComponent;
  let fixture: ComponentFixture<SeeFilesPostSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeFilesPostSliderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeeFilesPostSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
