import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/service/user.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { AvatarComponent } from 'src/app/profile/profile-edit/avatar/avatar.component';
import { JdvimageService } from 'src/app/service/jdvimage.service';

const { Camera ,Filesystem} = Plugins;

@Component({
  selector: 'new-profile-photo',
  templateUrl: './new-profile-photo.component.html',
  styleUrls: ['./new-profile-photo.component.scss'],
})
export class NewProfilePhotoComponent implements OnInit {

  constructor(
    public userService:UserService,
    private actionSheetCtrl:ActionSheetController,
    private translate:TranslateService,
    private modalCtrl:ModalController,
    private loading:LoadingController,
    private jdvImage:JdvimageService
  ) { }

  ngOnInit() {}
  
  @Input() take:boolean = true
  async takePhotoFrom(){
    let action = await this.actionSheetCtrl.create({
      header:this.translate.instant("img-options.header"),
      buttons:[
        {
        text:this.translate.instant("img-options.galery"),
        icon:'images',
        handler:()=>{
          this.takePicture(CameraSource.Photos)
        }
      },
      {
        text:this.translate.instant("img-options.camera"),
        icon:'camera',
        handler:()=>{
          this.takePicture(CameraSource.Camera)

        }
      },
      {
        text:this.translate.instant("img-options.avatar"),
        icon:'person',
        handler:()=>{
          this.chooseAvatar()

        }
      },
      {
        text:this.translate.instant("cancel"),
        icon:'close',
        role:'cancel'
      }
    ]
    })
    action.present()
  }

  async chooseAvatar() {
    let modal = await this.modalCtrl.create({
      component:AvatarComponent
    })
    modal.onDidDismiss().then((data)=>{
      this.avatarOptions(data.data)
    })
    return modal.present()
  }
  avatarOptions(data: any) {
    switch (data.action) {
      case 'select':
        this.userService.update({photo:data.url})
          .toPromise()
          .then((resp)=>{
            this.userService.User.photo = data.url
          })
        break;
    
      default:
        break;
    }
  }
 
  async takePicture(source) {
    let formData = new FormData()
   Camera.getPhoto({
      source,
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      
    })
    .then(async (image)=>{
      let loading = await this.loading.create({message:this.translate.instant('loading')})
      loading.present()
      let blob = this.DataURIToBlob(image.dataUrl);

      
      formData.append('image', blob)
 
        this.jdvImage.uploadImage(formData).toPromise()
          .then((url:string)=>{
            loading.dismiss()
            this.userService.update({photo:url})
            .toPromise()
            .then((resp)=>{
              this.userService.User.photo = url
            })
          })
          .catch((err)=>{
            loading.dismiss()
            console.error(err);
            
          })
    })
    .catch((err)=>{
      
    })

  }

  
  DataURIToBlob(dataURI: string) {
    
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }
}
