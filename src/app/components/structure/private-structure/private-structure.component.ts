import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  IStructure,
  StructureService,
} from "src/app/service/structure.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-private-structure",
  templateUrl: "./private-structure.component.html",
  styleUrls: ["./private-structure.component.scss"],
})
export class PrivateStructureComponent implements OnInit {
  constructor(
    private readonly structureService: StructureService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.getStructure();
  }

  public structure: IStructure = null;

  getStructure() {
    const { _id } = this.userService.User;
    this.structureService.getStructureByUser(_id).subscribe(
      (structure) => {
        this.structure = structure;
        console.log(structure);
      },
      () => {
        this.router.navigate(["/"]);
      }
    );
  }
}
