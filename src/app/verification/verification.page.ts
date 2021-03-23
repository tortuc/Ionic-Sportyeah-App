import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {
  token:string = null
  valid: boolean = null;
  constructor(
    private route:ActivatedRoute,
    private loginService:LoginService,
    private translate:TranslateService,
    private router:Router
  ) { 
    route.queryParams.subscribe((data)=>{
      this.token = data.token
      
    })
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.verification(this.token)
    
  }
  verification(token: string) {
    this.loginService.verification(token).toPromise()
      .then((token:string)=>{
        this.valid = true
        localStorage.setItem("token",token)
      })
      .catch((err)=>{
        this.valid = false
      })
    
  }

}
