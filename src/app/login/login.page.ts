import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { LoginService } from "../service/login.service";
import { UserService } from "../service/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  show = false;
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private alertController: AlertController,
    public translate: TranslateService,
    public userService: UserService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
  });

  remember = false;

  async login() {
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    this.loginService.auth(this.loginForm.value).subscribe(
      async (token: string) => {
        loading.dismiss();
        if (!this.remember) {
          sessionStorage.setItem("token", token);
        } else {
          localStorage.setItem("token", token);
        }
        this.router.navigate(["/dashboard"], {
          preserveFragment: false,
          replaceUrl: true,
        });
      },
      (err) => {
        loading.dismiss();

        switch (err.status) {
          case 401:
            this.unverified(err.error);
            break;

          default:
            this.wrong();

            break;
        }
      }
    );
  }

  async unverified(user) {
    let alert = await this.alertController.create({
      header: this.translate.instant("login.noverified.title"),
      message: `${this.translate.instant("login.noverified.msg")}`,
      buttons: [
        {
          text: this.translate.instant("login.noverified.buttonCancel"),
        },
        {
          text: this.translate.instant("login.noverified.buttonResend"),
          handler: () => {
            this.loginService.resend(user).subscribe(async (resp) => {
              let alert = await this.alertController.create({
                header: this.translate.instant("login.resend.title"),
                message: this.translate.instant("login.resend.msg"),
                buttons: [this.translate.instant("login.resend.button")],
              });

              await alert.present();
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async wrong() {
    let alert = await this.alertController.create({
      header: this.translate.instant("login.wrong.title"),
      message: this.translate.instant("login.wrong.msg"),
      buttons: [this.translate.instant("login.wrong.button")],
    });

    await alert.present();
  }
}
