import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewAptitudesPage } from './new-aptitudes.page';

describe('NewAptitudesPage', () => {
  let component: NewAptitudesPage;
  let fixture: ComponentFixture<NewAptitudesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAptitudesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewAptitudesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
