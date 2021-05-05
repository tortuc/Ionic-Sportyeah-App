import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopularGroupsPanelComponent } from './popular-groups-panel.component';

describe('PopularGroupsPanelComponent', () => {
  let component: PopularGroupsPanelComponent;
  let fixture: ComponentFixture<PopularGroupsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularGroupsPanelComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopularGroupsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
