import { Component, Input, OnInit } from "@angular/core"
import { IChallenge } from "src/app/service/challenge.service"

@Component({
  selector: 'profile-body-c',
  template: `
    <div *ngFor="let challenge of challenges">
      <app-challenge-content
        [Challenge]="challenge"
        [chain]="true"
      ></app-challenge-content>
    </div>
  `
})
export class ProfileBodyC implements OnInit {
  @Input() challenges: IChallenge[]
  constructor(){}
  ngOnInit(): void {}
}