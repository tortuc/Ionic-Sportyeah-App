import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParteDerechaWebComponent } from './parte-derecha-web.component';

describe('ParteDerechaWebComponent', () => {
  let component: ParteDerechaWebComponent;
  let fixture: ComponentFixture<ParteDerechaWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParteDerechaWebComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParteDerechaWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
