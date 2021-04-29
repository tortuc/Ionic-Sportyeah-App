import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostPreviewImagesSliderComponent } from './post-preview-images-slider.component';

describe('PostPreviewImagesSliderComponent', () => {
  let component: PostPreviewImagesSliderComponent;
  let fixture: ComponentFixture<PostPreviewImagesSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPreviewImagesSliderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostPreviewImagesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
