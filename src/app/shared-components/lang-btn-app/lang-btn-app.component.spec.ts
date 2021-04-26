import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LangBtnAppComponent } from './lang-btn-app.component';

describe('LangBtnAppComponent', () => {
  let component: LangBtnAppComponent;
  let fixture: ComponentFixture<LangBtnAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangBtnAppComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LangBtnAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
