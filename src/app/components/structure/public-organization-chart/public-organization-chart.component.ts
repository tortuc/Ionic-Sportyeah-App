import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalController } from "@ionic/angular";
import {
  IOrganization,
  IStructure,
  StructureService,
} from "src/app/service/structure.service";
enum Texts {
  title = "organizationChart.title",
  description = "organizationChart.description",
  create = "organizationChart.createBtn",
  from = "Desde",
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
        this.getProfiles()
      });
  }

  public profiles: IOrganization[] = [];

  getProfiles() {
    this.structureService
      .getOrganizationByUsername(this.route.snapshot.paramMap.get("username"))
      .subscribe((profiles) => {
        console.log(profiles);
        
        this.profiles = profiles;
      },(err)=>{
        console.log(err);
        
      });
  }
}
