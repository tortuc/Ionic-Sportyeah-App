import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { COptionsComponent } from './c-options.component';

describe('COptionsComponent', () => {
  let component: COptionsComponent;
  let fixture: ComponentFixture<COptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ COptionsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(COptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
