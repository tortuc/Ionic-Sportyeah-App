import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditWishComponent } from './edit-wish.component';

describe('EditWishComponent', () => {
  let component: EditWishComponent;
  let fixture: ComponentFixture<EditWishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWishComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditWishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
