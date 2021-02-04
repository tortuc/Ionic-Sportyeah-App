import { CreateChallengeComponent } from './../components/challenge/create/create.component';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-challenges",
  templateUrl: "./challenges.page.html",
  styleUrls: ["./challenges.page.scss"],
})
export class ChallengesPage implements OnInit {
  constructor(public translate:TranslateService,public mc: ModalController) {}

  ngOnInit() {}

  async create(){
    const modal = await this.mc.create({
      component:CreateChallengeComponent,
      cssClass: 'a'
    });
    await modal.present();
  }
}
