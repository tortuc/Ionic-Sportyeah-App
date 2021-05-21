import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoadingInterceptor } from 'src/app/interceptors/loading.interceptor';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-msg-profile-edit',
  templateUrl: './msg-profile-edit.component.html',
  styleUrls: ['./msg-profile-edit.component.scss']
})
export class MsgProfileEditComponent implements OnInit {

  constructor(
    private modalCtrl:ModalController,
    public userService:UserService,
    private loadingCtrl:LoadingController,
    private translate:TranslateService
  ) { }

  ngOnInit() {


  }


  async accept(){
    let loading = await this.loadingCtrl.create({message:this.translate.instant("loading")})
    loading.present()
    this.userService.update({msgProfile:true}).subscribe(()=>{
      this.userService.User.msgProfile = true
      loading.dismiss()
      this.modalCtrl.dismiss()
    },()=>{
      loading.dismiss()
      this.modalCtrl.dismiss()
    })
      
  }
}
