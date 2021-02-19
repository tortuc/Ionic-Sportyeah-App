import { UserService } from './../../../service/user.service';
import { IChallenge } from './../../../service/challenge.service';
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-challenges-post-header",
  templateUrl: "./challenges-post-header.component.html",
  styleUrls: ["./challenges-post-header.component.scss"],
})
export class ChallengesPostHeaderComponent implements OnInit {
  @Input() Challenge: IChallenge;

  constructor(public userService: UserService) {}

  ngOnInit() {}
}
