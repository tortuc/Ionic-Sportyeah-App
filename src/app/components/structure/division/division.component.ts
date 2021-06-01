import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { IDivision, IStructure } from "src/app/models/structure.model";
import {
  StructureService,
} from "src/app/service/structure.service";
import { CreateDivisionComponent } from "../private-structure-club/create-division/create-division.component";
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
          this.division = division;
        },
        () => {
          this.router.navigate(["/404"]);
        }
      );
  }

  public categories = [
    {
      name: "Categoria infantil",
      image: "assets/structure/categorychild.jpg",
      description: "Equipos infantiles",
      division: null,
      deleted:false
    },
  ];

  async create() {
    const modal = await this.modalCtrl.create({
      component: CreateDivisionComponent,
      cssClass: "modal-border",
    });
    return await modal.present();
  }
}
