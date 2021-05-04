import { Component, Input, OnInit } from "@angular/core";
import { IPostFile } from "src/app/models/iPost";
import { WishService } from "src/app/service/wish.service";

@Component({
  selector: "attach-link-preview-post",
  templateUrl: "./attach-link-preview-post.component.html",
  styleUrls: ["./attach-link-preview-post.component.scss"],
})
export class AttachLinkPreviewPostComponent implements OnInit {
  @Input() file: any;
  @Input() class: string;
  constructor(private wishService: WishService) {}

  ngOnInit() {
    this.previewUrl();
  }

  preview = null;

  previewUrl() {
    try {
      let string: string = this.file.url;
      let match = string.match(
        /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g
      );
      if (match) {
        this.wishService
          .pageInfo(match[0])
          .toPromise()
          .then((info) => {
            this.preview = info;
          })
          .catch((err) => {
            this.preview = null;
          });
      } else {
        this.preview = null;
      }
    } catch (error) {
      // nothing to do
    }
  }

  goToLink(url) {
    url = url.replace("https://", "").replace("http://", "");

    window.open("//" + url, "_blank").focus();
  }
}
