import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IFile } from "src/app/models/iPost";

@Component({
  selector: "preview-files-chat",
  templateUrl: "./preview-files-chat.component.html",
  styleUrls: ["./preview-files-chat.component.scss"],
})
export class PreviewFilesChatComponent implements OnInit {
  @Input() files: IFile[] = [];
  @Output() filesChange = new EventEmitter<IFile[]>();

  constructor() {}

  ngOnInit() {}

  close(url) {
    this.files = this.files.filter((x) => x.url != url);
    this.filesChange.emit(this.files);
  }
}
