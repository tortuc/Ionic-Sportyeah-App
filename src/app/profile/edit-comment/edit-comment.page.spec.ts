import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditCommentPage } from './edit-comment.page';

describe('EditCommentPage', () => {
  let component: EditCommentPage;
  let fixture: ComponentFixture<EditCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
