import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ModalController, PopoverController } from "@ionic/angular";
import { User } from "src/app/models/IUser";
import { AvatarComponent } from "src/app/profile/profile-edit/avatar/avatar.component";
import { FilesService } from "src/app/service/files.service";
import { UserService } from "src/app/service/user.service";
import { ProfilePhotoOptionsComponent } from "../profile-photo-options/profile-photo-options.component";
import { SeeProfileBannerComponent } from "../see-profile-banner/see-profile-banner.component";

@Component({
  selector: "profile-photo",
  templateUrl: "./profile-photo.component.html",
  styleUrls: ["./profile-photo.component.scss"],
})
export class ProfilePhotoComponent implements OnInit {
  @ViewChild("openImage") openImage: ElementRef;

  constructor(
    public userService: UserService,
    public modal: ModalController,
    public popover: PopoverController,
    public fileService: FilesService
  ) {}


  @Input() user:User;
  @Input() editable: boolean = false;

  ngOnInit() {}

  async see() {
    let modal = await this.modal.create({
      component: SeeProfileBannerComponent,
      componentProps: {
        user: this.user,
        photo: this.user.photo,
      },
    });
    modal.present();
  }

  async options(event) {
    let popover = await this.popover.create({
      component: ProfilePhotoOptionsComponent,
      showBackdrop: false,
      event,
    });
    popover.onDidDismiss().then((response) => {
      this.handleOptions(response.data);
    });
    popover.present();
  }
  handleOptions(data: any) {
    switch (data) {
      case "see":
        this.see();
        break;
      case "avatar":
        this.chooseAvatar();
        break;
      case "upload":
        this.openImage.nativeElement.click();
        break;
      case "camera":
        this.camera()
        break;
      default:
        break;
    }
  }


  camera() {
   this.fileService.takePhoto().then((file)=>{
     this.userService.update({photo:file.url}).subscribe(()=>{
       this.userService.User.photo = file.url
       this.user.photo = file.url
     })
   })
  }

  async chooseAvatar() {
    let modal = await this.modal.create({
      component: AvatarComponent,
    });

    return modal.present();
  }

  uploadImage(event) {
    let formData = new FormData();
    formData.append("image", event.target.files[0]);
    this.fileService.uploadImageProgress(formData).then((url: string) => {
      this.userService.update({ photo: url }).subscribe(() => {
        this.userService.User.photo = url;
        this.user.photo = url
      });
    });
  }
}
