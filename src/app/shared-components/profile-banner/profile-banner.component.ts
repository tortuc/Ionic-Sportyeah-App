import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ModalController, PopoverController } from "@ionic/angular";
import { User } from "src/app/models/IUser";
import { JdvimageService } from "src/app/service/jdvimage.service";
import { UserService } from "src/app/service/user.service";
import { ImagePickerComponent } from "../image-picker/image-picker.component";
import { ProfileBannerOptionsComponent } from "../profile-banner-options/profile-banner-options.component";
import { SeeProfileBannerComponent } from "../see-profile-banner/see-profile-banner.component";

@Component({
  selector: "profile-banner",
  templateUrl: "./profile-banner.component.html",
  styleUrls: ["./profile-banner.component.scss"],
})
export class ProfileBannerComponent implements OnInit {
  @Input() user: User;
  @Input() editable: boolean = false;
  @ViewChild("openImage") openImage: ElementRef;
  constructor(
    private popover: PopoverController,
    private modal: ModalController,
    private fileService: JdvimageService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  async options(ev) {
    let popover = await this.popover.create({
      component: ProfileBannerOptionsComponent,
      event: ev,
      showBackdrop: false,
    });
    popover.onDidDismiss().then((resp) => {
      this.handleOptions(resp.data);
    });
    popover.present();
  }
  handleOptions(option: string) {
    switch (option) {
      case "see":
        this.see();
        break;
      case "online":
        this.freeImage();
        break;
      case "upload":
        this.openImage.nativeElement.click();
        break;

      default:
        break;
    }
  }

  async freeImage() {
    let modal = await this.modal.create({
      component: ImagePickerComponent,
    });

    modal.onDidDismiss().then((data: any) => {
      if (data.data != undefined && "image" in data.data) {
        this.fileService
          .uploadImageFromUrl(data.data.image.largeImageURL, true)
          .then((url: string) => {
            this.userService.update({ photoBanner: url }).subscribe(() => {
              this.userService.User.photoBanner = url;
              this.user.photoBanner = url;
            });
          });
      }
    });

    return await modal.present();
  }

  async see() {
    let modal = await this.modal.create({
      component: SeeProfileBannerComponent,
      componentProps: { user: this.user,photo:this.user.photoBanner },
    });
    modal.present();
  }

  uploadImage(event) {
    let formData = new FormData();
    formData.append("image", event.target.files[0]);
    this.fileService.uploadImageProgress(formData).then((url: string) => {
      this.userService.update({ photoBanner: url }).subscribe(() => {
        this.userService.User.photoBanner = url;
        this.user.photoBanner = url;
      });
    });
  }
}
