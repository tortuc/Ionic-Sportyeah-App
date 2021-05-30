import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  IOrganization,
  StructureService,
} from "src/app/service/structure.service";


enum Texts {
  toolbar = "Perfil de organigrama",
  from = "Desde"
}

@Component({
  selector: "app-executive-profile",
  templateUrl: "./executive-profile.component.html",
  styleUrls: ["./executive-profile.component.scss"],
})
export class ExecutiveProfileComponent implements OnInit {

  public Texts = Texts;

  profile: IOrganization = null;
  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly structureService: StructureService
  ) {}

  ngOnInit() {
    this.findInfo();
  }
  findInfo() {
    let id = this.route.snapshot.paramMap.get("id");

    if (id) {
      this.structureService.getProfileOrganizationById(id).subscribe(
        (profile) => {
          this.profile = profile;
        },
        () => {
          this.router.navigate(["/404"]);
        }
      );
    } else {
      this.router.navigate(["/404"]);
    }
  }
}
