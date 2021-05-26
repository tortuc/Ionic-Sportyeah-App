import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { User } from "src/app/models/IUser";
import { GalleryService, IGalleryFile } from "src/app/service/gallery.service";
import { UserService } from "src/app/service/user.service";
import { GallerySliderComponent } from "../gallery-slider/gallery-slider.component";
enum Texts {
  actionYoutube = "gallery.content.youtube",
  title = "gallery.public.title",
  allContent = "gallery.allContent",
  loading = "gallery.loading",
}
@Component({
  selector: "app-public-gallery",
  templateUrl: "./public-gallery.component.html",
  styleUrls: ["./public-gallery.component.scss"],
})
export class PublicGalleryComponent implements OnInit {
  public user: User = null;
  loadingFiles: boolean = false;
  allContent: boolean = false;

  constructor(
    private readonly galleryService: GalleryService,
    public readonly userService: UserService,
    private readonly modalCtrl: ModalController,
    private cd: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public readonly Texts = Texts;

  public loadingUser = true;
  ngOnInit() {
    this.userService
      .getUserByUsername(this.route.snapshot.paramMap.get("username"))
      .pipe(take(1))
      .subscribe(
        (resp: any) => {
          this.loadingUser = false;
          this.user = resp.user;
          this.getGallery();
        },
        () => {
          this.router.navigate(["/dashboard"]);
        }
      );

  
  }

  public gallery: IGalleryFile[] = [];
  private skip: number = 0;
  getGallery() {
    this.loadingFiles = true;
    this.galleryService.getById(this.user._id, this.skip).subscribe(
      (gallery) => {
        this.skip += 20;
        this.gallery = this.gallery.concat(gallery);
        this.loadingFiles = false;
        if (gallery.length < 20) {
          this.allContent = true;
        }
      },
      () => {
        this.loadingFiles = false;
      }
    );
  }

  async seeFiles(index) {
    let modal = await this.modalCtrl.create({
      component: GallerySliderComponent,
      componentProps: { files: this.gallery, index },
    });
    modal.present();
  }

  /**
   * Esta funcion se llama cuando el usuario baja el scroll, y si llega muy abajo, entonces se llaman mas posts automaticamente
   * @param ev
   */
  async logScrolling(ev) {
    let el = await ev.target.getScrollElement();
    this.cd.detectChanges();

    if (
      el.scrollHeight - el.scrollTop < el.clientHeight + 400 &&
      !this.loadingFiles
    ) {
      this.getGallery();
    }
  }
}
