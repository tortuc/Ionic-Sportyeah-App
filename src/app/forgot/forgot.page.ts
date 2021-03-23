import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../service/login.service';
import { UserService } from '../service/user.service';
import { AlertController, LoadingController, PopoverController } from '@ionic/angular';

interface resp {
  code:Number
  user:Object
  err:Object
}
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  constructor(
    private fb:FormBuilder,
    private loginService:LoginService,
    private alertController:AlertController,
    private translate:TranslateService,
    private router:Router,
    public userService:UserService,
    private loadingCtrl:LoadingController,
  ) { }

  ngOnInit() {
  }

  forgotForm = this.fb.group({
    email:['',[Validators.email,Validators.required]]
  })

  async send(){
    let loading = await this.loadingCtrl.create({
      message:this.translate.instant('loading')
    });
    loading.present();
    
    this.loginService.forgot(this.forgotForm.value).toPromise()
    .then(async (result)=>{
      loading.dismiss()
      
      let alert = await this.alertController.create({
      
        header: this.translate.instant("forgot.success.title"),
        message: this.translate.instant("forgot.success.msg"),
        buttons: [this.translate.instant("forgot.success.button")]
      });
  
      await alert.present();
      this.router.navigate(["/login"],{preserveFragment:false,replaceUrl:true})
    })
    .catch(async (err)=>{
       
      loading.dismiss()
      let alert = await this.alertController.create({
        header: this.translate.instant("forgot.wrong.title"),
        message: this.translate.instant("forgot.wrong.msg"),
        buttons: [this.translate.instant("forgot.wrong.button")]
      });
  
      await alert.present();
    })
   
  }

}
