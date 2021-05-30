import { Component, Input, OnInit } from "@angular/core";
import { User } from "src/app/models/IUser";
import {
  IStructure,
  StructureService,
} from "src/app/service/structure.service";

enum Texts {
  title = "private_structure.preview.title",
}
@Component({
  selector: "public-structure-preview",
  templateUrl: "./public-structure-preview.component.html",
  styleUrls: ["./public-structure-preview.component.scss"],
})
export class PublicStructurePreviewComponent implements OnInit {
  @Input() user: User;

  public structure: IStructure = null;
  public readonly Texts = Texts;
  constructor(private readonly structureService: StructureService) {}

  ngOnInit() {
    this.structureService.getStructureByUser(this.user._id).subscribe(
      (structure) => {
        this.structure = structure;
      },
      () => {
        this.structure = null;
      }
    );
  }
}
