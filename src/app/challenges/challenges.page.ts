import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-challenges",
  templateUrl: "./challenges.page.html",
  styleUrls: ["./challenges.page.scss"],
})
export class ChallengesPage implements OnInit {
  constructor(public translate:TranslateService) {}

  ngOnInit() {}
}
