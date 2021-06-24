import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { IStructure } from "src/app/models/structure.model";
import {
  StructureService,
} from "src/app/service/structure.service";
import { UserService } from "src/app/service/user.service";
import { EditStructureInfoComponent } from "./edit-structure-info/edit-structure-info.component";

enum Texts {
  edit = "private_structure.edit",
  init = "private_structure.init",
  structureClub = "private_structure.structureClub",
  organizationChart = "private_structure.organizationChart",
}

enum SocialNetworks {
  tiktok = "tiktok",
  facebook = "facebook",
  instagram = "instagram",
  twitter = "twitter",
  linkedin = "linkedin",
}

@Component({
  selector: "app-private-structure",
  templateUrl: "./private-structure.component.html",
  styleUrls: ["./private-structure.component.scss"],
})
export class PrivateStructureComponent implements OnInit {
  public readonly Texts = Texts;
  constructor(
    private readonly structureService: StructureService,
    public readonly userService: UserService,
    private readonly router: Router,
    private readonly modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.setSocialNetworks();
  }

  public structure: IStructure = this.structureService.myStructure;

  public socialNetworks = [];

  setSocialNetworks() {
    let { socialNetworks } = this.structure;
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

  reload() {
    this.structure = this.structureService.myStructure;
    this.setSocialNetworks();
  }

  public async edit() {
    const modal = await this.modalCtrl.create({
      component: EditStructureInfoComponent,
      cssClass: "modal-border",
    });
    modal.onDidDismiss().then((response) => {
      response.data ? this.reload() : null;
    });
    return await modal.present();
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
