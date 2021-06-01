import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import {
  AlertController,
  LoadingController,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { take } from "rxjs/operators";
import { GalleryService, IGalleryFile } from "src/app/service/gallery.service";
import { UserService } from "src/app/service/user.service";
import { GalleryOptionsComponent } from "../gallery-options/gallery-options.component";
import { GallerySliderComponent } from "../gallery-slider/gallery-slider.component";

enum Options {
  see = "see",
  delete = "delete",
  profile = "profile_picture",
  banner = "banner_picture",
}

enum Texts {
  accept = "accept",
  cancel = "cancel",
  deleteHeader = "Eliminar archivo",
  deleteMessage = "Seguro que desea eliminar este archivo de su galeria?",
}

@Component({
  selector: "gallery-item",
  templateUrl: "./gallery-item.component.html",
  styleUrls: ["./gallery-item.component.scss"],
})
export class GalleryItemComponent implements OnInit {
  @Input() file: IGalleryFile;
  @Input() index: number;
  @Input() showOptions:boolean = true;

  constructor(
    private readonly popoverCtrl: PopoverController,
    public readonly userService: UserService,
    private translate: TranslateService,
    private loadingCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    private readonly galleryService: GalleryService,
    private readonly modalCtrl: ModalController,
    private readonly cd: ChangeDetectorRef
  ) {}

  @ViewChild("video") video: ElementRef<HTMLVideoElement>;

  private loading: HTMLIonLoadingElement;

  async ngOnInit() {
    this.loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
  }

  async delete() {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant(Texts.deleteHeader),
      message: this.translate.instant(Texts.deleteMessage),
      buttons: [
        {
          text: this.translate.instant(Texts.cancel),
          role: "cancel",
        },
        {
          text: this.translate.instant(Texts.accept),
          handler: () => {
            this.loading.present();
            this.galleryService.delete(this.file._id).subscribe(
              () => {
                this.loading.dismiss();
                this.file.deleted = true;
              },
              () => {
                this.loading.dismiss();
              }
            );
          },
        },
      ],
    });

    alert.present();
  }

  async options(event) {
    let popover = await this.popoverCtrl.create({
      component: GalleryOptionsComponent,
      componentProps: { format: this.file.format },
      event,
      showBackdrop: false,
    });
    popover.onDidDismiss().then((response) => {
      this.handleOption(response.data);
    });
    popover.present();
  }
  handleOption(data: Options) {
    switch (data) {
      case Options.see:
        this.seeFile();
        break;
      case Options.delete:
        this.delete();
        break;
      case Options.profile:
        this.profilePicture();
        break;
      case Options.banner:
        this.bannerPicture();
        break;

      default:
        break;
    }
  }

  bannerPicture() {
    this.loading.present();
    this.userService
      .update({ photoBanner: this.file.url })
      .pipe(take(1))
      .subscribe(
        (user) => {
          this.loading.dismiss();
          this.userService.User = user;
        },
        () => {
          this.loading.dismiss();
        }
      );
  }

  profilePicture() {
    this.loading.present();
    this.userService
      .update({ photo: this.file.url })
      .pipe(take(1))
      .subscribe(
        (user) => {
          this.loading.dismiss();
          this.userService.User = user;
        },
        () => {
          this.loading.dismiss();
        }
      );
  }

  @Output() see = new EventEmitter<number>();
  async seeFile() {
    this.cd.detectChanges();
    this.video?.nativeElement.pause()

    this.see.emit(this.index);
  }
}
