import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubtitleNewsComponent } from './subtitle-news.component';

describe('SubtitleNewsComponent', () => {
  let component: SubtitleNewsComponent;
  let fixture: ComponentFixture<SubtitleNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtitleNewsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubtitleNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
