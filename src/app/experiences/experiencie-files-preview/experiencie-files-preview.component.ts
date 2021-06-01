import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IFile } from "src/app/models/iPost";

@Component({
  selector: "experiencie-files-preview",
  templateUrl: "./experiencie-files-preview.component.html",
  styleUrls: ["./experiencie-files-preview.component.scss"],
})
export class ExperiencieFilesPreviewComponent implements OnInit {
  @Input() files: IFile[];
  @Output() filesChange = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  remove(index) {
    this.files.splice(index, index == 0 ? 1 : index);

    this.filesChange.emit(this.files);
  }
}
