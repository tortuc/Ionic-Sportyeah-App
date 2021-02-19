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

  constructor(public mc: ModalController, public userService: UserService) {}

  async aceptarReto(challenged) {
    const modal = await this.mc.create({
      component: CreateChallengeComponent,
      cssClass: "a",
      componentProps: {
        challenged,
      },
    });
    modal.onDidDismiss().then(() => this.ngOnInit());
    await modal.present();
  }

  ngOnInit() {}
}
