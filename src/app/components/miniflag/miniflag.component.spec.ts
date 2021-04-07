import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MiniflagComponent } from './miniflag.component';

describe('MiniflagComponent', () => {
  let component: MiniflagComponent;
  let fixture: ComponentFixture<MiniflagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniflagComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MiniflagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
