import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AlertController,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { LoadingService } from "src/app/service/loading.service";
import { StructureService } from "src/app/service/structure.service";
import { PopoverOptionsComponent } from "../../popover-options/popover-options.component";
import { CreateCategoryComponent } from "../create-category/create-category.component";

enum Texts {
  see = "Ver categoria",
  edit = "Editar",
  delete = "Eliminar",
  header = "Eliminar categoria",
  message = "Seguro deseas eliminar esta categoria? se perderan los equipos y jugadores asociados a esta categoria!",
  accept = "Si, eliminar",
}

const popoverOtions = [
  {
    icon: "eye-outline",
    text: Texts.see,
    action: "see",
  },
  {
    icon: "create-outline",
    text: Texts.edit,
    action: "edit",
  },
  {
    icon: "trash-bin-outline",
    text: Texts.delete,
    action: "delete",
  },
];
enum options {
  edit = "edit",
  delete = "delete",
  see = "see",
}

@Component({
  selector: "category-card",
  templateUrl: "./category-card.component.html",
  styleUrls: ["./category-card.component.scss"],
})
export class CategoryCardComponent implements OnInit {
  @Input() category;
  @Input() private: boolean = false;

  constructor(
    private readonly popoverCtrl: PopoverController,
    private readonly alertCtrl: AlertController,
    private readonly translate: TranslateService,
    private readonly loading: LoadingService,
    private readonly structureService: StructureService,
    private readonly modalCtrl: ModalController,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  async options(event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverOptionsComponent,
      componentProps: { options: popoverOtions },
      event,
      showBackdrop: false,
    });

    popover.onDidDismiss().then((response) => {
      let option = response.data;
      this.handlerOptions(option);
    });
    popover.present();
  }
  handlerOptions(option: options) {
    switch (option) {
      case options.see:
        this.goto();
        break;
      case options.edit:
        this.edit();
        break;

      case options.delete:
        this.delete();
        break;

      default:
        break;
    }
  }

  async delete() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant(Texts.header),
      message: this.translate.instant(Texts.message),
      buttons: [
        {
          text: this.translate.instant("cancel"),
          role: "cancel",
        },
        {
          text: this.translate.instant(Texts.accept),
          handler: () => {
            this.loading.present();
            this.structureService.deleteCategory(this.category._id).subscribe(
              () => {
                this.loading.dismiss();
                this.category.deleted = true;
              },
              () => {
                this.loading.dismiss();
              }
            );
          },
        },
      ],
    });
    alert.present();
  }

  async edit() {
    this.structureService.categoryUpdated$.subscribe((category) => {
      this.category =
        this.category._id == category._id ? category : this.category;
    });
    const modal = await this.modalCtrl.create({
      component: CreateCategoryComponent,
      componentProps: { category: this.category },
      cssClass: "modal-border",
    });
    return await modal.present();
  }

  goto() {
    if (this.private) {
      this.router.navigate([`profile/structure/category/${this.category._id}`]);
    } else {
      this.router.navigate([`structure/category/${this.category._id}`]);
    }
  }
}
