import { ChallengeCommentsComponent } from './../challenge-comments/challenge-comments.component';
import { ModalController } from '@ionic/angular';
import { IChallenge } from "./../../../service/challenge.service";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from '@angular/router'

@Component({
  selector: "app-button-comments",
  templateUrl: "./button-comments.component.html",
  styleUrls: ["./button-comments.component.scss"],
})
export class ButtonCommentsComponent implements OnInit {
  @Input() Challenge: IChallenge;

  constructor(
    public mc: ModalController,
    public router: Router
  ) {}

  ngOnInit() {}

  async challengeComments(comments: any[]) {
    this.router.navigate([`/challenge/${this.Challenge._id}`])
    //const modal = await this.createModalComments(comments);
  }
  async createModalComments(comments: any[]) {
    const modal = await this.mc.create({
      component: ChallengeCommentsComponent,
      componentProps: {
        comments,
        referenceId: this.Challenge.challenged._id,
        challenge: this.Challenge._id,
      },
    });
    await modal.present();
    return modal;
  }
}
