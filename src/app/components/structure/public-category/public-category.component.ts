import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ICategory, IStructure, ITeam } from "src/app/models/structure.model";
import { StructureService } from "src/app/service/structure.service";
enum Texts {
  title = "divisions.title",
  description = "divisions.description",
  header = "category.header",
}

@Component({
  selector: "app-public-category",
  templateUrl: "./public-category.component.html",
  styleUrls: ["./public-category.component.scss"],
})
export class PublicCategoryComponent implements OnInit {
  public readonly Texts = Texts;
  constructor(
    private readonly structureService: StructureService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public structure: IStructure = null;

  ngOnInit() {
    this.getCategory();
  }

  public teams: ITeam[] = [];

  public category: ICategory = null;
  getCategory() {
    this.structureService
      .getCategory(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        (category) => {
          this.structureService.newTeam$.subscribe((team) => {
            this.teams.push(team);
          });

          this.category = category;

          const { structure } = category.division;
          this.structure = structure;
          this.getTeams();
        },
        () => {
          this.router.navigate(["/404"]);
        }
      );
  }

  getTeams() {
    this.structureService
      .getAllTeamsByCategory(this.category._id)
      .subscribe((teams) => {
        this.teams = teams;
      });
  }

  public categories: ICategory[] = [];
}
