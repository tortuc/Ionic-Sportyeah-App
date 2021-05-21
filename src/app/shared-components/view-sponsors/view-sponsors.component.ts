import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IPost } from "src/app/models/iPost";
import { ISponsor } from "src/app/models/ISponsor";
import { User } from "src/app/models/IUser";
import { SponsorService } from "src/app/service";
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
    private sponsorService: SponsorService,
    private viewsSponsorService:ViewsSponsorService
  ) {}

  @Output() onSelect = new EventEmitter();
  sponsors: ISponsor[] = [];

  ngOnInit() {
    this.getSponsors();
  }
  getSponsors() {
    this.sponsorService
      .getAllSponsorsUserById(this.post.user._id)
      .subscribe((sponsors) => {
        this.sponsors = sponsors;
        console.log(sponsors);
        
        if (sponsors.length > 4) {
          this.rotateSponsors();
        }
      });
  }

  rotateSponsors() {
    setInterval(() => {
      let last = this.sponsors.pop();
      this.sponsors.unshift(last);
    }, 3000);
  }

  
  clickOnSponsor(sponsor) {
  //   if (this.post.user._id != this.userService.User._id) {
  //     this.viewsSponsorService
  //       .createSponsorView({
  //         user: this.post.user._id,
  //         visitor: this.userService.User._id,
  //         from: "post",
  //         link: `/post/${this.post._id}`,
  //         nameSponsor: sponsor.name,
  //       })
  //       .subscribe((response) => {
  //         window.open("//" + sponsor.url, "_blank");
  //       });
  //   } else {
  //     window.open("//" + sponsor.url, "_blank");
  //   }
  }
}
