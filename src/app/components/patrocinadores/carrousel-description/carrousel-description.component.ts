import { Component, OnInit, Input } from '@angular/core';
import { LandingService } from 'src/app/service/landingService';
import { take } from 'rxjs/operators';
import { ImgVideoUpload } from 'src/app/service/reusable-img-video-logic.service';
@Component({
  selector: 'app-carrousel-description',
  templateUrl: './carrousel-description.component.html',
  styleUrls: ['./carrousel-description.component.scss'],
})
export class CarrouselDescriptionComponent implements OnInit {
  @Input() creator: boolean; 
  @Input() changeText: (name:string) => void; 
  @Input() modalController: any; 
  constructor(
    public landingService: LandingService,
    public ls : LandingService,
    public img: ImgVideoUpload
  ) { }

  ngOnInit() {
  }
  
  change(){
    this.img.takeOnlyPhoto();
    this.img.content.pipe(take(1)).subscribe((img:string)=>{
      this.ls.ls.dividerImg = img;    
      this.ls.edit(this.ls.ls);
    });
  }

}
