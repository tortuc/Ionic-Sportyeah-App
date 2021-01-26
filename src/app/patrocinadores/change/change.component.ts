import {
  Component,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  ModalController
} from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { LandingService } from "src/app/service/landingService";

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss'],
})
export class ChangeComponent implements OnInit {
  form: FormGroup = null;
  galeriaIconos: boolean = false;
  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    public landingService : LandingService,
    public ls : LandingService,
    public userService: UserService,
    public router: Router,
    public mc: ModalController,
  ) {
    console.log("Lo que hay dentro de product array",this.ls.productArray);
    this.generateForm();
    this.ls.editing.indexOf('iconName') !== -1 ? this.galeriaIconos = true: null;
  }
  ngOnInit() {
  }
  generateForm() {
    if(this.ls.editing === "productArray"){
      this.form = this.fb.group({
        a: [this.ls.ls.products[this.ls.productArray.index][this.ls.productArray.property]],
      });
    }else{
      this.form = this.fb.group({
        a: [this.landingService.ls[this.landingService.editing]]
      });
    }
  }
  async alert(header, message, btn) {
    let alert = await this.alertController.create({
      header,
      message,
      buttons: [{ text: btn }],
    });
    await alert.present();
  }
  save(text:string) {
    let landing = null;
    if(this.ls.editing === 'productArray'){
      landing = this.landingService.ls;
      landing.products[this.ls.productArray.index][this.ls.productArray.property] = text 
    }else{
      landing = this.landingService.ls;
      landing[this.landingService.editing] = text;
    }
    this.ls.edit(landing);
    this.mc.dismiss();
  }

}
