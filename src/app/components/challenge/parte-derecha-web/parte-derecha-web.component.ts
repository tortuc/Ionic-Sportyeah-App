import { UserService } from "./../../../service/user.service";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";
import { ChallengeService } from "./../../../service/challenge.service";
import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { IChallenge } from "src/app/service/challenge.service";

@Component({
  selector: "app-parte-derecha-web",
  templateUrl: "./parte-derecha-web.component.html",
  styleUrls: ["./parte-derecha-web.component.scss"],
})
export class ParteDerechaWebComponent implements OnInit {
  @Input() Challenge: IChallenge;
  @Input() destroy: Subject<void>;
  @Input() pauseS: Subject<void>;
  @Input() scrollEvent: Subject<void>;
  next: any = null;
  challenges: IChallenge[] = null

  constructor(
    public cs: ChallengeService,
    public router: Router,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.getNext();
  }

  async getNext() {
    this.challenges =
      this.Challenge.challenges.length > 0
        ? await this.verifyParent()
        : await this.verifyParent();
  }

  async verifyParent() {
    return this.Challenge.challenged.media === this.Challenge.challenging.media
      ? await this.getRandom()
      : await this.getRandom();
  }

  async getRandom(): Promise<any> {
    const r: any = await this.cs.getAll().pipe(take(1)).toPromise();
    let count = 6;
    const array = []
    r.challenges.map((challenge:IChallenge)=>{
      if(count > 0){
        count -= 1
        array.push(challenge)
      }
    })
    return array
  } 

  goNext() {
    this.router.navigate([`/challenge/${this.next._id}`]);
  }

  goChallenge(challenge:IChallenge){
    this.router.navigateByUrl('challenge/'+challenge._id)
  }

  goToProfile(username: string){
    this.router.navigateByUrl('challenges/'+username)
  }
}
