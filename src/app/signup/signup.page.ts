import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../service/login.service';
import { UserService } from '../service/user.service';
import { AlertController, LoadingController, PopoverController } from '@ionic/angular';

interface SignUpResp {
  err:Object
  code:Number
  user:Object
  token:string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  show = false
  show1 = false
  constructor(
    private fb:FormBuilder,
    private loginService:LoginService,
    public alertController: AlertController,
    private translate:TranslateService,
    private router:Router,
    public userService:UserService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.loginService.getIP().subscribe((geo) => {
      this.geo = geo;
    });
  }
  geo;//para el país
  form = this.fb.group({
    name:['',[Validators.required,Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/)]],
    last_name:['',[Validators.required,Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/)]],
    email:['',[Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,}")]],
    username:['',[Validators.required]],
    password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z.#$?])(?=.*\d)[A-Za-z.?*#$\d]{8,}$/)]],
    repeat_password:['',[Validators.required]],
    birth_date:['',[Validators.required]],
    parents_email:[''],
    parents_name:[''],
    parents_last_name:[''],
    sport:['',[Validators.required]],
    profile_user:['',[Validators.required]],
    sub_profile:['',[Validators.required]], 
    agree:[false], 
    authorize:[true],
    geo:['']
  },{validator:this.checkPasswords})

  sports=['soccer', 'basketball','tennis',
  'baseball','golf','running','volleyball',
  'swimming','boxing','table_tennis','rugby',
  'football','esport','various']

  profiles=['club', 'player','staff',
  'amateur','representative','scout','press',
  'association','foundation','federation'
  ,'sponsor','executive','administration']

  sub_profiles_administration=['president','vice_president','vocal',
  'adviser','area_director','treasury','secretary','administration',//Hasta aquí los del admiinstration
  ]

  sub_profiles_staff=[
  'coach','physical_trainer','medicine','nutritionist',
  'sports_sychology','field_delegate']


  sub_profile:boolean = false;
  have_sub_profile(){
    
    if(this.form.value.profile_user == 'administration' || this.form.value.profile_user == 'staff') this.sub_profile = true;
    else this.sub_profile = false;
    
    if(this.sub_profile){
      this.form.controls.sub_profile.setValidators([Validators.required])
      this.form.controls.sub_profile.updateValueAndValidity();
    }else{
      this.form.controls.sub_profile.setValue('')
      this.form.controls.sub_profile.setValidators([])
      this.form.controls.sub_profile.updateValueAndValidity();
  }
  
  }

  younger:boolean=false;
  isyoung(){
    const birth =  new Date(this.form.value.birth_date.toString());
    const today = new Date();
   
   
    if( Math.round((today.getTime() - birth.getTime() )/31536000000) < 18 ){
      this.younger = true
    }else{
      this.younger= false;
    }
    
    if(this.younger){
      this.form.controls.parents_email.setValidators(
        [Validators.required,Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,}")]
      )
      this.form.controls.parents_name.setValidators([Validators.required,Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/)])
      this.form.controls.parents_last_name.setValidators([Validators.required,Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/)])
          
      this.form.controls.parents_email.updateValueAndValidity();
      this.form.controls.parents_name.updateValueAndValidity();
      this.form.controls.parents_last_name.updateValueAndValidity();

    }else{
      this.form.controls.parents_email.setValue(null)
      this.form.controls.parents_name.setValue('')
      this.form.controls.parents_last_name.setValue('')

      this.form.controls.parents_email.setValidators([])
      this.form.controls.parents_name.setValidators([])
      this.form.controls.parents_last_name.setValidators([])

      
      this.form.controls.parents_email.updateValueAndValidity();
      this.form.controls.parents_name.updateValueAndValidity();
      this.form.controls.parents_last_name.updateValueAndValidity();

    }
  }


  checkPasswords(form: FormGroup) { // funcion syncrona para verificar que las contraseñas coinciden
    let pass = form.controls.password.value;
    let confirmPass = form.controls.repeat_password.value;
    if(pass !== confirmPass){
      form.controls.repeat_password.setErrors({ 'repeatInvalid' : true })
    }
  
    return null     
  }


  ionViewWillEnter(){
  
    
}

usernameFormat(){
  let value = this.form.controls.username.value  
  this.form.controls.username.setValue(value.replace(/\s/g, ''))
  
}

async create(){
  this.form.value.geo = this.geo;
  let loading = await this.loadingCtrl.create({
    message:this.translate.instant('loading')
  })
  loading.present();
  this.loginService.create(this.form.value)
  .toPromise()
  .then(()=>{
    loading.dismiss()
    this.alert("sign_up.success.title","sign_up.success.msg","sign_up.success.button")
    this.router.navigate(["/login"])
  })
  .catch((err)=>{
    loading.dismiss()
    if(err.error == 'email-already-exists'){
      this.alert("sign_up.wrong.email.title","sign_up.wrong.email.msg","sign_up.wrong.email.button")
    }else if(err.error == 'user-already-exists'){
      this.alert("sign_up.wrong.username.title","sign_up.wrong.username.msg","sign_up.wrong.username.button")
   
    }

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
