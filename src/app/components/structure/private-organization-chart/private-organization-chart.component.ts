import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import {
  IOrganization,
  IStructure,
  StructureService,
} from "src/app/service/structure.service";
import { CreateProfileOrgComponent } from "./create-profile-org/create-profile-org.component";

enum Texts {
  title = "organizationChart.title",
  description = "organizationChart.description",
  create = "organizationChart.createBtn",
  from = "Desde",
}

@Component({
  selector: "app-private-organization-chart",
  templateUrl: "./private-organization-chart.component.html",
  styleUrls: ["./private-organization-chart.component.scss"],
})
export class PrivateOrganizationChartComponent implements OnInit {
  public readonly Texts = Texts;
  constructor(
    private readonly structureService: StructureService,
    private readonly modalCtrl: ModalController
  ) {}

  public structure: IStructure = this.structureService.myStructure;

  ngOnInit() {
    this.structureService.newProfileOrganization$.subscribe((profile) => {
      this.profiles.push(profile);
    });

    this.getProfiles();
  }

  public profiles: IOrganization[] = [];

  getProfiles() {
    this.structureService
      .getOrganizationByStructure(this.structure._id)
      .subscribe((profiles) => {
        console.log(profiles);

        this.profiles = profiles;
      });
  }

  async create() {
    const modal = await this.modalCtrl.create({
      component: CreateProfileOrgComponent,
      cssClass: "modal-border",
    });

    return await modal.present();
  }
}
