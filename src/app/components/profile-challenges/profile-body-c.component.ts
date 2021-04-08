import { UserService } from './../../service/user.service';
import { Component, Input, OnInit } from "@angular/core"
import { IChallenge } from "src/app/service/challenge.service"
import { Router } from '@angular/router';

@Component({
  selector: 'profile-body-c',
  template: `
    <ion-grid class="text-center">
      <ion-row style="justify-content:center">
        <ion-col 
          size-md="3"
          *ngFor="let challenge of show" 
          style="cursor:pointer; height:150px; padding:5px;"
          (click)="goChallenge(challenge)"
        >
          <!--<app-challenges-post-header [Challenge]="challenge">
          </app-challenges-post-header>-->
          <app-challenge-content 
            [Challenge]="challenge"
            [chain]="true"
          ></app-challenge-content>
        </ion-col>
      </ion-row>
    </ion-grid>
  `
})
export class ProfileBodyC implements OnInit {
  @Input() challenges: IChallenge[]
  show: IChallenge[] = []
  pag: number = 0
  constructor(
    public userService: UserService,
    public router: Router
  ){}
  ngOnInit(): void {
    this.getUsers(this.challenges)
  }
  goChallenge(challenge:IChallenge){
    this.router.navigateByUrl('challenge/'+challenge._id)
  }
  async getUsers(challenges: IChallenge[]) {
    const challengesNew: any[] = await Promise.all(
      challenges.map(async (challenge: any) => {
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
    this.challenges = challengesNew.reverse();
    for (let i = this.pag; i < this.pag + 6; i++) if (this.challenges[i]) this.show.push(this.challenges[i]);
  }
}