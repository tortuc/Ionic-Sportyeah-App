import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { IPost } from "src/app/models/iPost";
import { ISponsor, ISponsorInfo } from "src/app/models/ISponsor";
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
    private viewsSponsorService: ViewsSponsorService,
    private router: Router
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

        if (sponsors.length > 3) {
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

  clickOnSponsor(sponsor: ISponsor) {
    let profile = sponsor.idSponsor as User;
    if (profile) {
      this.router.navigate([`/user/${profile.username}`]);
      /**
       * Se usa por si se clickeo al sponsor desde una ventana modal
       */
    } else if (sponsor.customSponsor.url) {
      let url = sponsor.customSponsor.url
        .split("https://")
        .join("")
        .split("http://")
        .join("");
      window.open("//" + url, "_blank");
    }
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
