import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LangsPage } from './langs.page';

describe('LangsPage', () => {
  let component: LangsPage;
  let fixture: ComponentFixture<LangsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LangsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
