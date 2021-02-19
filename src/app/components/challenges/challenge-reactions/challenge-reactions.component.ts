import { ModalController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { ChallengeService } from "../../../service/challenge.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-challenge-reactions",
  templateUrl: "./challenge-reactions.component.html",
  styleUrls: ["./challenge-reactions.component.scss"],
})
export class ChallengeReactionsComponent implements OnInit {
  @Input() challenge: any;

  constructor(
    public challengeService: ChallengeService,
    public mc: ModalController
  ) {}

  ngOnInit() {
    console.log(this.challenge);
    this.challengeService
      .getById(this.challenge._id)
      .pipe(take(1))
      .subscribe(
        (r: any) => {
          console.log(r);
          console.log(r.challenge.challenging.reactions);
        },
        (err) => console.log(err)
      );
  }
}
