import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OptionsPostPage } from './options-post.page';

describe('OptionsPostPage', () => {
  let component: OptionsPostPage;
  let fixture: ComponentFixture<OptionsPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsPostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OptionsPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
