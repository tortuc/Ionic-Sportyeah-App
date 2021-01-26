import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LikesPostComponent } from './likes-post.component';

describe('LikesPostComponent', () => {
  let component: LikesPostComponent;
  let fixture: ComponentFixture<LikesPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikesPostComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LikesPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
