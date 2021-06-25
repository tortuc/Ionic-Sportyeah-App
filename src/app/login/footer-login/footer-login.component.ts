import { Component, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";
import { environment } from "src/environments/environment";
enum LegalTexts {
  contact = "legal.contact",
  conditions = "legal.conditions",
  privacy = "legal.privacy",
  warning = "legal.warning",
  return = "legal.return",
  cookies = "legal.cookies",
}
@Component({
  selector: "footer-login",
  templateUrl: "./footer-login.component.html",
  styleUrls: ["./footer-login.component.scss"],
})
export class FooterLoginComponent implements OnInit {
  constructor(public readonly platform: Platform) {}

  ngOnInit() {}

  legalTexts = [
    {
      url: `${environment.URL_LANDING}/about/contact`,
      text: LegalTexts.contact,
    },
    {
      url: `${environment.URL_LANDING}/about/conditions`,
      text: LegalTexts.conditions,
    },
    {
      url: `${environment.URL_LANDING}/about/policyprivacy`,
      text: LegalTexts.privacy,
    },
    {
      url: `${environment.URL_LANDING}/about/legal`,
      text: LegalTexts.warning,
    },
    {
      url: `${environment.URL_LANDING}/about/return`,
      text: LegalTexts.return,
    },
    {
      url: `${environment.URL_LANDING}/about/cookies`,
      text: LegalTexts.cookies,
    },
  ];
}
