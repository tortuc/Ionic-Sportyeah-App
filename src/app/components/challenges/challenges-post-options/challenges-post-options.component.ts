import { SeeTrysComponent } from "./../see-trys/see-trys.component";
import { ModalCreatedComponent } from "./../modal-created/modal-created.component";
import { Subject } from "rxjs";
import { ShowAwardsComponent } from "./../show-awards/show-awards.component";
import { UserService } from "./../../../service/user.service";
import { CreateChallengeComponent } from "./../create/create.component";
import { ModalController } from "@ionic/angular";
import { IChallenge } from "./../../../service/challenge.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-challenges-post-options",
  templateUrl: "./challenges-post-options.component.html",
  styleUrls: ["./challenges-post-options.component.scss"],
})
export class ChallengesPostOptionsComponent implements OnInit {
  @Input() Challenge: IChallenge;
  @Input() pause: Subject<void>;

  constructor(public mc: ModalController, public userService: UserService) {}

  async aceptarReto(challenged, challenge) {
    const modal = await this.mc.create({
      component: CreateChallengeComponent,
      cssClass: "a",
      componentProps: {
        challenged,
        Challenge: challenge,
      },
    });
    this.pause.next();
    modal.onDidDismiss().then(() => this.modalFinishedCreated());
    await modal.present();
  }

  async modalFinishedCreated() {
    const modal = await this.mc.create({
      component: ModalCreatedComponent,
      cssClass: "a",
      componentProps: null,
    });
    await modal.present();
  }

  ngOnInit() {}

  async showAwards() {
    const modal = await this.mc.create({
      component: ShowAwardsComponent,
      cssClass: "a",
      componentProps: { awards: this.Challenge.awards },
    });
    await modal.present();
  }

  async openTrys() {
    const modal = await this.mc.create({
      component: SeeTrysComponent,
      componentProps: { intentos: this.Challenge.intentos },
    });
    this.pause.next();
    await modal.present();
  }
}
