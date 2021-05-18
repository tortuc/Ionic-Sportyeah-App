import { Component, Input, OnInit } from "@angular/core";
import { User } from "src/app/models/IUser";

@Component({
  selector: "sponsor-user-item",
  templateUrl: "./sponsor-user-item.component.html",
  styleUrls: ["./sponsor-user-item.component.scss"],
})
export class SponsorUserItemComponent implements OnInit {
  @Input() user: User;

  constructor() {}

  ngOnInit() {}
}
