import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { LoginService } from "../service/login.service";
import { UserService } from "../service/user.service";
import {
  AlertController,
  IonSelectOption,
  ModalController,
} from "@ionic/angular";
import {
  languajes,
  profiles,
  sports,
  sub_profiles_administration,
  sub_profiles_staff,
} from "src/config/base";
import { LoadingService } from "../service/loading.service";
import { SportSelectComponent } from "./sport-select/sport-select.component";
import { response } from "express";
import { AlertOptions } from "@capacitor/core";
import { myBrowser } from "../helpers/browser";

enum Texts {
  emailErrorTitle = "sign_up.wrong.email.title",
  emailErrorMessage = "sign_up.wrong.email.msg",
  emailErrorBtn = "sign_up.wrong.email.button",
  usernameErrorTitle = "sign_up.wrong.username.title",
  usernameErrorMessage = "sign_up.wrong.username.msg",
  usernameErrorBtn = "sign_up.wrong.username.button",
  successTitle = "sign_up.success.title",
  successMsg = "sign_up.success.msg",
  successBtn = "sign_up.success.button",
}

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  public readonly sports = sports;

  public readonly langs = languajes;

  public readonly profiles = profiles;

  public readonly sub_profiles_administration = sub_profiles_administration;

  public readonly sub_profiles_staff = sub_profiles_staff;

  public customAlertOptions: any = {
    cssClass: "big-selet",
  };

  show = false;
  show1 = false;
  constructor(
    private readonly fb: FormBuilder,
    private readonly loginService: LoginService,
    public readonly alertController: AlertController,
    private readonly translate: TranslateService,
    private readonly router: Router,
    public readonly userService: UserService,
    private readonly loading: LoadingService,
    private readonly modalCtrl: ModalController
  ) {}

  ngOnInit() {}
  form = this.fb.group(
    {
      name: [
        "",
        [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/)],
      ],
      last_name: [
        "",
        [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/)],
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,}"),
        ],
      ],
      username: ["", [Validators.required]],
      lang: [this.translate.currentLang, [Validators.required]],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z.#$?])(?=.*\d)[A-Za-z.?*#$\d]{8,}$/),
        ],
      ],
      repeat_password: ["", [Validators.required]],
      birth_date: ["", [Validators.required]],
      parents_email: [""],
      parents_name: [""],
      parents_last_name: [""],
      sport: ["", [Validators.required]],
      profile_user: ["", [Validators.required]],
      sub_profile: ["", [Validators.required]],
      agree: [false],
      authorize: [true],
      browser: [myBrowser()],
    }, 
    { validator: this.checkPasswords }
  );

  sub_profile: boolean = false;
  have_sub_profile() {
    if (
      this.form.value.profile_user == "administration" ||
      this.form.value.profile_user == "staff"
    )
      this.sub_profile = true;
    else this.sub_profile = false;

    if (this.sub_profile) {
      this.form.controls.sub_profile.setValidators([Validators.required]);
      this.form.controls.sub_profile.updateValueAndValidity();
    } else {
      this.form.controls.sub_profile.setValue("");
      this.form.controls.sub_profile.setValidators([]);
      this.form.controls.sub_profile.updateValueAndValidity();
    }
  }

  younger: boolean = false;
  isyoung() {
    const birth = new Date(this.form.value.birth_date.toString());
    const today = new Date();

    this.younger =
      Math.round(
        ((today.getTime() - birth.getTime()) / 1000) * 60 * 60 * 24 * 365
      ) < 18
        ? true
        : false;

    if (this.younger) {
      this.form.controls.parents_email.setValidators([
        Validators.required,
        Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,}"),
      ]);
      this.form.controls.parents_name.setValidators([
        Validators.required,
        Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/),
      ]);
      this.form.controls.parents_last_name.setValidators([
        Validators.required,
        Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/),
      ]);

      this.form.controls.parents_email.updateValueAndValidity();
      this.form.controls.parents_name.updateValueAndValidity();
      this.form.controls.parents_last_name.updateValueAndValidity();
    } else {
      this.form.controls.parents_email.setValue(null);
      this.form.controls.parents_name.setValue("");
      this.form.controls.parents_last_name.setValue("");

      this.form.controls.parents_email.setValidators([]);
      this.form.controls.parents_name.setValidators([]);
      this.form.controls.parents_last_name.setValidators([]);

      this.form.controls.parents_email.updateValueAndValidity();
      this.form.controls.parents_name.updateValueAndValidity();
      this.form.controls.parents_last_name.updateValueAndValidity();
    }
  }

  checkPasswords(form: FormGroup) {
    // funcion syncrona para verificar que las contraseñas coinciden
    let pass = form.controls.password.value;
    let confirmPass = form.controls.repeat_password.value;
    if (pass !== confirmPass) {
      form.controls.repeat_password.setErrors({ repeatInvalid: true });
    }

    return null;
  }

  usernameFormat() {
    let value = this.form.controls.username.value;
    this.form.controls.username.setValue(value.replace(/\s/g, ""));
  }

  /**
   * Intentamos crear el usuario
   */
  async create() {
    // presentamos el loading
    this.loading.present();

    // obtenemos los datos del formulario y ese sera nuestro usuario
    let user = this.form.value;

    // obtenemos el country code del usuario que se registra y lo guardamos en el campo country

    user.country = await this.loginService.getCountryCode();

    this.loginService
      .create(user)
      .toPromise()
      .then(() => {
        this.loading.dismiss();
        this.success();
      })
      .catch((err) => {
        this.loading.dismiss();
        switch (err.error) {
          case "email-already-exists":
            this.alert(
              Texts.emailErrorTitle,
              Texts.emailErrorMessage,
              Texts.emailErrorBtn
            );
            break;
          case "user-already-exists":
            this.alert(
              Texts.usernameErrorTitle,
              Texts.usernameErrorMessage,
              Texts.usernameErrorBtn
            );
            break;

          default:
            break;
        }
      });
  }
  success() {
    this.alert(Texts.successTitle, Texts.successMsg, Texts.successBtn);
    this.router.navigate(["/login"]);
  }

  /**
   *
   * @param header Direccion donde se encuentra el mensaje que quieres desplegar en el header
   * @param message Direccion donde se encuentra el mensaje que quieres desplegar en el message
   * @param button Direccion donde se encuentra el mensaje que quieres desplegar en el button
   */

  async alert(header, message, button) {
    let alert = await this.alertController.create({
      header: this.translate.instant(header),
      message: this.translate.instant(message),
      buttons: [this.translate.instant(button)],
    });

    await alert.present();
  }

  setLang(ev) {
    this.translate.use(ev.detail.value);
  }

  public async selectSport() {
    const modal = await this.modalCtrl.create({
      component: SportSelectComponent,
      cssClass: "modal-border",
      backdropDismiss: false,
    });

    modal.onDidDismiss().then((response) => {
      response.data ? this.form.controls.sport.setValue(response.data) : null;
    });

    return await modal.present();
  }
}
