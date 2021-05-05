import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IPost } from "src/app/models/iPost";
import { ISponsor } from "src/app/models/ISponsor";
import { UserService } from "src/app/service/user.service";
import { ViewsSponsorService } from "src/app/service/views-sponsor.service";

@Component({
  selector: "view-sponsors",
  templateUrl: "./view-sponsors.component.html",
  styleUrls: ["./view-sponsors.component.scss"],
})
export class ViewSponsorsComponent implements OnInit {
  @Input() post: IPost;

  constructor(
    public userService: UserService,
    private viewsSponsorService: ViewsSponsorService
  ) {}

  @Output() onSelect = new EventEmitter();
  @Input() sponsors: ISponsor[] = [];

  ngOnInit() {
    this.rotateSponsors();
  }

  rotateSponsors() {
    setInterval(() => {
      let last = this.sponsors.pop();
      this.sponsors.unshift(last);
    }, 3000);
  }

  clickOnSponsor(sponsor) {
    this.onSelect.emit(sponsor);
  }
}
