import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { JdvimageService } from 'src/app/service/jdvimage.service';
import { UserService } from 'src/app/service/user.service';

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
    public translate:TranslateService,
    public userService:UserService,
    private loading:LoadingController
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
            handler:async ()=>{
              let loading = await this.loading.create({
                message:this.translate.instant("loading")
              })
              loading.present()
              this.userService.update({photo:url}).subscribe(()=>{
                this.userService.User.photo = url
                loading.dismiss()
                this.modalCtrl.dismiss()
              },()=>{
                loading.dismiss()
                this.modalCtrl.dismiss()
              })
             
            }
          }
        ]
    })
    alert.present()
  }
}
