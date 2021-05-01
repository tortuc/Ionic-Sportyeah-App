import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AttachLinkPreviewPostComponent } from './attach-link-preview-post.component';

describe('AttachLinkPreviewPostComponent', () => {
  let component: AttachLinkPreviewPostComponent;
  let fixture: ComponentFixture<AttachLinkPreviewPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachLinkPreviewPostComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AttachLinkPreviewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
