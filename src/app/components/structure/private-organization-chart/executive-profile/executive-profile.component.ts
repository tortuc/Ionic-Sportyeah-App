import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/models/IUser";
import { IOrganization, IStructure } from "src/app/models/structure.model";
import { StructureService } from "src/app/service/structure.service";
import { UserService } from "src/app/service/user.service";

enum Texts {
  toolbar = "executive_profile.toolbar",
  from = "from",
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
    private readonly structureService: StructureService,
    private readonly userService: UserService
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

  goToStructure() {
    let user = (this.profile.structure as IStructure).user as User;
    if (user._id == this.userService.User?._id) {
      this.router.navigate(["/profile/structure/organization"]);
    } else {
      this.router.navigate([`/user/${user.username}/structure/organization`]);
    }
  }
}
