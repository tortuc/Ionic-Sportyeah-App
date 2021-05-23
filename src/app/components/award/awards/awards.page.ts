import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Awards, AwardService } from "src/app/service/awards.service";
import { UserService } from "src/app/service/user.service";
import { ModalController } from "@ionic/angular";
import { CreateAwardComponent } from "./create-award/create-award.component";
import { User } from "src/app/models/IUser";

enum Texts {
  createBtn = "awards.createBtn",
  hint = "awards.hint",
  title = "awards.title",
  public_title = "awards.public_title",
  no_info = "Esta cuenta no posee premios o reconocimientos",
}
@Component({
  selector: "awards",
  templateUrl: "./awards.page.html",
  styleUrls: ["./awards.page.scss"],
})
export class AwardsPage implements OnInit, OnChanges {
  public readonly Texts = Texts;
  @Input() user: User;

  public awards: Awards[] = [];
  constructor(
    public awardService: AwardService,
    public userService: UserService,
    private readonly modalCtrl: ModalController
  ) {
    // this.awardService.getByUser(this.userService.User._id);
  }

  ngOnChanges() {
    this.getItems();
  }

  async ngOnInit() {
    /**
     * Si los premios a cargar son del mismo usuario (perfil privado) nos suscribimos a un observable que avisara si creo un nuevo item
     */
    if (this.user._id == this.userService.User?._id) {
      this.awardService.newItem$.asObservable().subscribe((item) => {
        this.awards.unshift(item);
      });
    }
    this.getItems();
  }

  getItems() {
    this.awardService.getByUser(this.user._id).subscribe((awards) => {
      this.awards = awards;
    });
  }

  /**
   * Despliega una modal para crear un nuevo premio
   */

  async new() {
    let modal = await this.modalCtrl.create({
      component: CreateAwardComponent,
      cssClass: "modal-border",
    });

    return await modal.present();
  }
}
