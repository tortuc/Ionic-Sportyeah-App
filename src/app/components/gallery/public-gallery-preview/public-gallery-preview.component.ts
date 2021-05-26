import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { IonSlides, ModalController } from "@ionic/angular";
import { User } from "src/app/models/IUser";
import { GalleryService, IGalleryFile } from "src/app/service/gallery.service";
import { GallerySliderComponent } from "../gallery-slider/gallery-slider.component";

enum Texts {
  title = "gallery.public.preview_title",
  btn = "gallery.public.preview_btn",
  more = "gallery.private.more",
}

@Component({
  selector: "public-gallery-preview",
  templateUrl: "./public-gallery-preview.component.html",
  styleUrls: ["./public-gallery-preview.component.scss"],
})
export class PublicGalleryPreviewComponent implements OnInit {
  @Input() user: User;

  public readonly Texts = Texts;
  viewEntered: boolean = false;

  @ViewChild("slider") slider: IonSlides;
  constructor(
    private galleryService: GalleryService,
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
    this.galleryService.getById(this.user._id, 0).subscribe((gallery) => {
      this.gallery = gallery;
      if (this.gallery.length > 0) {
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
