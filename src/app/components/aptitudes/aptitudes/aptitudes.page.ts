import { TranslateService } from "@ngx-translate/core";
import { Component, OnInit, Input } from "@angular/core";
import { Aptitude, AptitudesService } from "src/app/service/aptitudes.service";
import { UserService } from "src/app/service/user.service";
import { User } from "src/app/models/IUser";
import { ModalController } from "@ionic/angular";
import { CreateAptitudeComponent } from "src/app/components/aptitudes/create-aptitude/create-aptitude.component";

enum Texts {
  title = "aptitudes.title",
  publicTitle = "aptitudes.publicTitle",
  hint = "aptitudes.hint",
  createBtn = "aptitudes.createBtn",
  no_info = "aptitudes.no_info"
}

@Component({
  selector: "aptitudes",
  templateUrl: "./aptitudes.page.html",
  styleUrls: ["./aptitudes.page.scss"],
})
export class AptitudesPage implements OnInit {
  public readonly Texts = Texts;
  @Input() user: User;
  constructor(
    private translate: TranslateService,
    public aptitudeService: AptitudesService,
    public userService: UserService,
    private readonly modalCtrl: ModalController
  ) {}

  public aptitudes: Aptitude[] = [];
  async ngOnInit() {
    if (this.user._id == this.userService.User?._id) {
      this.aptitudeService.newItem$.asObservable().subscribe((item) => {
        this.aptitudes.unshift(item);
      });
    }
    this.getItems();
  }

  getItems() {
    this.aptitudeService.getByUser(this.user._id).subscribe((items) => {
      this.aptitudes = items;
    });
  }

  async new() {
    let modal = await this.modalCtrl.create({
      component: CreateAptitudeComponent,
      cssClass: "modal-border",
    });

    return await modal.present();
  }
}
