import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenImgComponent } from './open-img.component';

describe('OpenImgComponent', () => {
  let component: OpenImgComponent;
  let fixture: ComponentFixture<OpenImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenImgComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
