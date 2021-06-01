import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LoginService } from "../service/login.service";

@Component({
  selector: "app-verification",
  templateUrl: "./verification.page.html",
  styleUrls: ["./verification.page.scss"],
})
export class VerificationPage implements OnInit {
  token: string = null;
  valid: boolean = null;
  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {
    route.queryParams.subscribe((data) => {
      this.token = data.token;
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.verification(this.token);
  }

  /**
   * Verifica el token de verificacion
   * @param token 
   */
  verification(token: string) {
    this.loginService
      .verification(token)
      .toPromise()
      .then((token: string) => {
        this.valid = true;
      })
      .catch((err) => {
        this.valid = false;
      });
  }
}
