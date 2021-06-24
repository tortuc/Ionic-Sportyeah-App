import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ICategory,
  IDivision,
  IStructure,
} from "src/app/models/structure.model";
import { StructureService } from "src/app/service/structure.service";
enum Texts {
  title = "divisions.title",
  description = "divisions.description",
}

@Component({
  selector: "app-public-division",
  templateUrl: "./public-division.component.html",
  styleUrls: ["./public-division.component.scss"],
})
export class PublicDivisionComponent implements OnInit {
  public readonly Texts = Texts;
  constructor(
    private readonly structureService: StructureService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public structure: IStructure = null;

  ngOnInit() {
    this.getDivision();
  }

  public division: IDivision = null;
  getDivision() {
    this.structureService
      .getDivisionById(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        (division) => {
          this.structure = division.structure;
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
}
