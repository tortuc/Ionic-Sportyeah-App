import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPostPage } from './edit-post.page';

describe('EditPostPage', () => {
  let component: EditPostPage;
  let fixture: ComponentFixture<EditPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
