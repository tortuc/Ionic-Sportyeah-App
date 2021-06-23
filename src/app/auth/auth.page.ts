import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { timer } from "rxjs";
import { UserService } from "../service/user.service";

enum Texts {
  title = "auth.title",
  hint = "auth.hint",
  error = "auth.error",
  success = "auth.success",
  label = "auth.label",
  continue = "auth.continue",
}

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  public readonly Texts = Texts;

  constructor(
    public readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  form = this.fb.group({
    code: [
      null,
      [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    ],
  });

  public success: boolean = false;
  public error: boolean = false;

  verifyCode() {
    this.userService.authCode(this.form.value.code).subscribe(
      (user) => {
        this.success = true;

        timer(3000).subscribe(() => {
          this.userService.User = user;
          this.router.navigate(["/dashboard"]);
        });
      },
      (err) => {
        this.error = true;
      }
    );
  }

  cancel() {
    this.userService.logout();
  }
}
