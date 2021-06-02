import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StreamHostComponent } from './stream-host.component';

describe('StreamHostComponent', () => {
  let component: StreamHostComponent;
  let fixture: ComponentFixture<StreamHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamHostComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StreamHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
