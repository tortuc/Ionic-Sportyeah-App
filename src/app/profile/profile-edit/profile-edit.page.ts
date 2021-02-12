import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { User, UserService } from "src/app/service/user.service";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AvatarComponent } from "./avatar/avatar.component";
import * as moment from "moment";

@Component({
  selector: "app-profile-edit",
  templateUrl: "./profile-edit.page.html",
  styleUrls: ["./profile-edit.page.scss"],
})
export class ProfileEditPage implements OnInit {
  @ViewChild("FormElementRef") inputNode: any;
  @ViewChild("emojiButton") emojiButton: ElementRef;
  @ViewChild("emojiContainer") emojiContainer: ElementRef;
  constructor(
    public userService: UserService,
    public translate: TranslateService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}
  emojis: boolean = false;
  ngOnInit() {
    window.onclick = () => {
      this.emojis = false;
    };
    setTimeout(()=>{
      this.inputNode.el.addEventListener("focusout", (e) => {
        this.caretPosition = e.target.selectionStart;
      });
    },3000)
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
      .then((user:User) => {
        
        this.userService.User = user;
        loading.dismiss();
        this.clearPass();
        this.alert(
          this.translate.instant("profile_edit.success.header"),
          this.translate.instant("profile_edit.success.message"),
          this.translate.instant("profile_edit.success.btn")
        );
       
      })
      .catch((err) => {
        loading.dismiss();
      });
  }

  // getCaretPosition(nativeElement: any){
  //   console.log(nativeElement.querySelector('textarea'));
  //   return nativeElement.selectionStart;
  // }
  public caretPosition = null;
  public lastCaretPosition = 0;

  addEmoji(ev) {
    this.lastCaretPosition != 0 && this.lastCaretPosition == this.caretPosition
      ? (this.caretPosition = this.caretPosition + 2)
      : null;

    this.lastCaretPosition = this.caretPosition;
    let value = this.form.controls.estado.value;
    const newText =
      value.replace(/&nbsp;/g, " ").substring(0, this.caretPosition) +
      ev.emoji.native +
      value.replace(/nbsp;/g, "").substring(this.caretPosition);

    this.form.controls.estado.setValue(newText);
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

  show = false;
  show1 = false;

  openEmojis(e) {
    this.emojis = !this.emojis;
    e.stopPropagation();
    // this.inputNode.nativeElement.onclick = (e)=>{
    //   e.stopPropagation();
    // }
    this.inputNode.el.onclick = function (e) {
      e.stopPropagation();
    };
    this.emojiButton.nativeElement.onclick = (e) => {
      e.stopPropagation();
    };
    this.emojiContainer.nativeElement.onclick = (e) => {
      e.stopPropagation();
    };
  }
}
