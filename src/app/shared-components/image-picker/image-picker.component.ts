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
    this.searching = true;
    this.pixabayService.minDimensions = this.minDimensions;
    this.lastQuery = "deportes";
    this.pixabayService.searchImages("deportes").then((resp: PixabayResp) => {
      this.images = resp.hits as PixabayImage[];
      this.page += 1;
      this.searching = false;
    });
  }

  searching = false;
  search(ev) {
    this.page = 1;
    this.selectedImage = null;
    this.searching = true;
    this.lastQuery = ev.detail.value;
    this.pixabayService
      .searchImages(ev.detail.value)
      .then((resp: PixabayResp) => {
        this.images = resp.hits as PixabayImage[];
        this.searching = false;
        this.page += 1;
      });
  }

  selectedImage: PixabayImage;
  selectImage(image: PixabayImage) {
    this.selectedImage = image;
  }

  page = 1; 
  lastQuery = "";
  loadMore() {
    this.searching = true;

    this.pixabayService
      .searchImages(this.lastQuery, this.page)
      .then((resp: PixabayResp) => {
        if (resp.hits.length > 0) {
          this.page += 1;

          this.images.push(...(resp.hits as PixabayImage[]));
          this.searching = false;
        } else {
          this.searching = false;
        }
      });
  }

  handleImage() {
    this.modalCtrl.dismiss({
      image: this.selectedImage,
    });
  }
}
