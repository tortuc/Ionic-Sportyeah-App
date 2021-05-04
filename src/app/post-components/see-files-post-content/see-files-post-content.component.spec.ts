import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeeFilesPostContentComponent } from './see-files-post-content.component';

describe('SeeFilesPostContentComponent', () => {
  let component: SeeFilesPostContentComponent;
  let fixture: ComponentFixture<SeeFilesPostContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeFilesPostContentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeeFilesPostContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
