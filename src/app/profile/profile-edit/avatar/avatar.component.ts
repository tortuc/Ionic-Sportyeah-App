import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { JdvimageService } from 'src/app/service/jdvimage.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {

  constructor(
    private modalCtrl:ModalController,
    private imageService:JdvimageService,
    private alertCtrl:AlertController,
    public translate:TranslateService
  ) { }

  avatars = []

  ngOnInit() {
    this.imageService.getAvatars().toPromise()
      .then((avatars:any[])=>{
        this.avatars = avatars
      })
      .catch((err)=>{
        
        // handle err
      })
  }

  dismiss(){
    this.modalCtrl.dismiss({
      action:"closed"
    })
  }

  async selectAvatar(url){
    let alert = await this.alertCtrl.create({
        header:this.translate.instant('avatar.select_header'),
        message:this.translate.instant('avatar.select_message'),
        buttons:[
          {
            text:this.translate.instant('cancel'),
            role:'cancel'
          },
          {
            text:this.translate.instant('agree'),
            handler:()=>{
              this.modalCtrl.dismiss({
                action:"select",
                url
              })
            }
          }
        ]
    })
    alert.present()
  }
}
