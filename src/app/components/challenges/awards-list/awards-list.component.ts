import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IAward } from "src/app/service/challenge.service";

@Component({
  selector: "awards-list",
  templateUrl: "./awards-list.component.html",
  styleUrls: ["./awards-list.component.scss"],
})
export class AwardsListComponent implements OnInit {
  @Input() awards: IAward[];
  @Input() creator: boolean = false;
  @Output() next = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  delete(i) {
    this.awards.splice(i, 1);
  }
}
