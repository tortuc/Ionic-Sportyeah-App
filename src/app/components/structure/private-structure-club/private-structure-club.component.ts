import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { IDivision, IStructure } from "src/app/models/structure.model";
import {
  StructureService,
} from "src/app/service/structure.service";
import { CreateDivisionComponent } from "./create-division/create-division.component";
enum Texts {
  title = "divisions.title",
  description = "divisions.description",
  create = "divisions.create",
}
@Component({
  selector: "app-private-structure-club",
  templateUrl: "./private-structure-club.component.html",
  styleUrls: ["./private-structure-club.component.scss"],
})
export class PrivateStructureClubComponent implements OnInit {
  public readonly Texts = Texts;
  constructor(
    private readonly structureService: StructureService,
    private readonly modalCtrl: ModalController
  ) {}

  public structure: IStructure = this.structureService.myStructure;

  ngOnInit() {
    this.structureService.newDivision$.subscribe((division) => {
      this.divisions.push(division);
    });

    this.getDivisions();
  }

  public divisions: IDivision[] = [];

  getDivisions() {
    this.structureService
      .getAllDivisionsByStructure(this.structure._id)
      .subscribe((divisions) => {
        this.divisions = divisions;
      });
  }

  async create() {
    const modal = await this.modalCtrl.create({
      component: CreateDivisionComponent,
      cssClass: "modal-border",
    });
    return await modal.present();
  }
}
