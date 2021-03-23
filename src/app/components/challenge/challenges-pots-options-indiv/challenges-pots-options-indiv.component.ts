import { SeeTrysComponent } from "./../../challenges/see-trys/see-trys.component";
import { ModalCreatedComponent } from "./../../challenges/modal-created/modal-created.component";
import { Subject } from "rxjs";
import { ShowAwardsComponent } from "./../../challenges/show-awards/show-awards.component";
import { UserService } from "./../../../service/user.service";
import { CreateChallengeComponent } from "./../../challenges/create/create.component";
import { ModalController } from "@ionic/angular";
import { IChallenge } from "./../../../service/challenge.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'app-challenges-pots-options-indiv',
  templateUrl: './challenges-pots-options-indiv.component.html',
  styleUrls: ['./challenges-pots-options-indiv.component.scss'],
})
export class ChallengesPotsOptionsIndivComponent implements OnInit {

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
    modal
      .onDidDismiss()
      .then((data) =>
        data.data?.intentos ? this.modalFinishedCreated(data.data) : null
      );
    await modal.present();
  }

  async modalFinishedCreated(challengeNew:IChallenge) {
    const modal = await this.mc.create({
      component: ModalCreatedComponent,
      cssClass: "a",
      componentProps: {Challenge:challengeNew},
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
