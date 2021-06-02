import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { IDivision, IStructure } from "src/app/models/structure.model";
import { StructureService } from "src/app/service/structure.service";
enum Texts {
  title = "divisions.title",
  description = "divisions.description",
  create = "divisions.create",
}
@Component({
  selector: "app-public-structure-club",
  templateUrl: "./public-structure-club.component.html",
  styleUrls: ["./public-structure-club.component.scss"],
})
export class PublicStructureClubComponent implements OnInit {
  public readonly Texts = Texts;
  constructor(
    private readonly structureService: StructureService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  public structure: IStructure = null;

  ngOnInit() {
    this.structureService
      .getStructureByUsername(this.route.snapshot.paramMap.get("username"))
      .subscribe((structure) => {
        this.structure = structure;
        this.getDivisions();
      });
  }

  public divisions: IDivision[] = [];

  getDivisions() {
    this.structureService
      .getAllDivisionsByUsername(this.route.snapshot.paramMap.get("username"))
      .subscribe((divisions) => {
        console.log(divisions);

        this.divisions = divisions;
      });
  }
}
