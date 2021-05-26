import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { IonSlides, ModalController } from "@ionic/angular";
import { GalleryService, IGalleryFile } from "src/app/service/gallery.service";
import { UserService } from "src/app/service/user.service";
import { GallerySliderComponent } from "../gallery-slider/gallery-slider.component";

enum Texts {
  title = "gallery.private.title",
  btn = "gallery.private.btn",
  more = "gallery.private.more"
}

@Component({
  selector: "private-gallery-preview",
  templateUrl: "./private-gallery-preview.component.html",
  styleUrls: ["./private-gallery-preview.component.scss"],
})
export class PrivateGalleryPreviewComponent implements OnInit, AfterViewInit {

  public readonly Texts = Texts;
  viewEntered: boolean = false;

  @ViewChild("slider") slider: IonSlides;
  constructor(
    private galleryService: GalleryService,
    private readonly userService: UserService,
    private readonly modalCtrl: ModalController,
    private cd: ChangeDetectorRef
  ) {}

  gallery: IGalleryFile[] = [];

  ngOnInit() {
    this.getGallery();
  }

  public reload() {
    this.getGallery();
  }

  getGallery() {
    this.galleryService
      .getById(this.userService.User._id, 0)
      .subscribe((gallery) => {
        this.gallery = gallery;
        if (this.gallery.length == 0) {
          this.gallery.push({
            url: "https://files.sportyeah.com/v1/image/get/1620692250035.jpeg",
            format: "image",
            user:this.userService.User
          });
        } else {
          this.cd.detectChanges();
          this.slider.startAutoplay();
        }
      });
  }

  ngAfterViewInit() {
    this.viewEntered = true;
  }

  async open(index) {
    let modal = await this.modalCtrl.create({
      component: GallerySliderComponent,
      componentProps: { files: this.gallery, index },
    });
    modal.present();
  }
}
