import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { IonSlides, ModalController } from "@ionic/angular";
import { IGalleryFile } from "src/app/service/gallery.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-gallery-slider",
  templateUrl: "./gallery-slider.component.html",
  styleUrls: ["./gallery-slider.component.scss"],
})
export class GallerySliderComponent implements OnInit {
  @Input() files: IGalleryFile[] = [];
  @Input() index: number = 0;
  viewEntered: boolean = false;
  @ViewChild("slider") slider: IonSlides;
  constructor(
    public readonly modalCtrl: ModalController,
    private readonly cd: ChangeDetectorRef,
    public readonly userService: UserService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.viewEntered = true;
    this.cd.detectChanges();
    this.slider.slideTo(this.index);
  }
}
