import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import {
  ICategory,
  IDivision,
  IStructure,
} from "src/app/models/structure.model";
import { StructureService } from "src/app/service/structure.service";
import { CreateCategoryComponent } from "./create-category/create-category.component";
enum Texts {
  title = "divisions.title",
  description = "divisions.description",
  create = "Crear categoria",
}
@Component({
  selector: "app-division",
  templateUrl: "./division.component.html",
  styleUrls: ["./division.component.scss"],
})
export class DivisionComponent implements OnInit {
  public readonly Texts = Texts;
  constructor(
    private readonly structureService: StructureService,
    private readonly modalCtrl: ModalController,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public structure: IStructure = this.structureService.myStructure;

  ngOnInit() {
    this.getDivision();
  }

  public division: IDivision = null;
  getDivision() {
    this.structureService
      .getDivisionById(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        (division) => {
          this.structureService.newCategory$.subscribe((category) => {
            this.categories.push(category);
          });
          this.division = division;
          this.getCategories();
        },
        () => {
          this.router.navigate(["/404"]);
        }
      );
  }

  getCategories() {
    this.structureService
      .getAllCategoryByDivision(this.division._id)
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  public categories: ICategory[] = [];

  async create() {
    const modal = await this.modalCtrl.create({
      component: CreateCategoryComponent,
      componentProps: { division: this.division },
      cssClass: "modal-border",
    });
    return await modal.present();
  }
}
