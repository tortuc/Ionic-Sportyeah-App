import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IPostFile } from 'src/app/models/iPost';
import { SeeFilesPostSliderComponent } from '../see-files-post-slider/see-files-post-slider.component';

@Component({
  selector: 'see-files-post-content',
  templateUrl: './see-files-post-content.component.html',
  styleUrls: ['./see-files-post-content.component.scss'],
})
export class SeeFilesPostContentComponent implements OnInit {

  @Input() files:IPostFile[]



  constructor(
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {}

  async seeFiles(){
    let modal = await this.modalCtrl.create({
      component:SeeFilesPostSliderComponent,
      componentProps:{files:this.files}
    })
    modal.present()
  }

}
