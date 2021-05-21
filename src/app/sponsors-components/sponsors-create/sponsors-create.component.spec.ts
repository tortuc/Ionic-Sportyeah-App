import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SponsorsCreateComponent } from './sponsors-create.component';

describe('SponsorsCreateComponent', () => {
  let component: SponsorsCreateComponent;
  let fixture: ComponentFixture<SponsorsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorsCreateComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SponsorsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
