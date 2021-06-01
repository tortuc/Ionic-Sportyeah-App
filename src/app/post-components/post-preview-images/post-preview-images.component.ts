import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { IFile } from "src/app/models/iPost";
import { PostPreviewImagesSliderComponent } from "../post-preview-images-slider/post-preview-images-slider.component";

@Component({
  selector: "post-preview-images",
  templateUrl: "./post-preview-images.component.html",
  styleUrls: ["./post-preview-images.component.scss"],
})
export class PostPreviewImagesComponent implements OnInit {
  @Input() loading = false;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private translate: TranslateService
  ) {}

  @Input() files: IFile[];
  @Output() filesChange = new EventEmitter();

  async removeFile(url) {
    let alert = await this.alertCtrl.create({
      header: this.translate.instant("remove_file.header"),
      message: this.translate.instant("remove_file.message"),
      buttons: [
        {
          text: this.translate.instant("cancel"),
        },
        {
          text: this.translate.instant("accept"),
          handler: () => {
            this.files = this.files.filter((x) => x.url != url);

            this.filesChange.emit(this.files);
          },
        },
      ],
    });
    alert.present()
  }
  ngOnInit() { 
  
  }

  async seeFiles() {
    let modal = await this.modalCtrl.create({
      component: PostPreviewImagesSliderComponent,
      componentProps: { files: this.files },
    });
    modal.present();
  }
}
