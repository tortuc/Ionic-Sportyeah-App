import { Component, OnInit, Input } from '@angular/core';
import { LandingService } from 'src/app/service/landingService';
import { ImgVideoUpload } from 'src/app/service/reusable-img-video-logic.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-header-landing',
  templateUrl: './header-landing.component.html',
  styleUrls: ['./header-landing.component.scss'],
})
export class HeaderLandingComponent implements OnInit {
  @Input() changeText: (name:string) => void; 
  @Input() creator: boolean; 
  @Input() modalController: any; 
  constructor(
    public landingService: LandingService,
    public ls: LandingService,
    public img: ImgVideoUpload,
  ) {}

  ngOnInit() {}
  change(){
    this.img.takeOnlyPhoto();
    this.img.content.pipe(take(1)).subscribe((img:string)=>{
      this.ls.ls.banner = img;    
      this.ls.edit(this.ls.ls);
    });
  }
}
