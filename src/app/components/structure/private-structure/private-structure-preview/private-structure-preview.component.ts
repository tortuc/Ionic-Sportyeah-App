import { Component, OnInit } from "@angular/core";
import {
  IStructure,
  StructureService,
} from "src/app/service/structure.service";

enum Texts {
  title = "private_structure.preview.title",
  edit = "private_structure.preview.edit",
}
@Component({
  selector: "private-structure-preview",
  templateUrl: "./private-structure-preview.component.html",
  styleUrls: ["./private-structure-preview.component.scss"],
})
export class PrivateStructurePreviewComponent implements OnInit {
  public structure: IStructure = null;
  public readonly Texts = Texts;
  constructor(private readonly structureService: StructureService) {}

  ngOnInit() {
    this.structureService
      .verifyMyStructure()
      .then(() => {
        this.structure = this.structureService.myStructure;
      })
      .catch(() => {
        this.structure = null;
      });
  }
}
