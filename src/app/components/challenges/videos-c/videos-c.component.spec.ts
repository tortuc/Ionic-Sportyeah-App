import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideosCComponent } from './videos-c.component';

describe('VideosCComponent', () => {
  let component: VideosCComponent;
  let fixture: ComponentFixture<VideosCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosCComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideosCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
