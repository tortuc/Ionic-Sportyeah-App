import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { IPostFile } from 'src/app/models/iPost';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-preview-images-slider',
  templateUrl: './post-preview-images-slider.component.html',
  styleUrls: ['./post-preview-images-slider.component.scss'],
})
export class PostPreviewImagesSliderComponent implements OnInit {

  @Input() files:IPostFile[] = [];

  constructor(
    public modalCtrl:ModalController,
    public postService:PostService,
    public platform:Platform,
    private translate:TranslateService,
    private alertCtrl:AlertController
  ) { 
    this.platform.backButton.subscribeWithPriority(10,()=>{
      this.modalCtrl.dismiss()
    })
  }

  ngOnInit() {}

  async remove(url){
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("remove_file.header"),
      message: this.translate.instant("remove_file.message"),
      buttons: [
        {
          text: this.translate.instant("cancel"),
        },
        {
          text: this.translate.instant("accept"),
          handler: () => {
            this.files = this.files.filter((file)=>{
              return file.url != url
            })
           this.postService.fileRemoved(url)
          },
        },
      ],
    });
    alert.present()
  
  }
 
  viewEntered: boolean = false;

  ionViewDidEnter() {
    this.viewEntered = true;
}

}
