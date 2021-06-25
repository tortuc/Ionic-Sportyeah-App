import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabletNewsViewComponent } from './tablet-news-view.component';

describe('TabletNewsViewComponent', () => {
  let component: TabletNewsViewComponent;
  let fixture: ComponentFixture<TabletNewsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabletNewsViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabletNewsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
