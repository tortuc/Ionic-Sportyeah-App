import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { IPostFile } from 'src/app/models/iPost';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-see-files-post-slider',
  templateUrl: './see-files-post-slider.component.html',
  styleUrls: ['./see-files-post-slider.component.scss'],
})
export class SeeFilesPostSliderComponent implements OnInit {

  
  @Input() files:IPostFile[] = [];
  viewEntered: boolean = false;

  constructor(
    public modalCtrl:ModalController,
    public postService:PostService,
    public platform:Platform
  ) { 
    this.platform.backButton.subscribeWithPriority(10,()=>{
      this.modalCtrl.dismiss()
    })
  }

  ngOnInit() {}


  ionViewDidEnter() {
    this.viewEntered = true;
}


}
