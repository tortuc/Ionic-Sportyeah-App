import { OpenImgComponent } from "./../../components/open-img/open-img.component";
import { SliderLogic } from "./../../service/slider-logic.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { Plugins } from "@capacitor/core";
const { Camera, Filesystem } = Plugins;
import {
  AlertController,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "app-change-slider",
  templateUrl: "./change-slider.page.html",
  styleUrls: ["./change-slider.page.scss"],
})
export class ChangeSliderPage implements OnInit {
  @ViewChild("fileChooser") fileChooser: ElementRef;
  constructor(
    public userService: UserService,
    public mc: ModalController,
    public translate: TranslateService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController,
    public sliderLogic: SliderLogic
  ) {}

  ngOnInit() {}

  images: any[] = [];

  addContent() {
    this.sliderLogic.takePhotoFrom(this.fileChooser);
  }

  form = this.fb.group(
    {
      name: [
        this.userService.User?.name,
        [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/)],
      ],
      last_name: [
        this.userService.User?.last_name,
        [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/)],
      ],
      estado: [this.userService.User?.estado],
      birth_date: [
        moment(this.userService.User?.birth_date).utc().format("YYYY-MM-DD"),
        [Validators.required],
      ],
      password: ["", []],
      repeat_password: ["", []],
    },
    { validator: this.checkPasswords }
  );

  checkPasswords(form: FormGroup) {
    // funcion syncrona para verificar que las contraseñas coinciden
    let pass = form.controls.password.value;
    let confirmPass = form.controls.repeat_password.value;
    if (pass !== confirmPass) {
      form.controls.repeat_password.setErrors({ repeatInvalid: true });
    }

    return null;
  }

  change = false;

  /**
   * Esta funcion cambia los validators de los campos para la nueva contraseña
   */
  changePassword() {
    if (this.change) {
      this.form.controls.password.setValidators([
        Validators.required,
        ,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      ]);
      this.form.controls.password.updateValueAndValidity();
      this.form.controls.repeat_password.setValidators([Validators.required]);
      this.form.controls.repeat_password.updateValueAndValidity();
    } else {
      this.form.controls.password.setValue(null);
      this.form.controls.password.setValidators([]);
      this.form.controls.password.updateValueAndValidity();
      this.form.controls.repeat_password.setValue(null);
      this.form.controls.repeat_password.setValidators([]);
      this.form.controls.repeat_password.updateValueAndValidity();
    }
  }

  async save() {
    const loading = await this.loadingController.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    let body = this.form.value;
    body.change = this.change;
    this.userService
      .update(body)
      .toPromise()
      .then((resp) => {
        this.userService.User = null;
        this.userService
          .verifyToken()
          .then(() => {
            loading.dismiss();
            this.clearPass();

            this.alert(
              this.translate.instant("profile_edit.success.header"),
              this.translate.instant("profile_edit.success.message"),
              this.translate.instant("profile_edit.success.btn")
            );
          })
          .catch(() => {
            this.clearPass();

            loading.dismiss();
          });
      })
      .catch((err) => {
        loading.dismiss();
      });
  }

  clearPass() {
    this.change = false;
    this.form.controls.password.setValue(null);
    this.form.controls.repeat_password.setValue(null);
  }

  async alert(header, message, btn) {
    let alert = await this.alertController.create({
      header,
      message,
      buttons: [{ text: btn }],
    });

    await alert.present();
  }

  ionViewWillLeave() {
    this.sliderLogic.save();
  }

  show = false;
  show1 = false;
  async openImg(img: string) {
    const modal = await this.mc.create({
      component: OpenImgComponent,
      componentProps: {
        img,
        idUser: this.userService.User.username,
        delete: true,
      },
    });
    modal.onDidDismiss().then((data: any) => {
      if (data.data)
        if (data.data.res === true) {
          this.sliderLogic.delete(img);
        }
    });
    await modal.present();
  }
}
