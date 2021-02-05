import { UserService } from "./../service/user.service";
import { take } from "rxjs/operators";
import { CreateChallengeComponent } from "./../components/challenge/create/create.component";
import { ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ChallengeService } from "../service/challenge.service";

@Component({
  selector: "app-challenges",
  templateUrl: "./challenges.page.html",
  styleUrls: ["./challenges.page.scss"],
})
export class ChallengesPage implements OnInit {
  // @ViewChild(Content) content:Content;
  public challenges: any[] = null;
  constructor(
    public translate: TranslateService,
    public mc: ModalController,
    public challengeService: ChallengeService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.challengeService
      .getAll()
      .pipe(take(1))
      .subscribe(
        (r: any) => {
          this.getUsers(r.challenges);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  async getUsers(challenges) {
    const challengesNew:any[] = await Promise.all(
      challenges.map(async (challenge:any) => {
        const r = await this.userService
          .getUserById(challenge.challenged.userId.referenceId)
          .toPromise();
        const r2 = await this.userService
          .getUserById(challenge.challenging.userId.referenceId)
          .toPromise();
        challenge.challenged.userId.data = r;
        challenge.challenging.userId.data = r2;
        return challenge;
      })
    );
    console.log(challengesNew[0].challenged.userId.data);
    this.challenges = challengesNew.reverse();
  }

  async create() {
    const modal = await this.mc.create({
      component: CreateChallengeComponent,
      cssClass: "a",
      componentProps:{
        challenged:null
      }
    });
    modal.onDidDismiss().then(() => this.ngOnInit());
    await modal.present();
  }

  async aceptarReto(challenged){
    const modal = await this.mc.create({
      component: CreateChallengeComponent,
      cssClass:"a",
      componentProps:{
        challenged
      }
    })
    modal.onDidDismiss().then(()=> this.ngOnInit())
    await modal.present()
  }

  async onScroll(e){
    e.preventDefault()
    // this.content.scrollToTop();
    console.log('Is scrolling',e);
  }
}
