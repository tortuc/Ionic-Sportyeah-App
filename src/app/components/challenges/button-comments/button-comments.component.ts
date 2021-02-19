import { IChallenge } from "./../../../service/challenge.service";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-button-comments",
  templateUrl: "./button-comments.component.html",
  styleUrls: ["./button-comments.component.scss"],
})
export class ButtonCommentsComponent implements OnInit {
  @Input() Challenge: IChallenge;

  constructor() {}

  ngOnInit() {}
}
