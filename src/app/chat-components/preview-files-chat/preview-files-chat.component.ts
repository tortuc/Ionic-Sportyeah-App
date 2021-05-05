import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { IPostFile } from "src/app/models/iPost";

@Component({
  selector: "preview-files-chat",
  templateUrl: "./preview-files-chat.component.html",
  styleUrls: ["./preview-files-chat.component.scss"],
})
export class PreviewFilesChatComponent implements OnInit {
  @Input() files: IPostFile[] = [];
  @Output() filesChange = new EventEmitter<IPostFile[]>();

  constructor() {}

  ngOnInit() {}

  close(url) {
    this.files = this.files.filter((x) => x.url != url);
    this.filesChange.emit(this.files);
  }
}
