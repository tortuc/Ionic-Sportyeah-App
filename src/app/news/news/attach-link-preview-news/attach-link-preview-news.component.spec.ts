import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AttachLinkPreviewNewsComponent } from './attach-link-preview-news.component';

describe('AttachLinkPreviewNewsComponent', () => {
  let component: AttachLinkPreviewNewsComponent;
  let fixture: ComponentFixture<AttachLinkPreviewNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachLinkPreviewNewsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AttachLinkPreviewNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
