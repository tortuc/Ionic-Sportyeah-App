import { Component, Input, OnInit } from "@angular/core";
import { ISocialNetworks, User } from "src/app/models/IUser";

enum SocialNetworks {
  tiktok = "tiktok",
  facebook = "facebook",
  instagram = "instagram",
  twitter = "twitter",
  linkedin = "linkedin",
}

@Component({
  selector: "social-networks-public",
  templateUrl: "./social-networks-public.component.html",
  styleUrls: ["./social-networks-public.component.scss"],
})
export class SocialNetworksPublicComponent implements OnInit {
  @Input() user: User;
  constructor() {}

  public socialNetworks = [];

  setSocialNetworks() {
    let { socialNetworks } = this.user;
    if (socialNetworks.facebook) {
      this.socialNetworks.push({
        icon: "logo-facebook",
        name: SocialNetworks.facebook,
        username: socialNetworks.facebook,
      });
    }
    if (socialNetworks.twitter) {
      this.socialNetworks.push({
        icon: "logo-twitter",
        name: SocialNetworks.twitter,
        username: socialNetworks.twitter,
      });
    }
    if (socialNetworks.tiktok) {
      this.socialNetworks.push({
        icon: "logo-tiktok",
        name: SocialNetworks.tiktok,
        username: socialNetworks.tiktok,
      });
    }
    if (socialNetworks.instagram) {
      this.socialNetworks.push({
        icon: "logo-instagram",
        name: SocialNetworks.instagram,
        username: socialNetworks.instagram,
      });
    }
    if (socialNetworks.linkedin) {
      this.socialNetworks.push({
        icon: "logo-linkedin",
        name: SocialNetworks.linkedin,
        username: socialNetworks.linkedin,
      });
    }
  }

  ngOnInit() {
    if (this.user.socialNetworks) {
      this.setSocialNetworks();
    }
  }
  redirectTo(social: SocialNetworks, username) {
    if (username) {
      switch (social) {
        case SocialNetworks.twitter:
          window.open(`https://twitter.com/${username}`, "_blank");
          break;
        case SocialNetworks.facebook:
          window.open(`https://www.facebook.com/${username}`, "_blank");
          break;
        case SocialNetworks.tiktok:
          window.open(`https://www.tiktok.com/@${username}`, "_blank");
          break;
        case SocialNetworks.linkedin:
          window.open(`https://www.linkedin.com/in/${username}`, "_blank");
          break;
        case SocialNetworks.instagram:
          window.open(`https://www.instagram.com/${username}`, "_blank");
          break;

        default:
          break;
      }
    }
  }
}
