import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
  PixabayService,
  PixabayResp,
  PixabayImage,
} from "../../service/pixabay.service";
import { ModalController, Platform } from "@ionic/angular";

@Component({
  selector: "app-image-picker",
  templateUrl: "./image-picker.component.html",
  styleUrls: ["./image-picker.component.scss"],
})
export class ImagePickerComponent implements OnInit {
  images: PixabayImage[] = [];
  @ViewChild("content") private content: any;
  @Input() minDimensions: [number, number] = [0, 0];

  @Input() type: string;

  constructor(
    private pixabayService: PixabayService,
    public modalCtrl: ModalController,
    private platform: Platform
  ) {
    platform.backButton.subscribeWithPriority(10, () => {
      this.modalCtrl.dismiss();
    });
  }

  ngOnInit() {
    this.pixabayService.minDimensions = this.minDimensions;
    let search = "";
    if (this.type) {
      search = this.type.split("_").join(" ");
    }
    this.pixabayService.searchImages(search).then((resp: PixabayResp) => {
      this.images = resp.hits as PixabayImage[];

      this.searching = false;
    });
  }

  searching = false;
  search(ev) {
    this.selectedImage = null;
    this.searching = true;
    this.lastQuery = ev.detail.value;
    this.pixabayService
      .searchImages(ev.detail.value)
      .then((resp: PixabayResp) => {
        this.images = resp.hits as PixabayImage[];
        this.searching = false;

        if (resp.hits.length != this.pixabayService.maxImagesPerResp) {
          this.noMoreImages = true;
        } else {
          this.noMoreImages = false;
        }
      });
  }

  selectedImage: PixabayImage;
  selectImage(image: PixabayImage) {
    this.selectedImage = image;
  }

  page = 1;
  lastQuery = "";
  noMoreImages = false;
  loadMore() {
    this.searching = true;
    this.page = this.page + 1;

    this.pixabayService
      .searchImages(this.lastQuery, this.page)
      .then((resp: PixabayResp) => {
        if (resp.hits.length > 0) {
          this.images.push(...(resp.hits as PixabayImage[]));
          this.searching = false;
          this.content.scrollByPoint(0, 300, 500);
        } else {
          this.searching = false;
          this.noMoreImages = true;
        }
      });
  }

  handleImage() {
    this.modalCtrl.dismiss({
      image: this.selectedImage,
    });
  }
}
