import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ISocialNetworks, User } from "src/app/models/IUser";
import { UserService } from "src/app/service/user.service";
import { EditSocialNetworksComponent } from "../edit-social-networks/edit-social-networks.component";

enum Texts {
  title = "socialNetworks.private.title",
  edit = "socialNetworks.private.edit"
}

enum SocialNetworks {
  tiktok = "tiktok",
  facebook = "facebook",
  instagram = "instagram",
  twitter = "twitter",
  linkedin = "linkedin",
}
@Component({
  selector: "social-networks",
  templateUrl: "./social-networks.component.html",
  styleUrls: ["./social-networks.component.scss"],
})
export class SocialNetworksComponent implements OnInit {
  public readonly Texts = Texts;

  public socialNetworks = [];

  setSocialNetworks() {
    let { socialNetworks } = this.userService.User;
    this.socialNetworks = [
      {
        icon: "logo-tiktok",
        name: SocialNetworks.tiktok,
        username: socialNetworks.tiktok,
      },
      {
        icon: "logo-twitter",
        name: SocialNetworks.twitter,
        username: socialNetworks.twitter,
      },
      {
        icon: "logo-facebook",
        name: SocialNetworks.facebook,
        username: socialNetworks.facebook,
      },
      {
        icon: "logo-instagram",
        img:"assets/logos/instagram.png",

        name: SocialNetworks.instagram,
        username: socialNetworks.instagram,
      },
      {
        icon: "logo-linkedin",
        name: SocialNetworks.linkedin,
        username: socialNetworks.linkedin,
      },
    ];
  }

  @Input() user: User;

  constructor(
    private readonly userService: UserService,
    private readonly modalCtrl: ModalController
  ) {}

  ngOnInit() {
    if (!this.userService.User.socialNetworks) {
      let socialNetworks: ISocialNetworks = {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        tiktok: "",
      };
      this.userService.update({ socialNetworks }).subscribe((user) => {
        this.userService.User = user;
        this.setSocialNetworks();
      });
    } else {
      this.setSocialNetworks();
    }
  }

  async edit() {
    let modal = await this.modalCtrl.create({
      cssClass: "modal-border",
      component: EditSocialNetworksComponent,
    });
    modal.onDidDismiss().then(()=>{
      this.setSocialNetworks()
    })
    modal.present();
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
    } else {
      this.edit();
    }
  }
}
