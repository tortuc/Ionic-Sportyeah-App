import { Component, Input, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";

enum Texts {
  see = "gallery.options.see",
  delete = "gallery.options.delete",
  profile_picture = "gallery.options.profile",
  banner_picture = "gallery.options.banner",
  cancel = "cancel",
}

enum Formats {
  image = "image",
  video = "video",
  youtube = "youtube",
}

@Component({
  selector: "app-gallery-options",
  templateUrl: "./gallery-options.component.html",
  styleUrls: ["./gallery-options.component.scss"],
})
export class GalleryOptionsComponent implements OnInit {
  @Input() format: Formats;
  public readonly Texts = Texts;

  public readonly Formats = Formats;

  constructor(public readonly popover: PopoverController) {}

  options = [
    {
      icon: "eye-outline",
      text: Texts.see,
      action: "see",
    },
    {
      icon: "trash-bin-outline",
      text: Texts.delete,
      action: "delete",
    },
  ];

  ngOnInit() {
    if (this.format == Formats.image) {
      this.options = this.options.concat([
        {
          text: Texts.profile_picture,
          icon: "person-circle-outline",
          action: "profile_picture",
        },
        {
          text: Texts.banner_picture,
          icon: "image-outline",
          action: "banner_picture",
        },
      ]);
    }
  }

  option(o) {
    this.popover.dismiss(o);
  }
}
