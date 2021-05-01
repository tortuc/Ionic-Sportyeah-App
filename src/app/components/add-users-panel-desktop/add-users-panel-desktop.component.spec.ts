import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUsersPanelDesktopComponent } from './add-users-panel-desktop.component';

describe('AddUsersPanelDesktopComponent', () => {
  let component: AddUsersPanelDesktopComponent;
  let fixture: ComponentFixture<AddUsersPanelDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUsersPanelDesktopComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUsersPanelDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
