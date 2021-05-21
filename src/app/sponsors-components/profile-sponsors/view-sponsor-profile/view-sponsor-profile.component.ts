import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { ISponsor, ISponsorInfo } from "src/app/models/ISponsor";
import { User } from "src/app/models/IUser";

@Component({
  selector: "view-sponsor-profile",
  templateUrl: "./view-sponsor-profile.component.html",
  styleUrls: ["./view-sponsor-profile.component.scss"],
})
export class ViewSponsorProfileComponent implements OnInit {
  /**
   * Informacion del patrocinador
   */
  @Input() info: ISponsorInfo;
  /**
   * Cuerpo completo del patrocinador
   */
  @Input() sponsor: ISponsor = null;

  constructor(
    private readonly router: Router,
    private readonly modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  async visit() {
    let profile = this.sponsor.idSponsor as User;
    if (profile) {
      this.router.navigate([`/user/${profile.username}`]);
      /**
       * Se usa por si se clickeo al sponsor desde una ventana modal
       */
      this.modalCtrl.dismiss().catch((e) => {
        // overlay doenst exits
      });
    } else if (this.info.url) {
      console.log(this.info.url);
      let url = this.info.url
        .split("https://")
        .join("")
        .split("http://")
        .join("");
      window.open("//" + url, "_blank");
    }
  }
}
