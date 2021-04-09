import { Router } from "@angular/router";
import { UserService } from "./../../../service/user.service";
import { IChallenge } from "./../../../service/challenge.service";
import { Component, Input, OnInit } from "@angular/core";
import { PopoverController } from '@ionic/angular';
import { COptionsComponent } from 'src/app/components/challenges/c-options/c-options.component';

@Component({
  selector: "app-challenges-post-header",
  templateUrl: "./challenges-post-header.component.html",
  styleUrls: ["./challenges-post-header.component.scss"],
})
export class ChallengesPostHeaderComponent implements OnInit {
  @Input() Challenge: IChallenge;
  date: Date = null;

  constructor(
    public  userService   :   UserService, 
    public  router        :   Router,
    private popover       :   PopoverController,
  ) {}

  ngOnInit() {
    this.date = new Date(this.Challenge.modifiedAt);
  }
  async openOptions(e){
    const pop = await this.popover.create({
      component: COptionsComponent,
      translucent: true,
      event:e,
      componentProps:{id:this.Challenge._id}
    });
    await pop.present()
  }

  goToProfile(username: string){
    this.router.navigateByUrl('challenges/'+username)
  }
}
