import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../service/login.service';

@Component({
  selector    : 'app-newpassword',
  templateUrl : './newpassword.page.html',
  styleUrls   : ['./newpassword.page.scss'],
})
export class NewpasswordPage implements OnInit {
  token:string = null
  valid: boolean;
  constructor
  (
      private fb              : FormBuilder,
      private route           : ActivatedRoute,
      private loginService    : LoginService,
      private alertController : AlertController,
      private translate       : TranslateService,
      private router          : Router
  ) 
  { 
    route.queryParams.subscribe((data)=>{
      
      this.token = data.token
      
    })
  }

ngOnInit(){

}

  ionViewDidEnter(){
    this.verifyToken(this.token)
    
  }

  /**
   * Verificar el token del URL
   * @param {string} token token url 
   */
  verifyToken(token){
    this.loginService.verifyToken(token)
      .toPromise()
      .then((resp)=>{
        this.valid = true
      })
      .catch((err)=>{
        this.valid = false
      })
    
  }

  newPasswordForm = this.fb.group({
    password        : ['',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]],
    repeat_password : ['',[Validators.required]]
  },{validator:this.checkPasswords})


  /**
   * Evalua si las contraseñas coinciden
   * @param {FormGroup} form formulario donde se encuentra los campos del password 
   */
  checkPasswords(form: FormGroup) {

    let pass        = form.controls.password.value;
    let confirmPass = form.controls.repeat_password.value;

    if(pass !== confirmPass){
      form.controls.repeat_password.setErrors({ 'repeatInvalid' : true })
    }
  
    return null     
  }


  /**
   * Funcion para Reestablecer la nueva contraseña
   */

  accept(){
    let pass    = this.newPasswordForm.value
    pass.recover_password_token  = this.token

    this.loginService.newPassword(pass)
    .toPromise()
    .then(async ()=>{

        this.alert("new_password.success.title","new_password.success.msg","new_password.success.button")
        this.router.navigate(["/login"],{preserveFragment:false,replaceUrl:true})
    })
    .catch(async ()=>{
        this.alert("new_password.wrong.title","new_password.wrong.msg","new_password.wrong.button")
    })
   
  }


  /**
   * 
   * @param header Direccion donde se encuentra el mensaje que quieres desplegar en el header
   * @param message Direccion donde se encuentra el mensaje que quieres desplegar en el message
   * @param button Direccion donde se encuentra el mensaje que quieres desplegar en el button
   */

  async alert(header,message,button){
    let alert = await this.alertController.create({
      
      header: this.translate.instant(header),
      message: this.translate.instant(message),
      buttons: [this.translate.instant(button)]
    });

    await alert.present();
  }

}
