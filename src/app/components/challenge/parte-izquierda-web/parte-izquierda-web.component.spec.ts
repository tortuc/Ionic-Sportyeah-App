import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ParteIzquierdaWebComponent } from './parte-izquierda-web.component';

describe('ParteIzquierdaWebComponent', () => {
  let component: ParteIzquierdaWebComponent;
  let fixture: ComponentFixture<ParteIzquierdaWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParteIzquierdaWebComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ParteIzquierdaWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
