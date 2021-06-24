import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IOrganization, IStructure } from "src/app/models/structure.model";
import { StructureService } from "src/app/service/structure.service";
enum Texts {
  title = "organizationChart.title",
  description = "organizationChart.description",
  create = "organizationChart.createBtn",
  from = "from",
}
@Component({
  selector: "app-public-organization-chart",
  templateUrl: "./public-organization-chart.component.html",
  styleUrls: ["./public-organization-chart.component.scss"],
})
export class PublicOrganizationChartComponent implements OnInit {
  public readonly Texts = Texts;
  constructor(
    private readonly structureService: StructureService,
    private readonly route: ActivatedRoute
  ) {}

  public structure: IStructure = null;

  ngOnInit() {
    this.structureService
      .getStructureByUsername(this.route.snapshot.paramMap.get("username"))
      .subscribe((structure) => {
        this.structure = structure;
        this.getProfiles();
      });
  }

  public profiles: IOrganization[] = [];

  getProfiles() {
    this.structureService
      .getOrganizationByUsername(this.route.snapshot.paramMap.get("username"))
      .subscribe(
        (profiles) => {
          this.profiles = profiles;
        },
        (err) => {}
      );
  }
}
