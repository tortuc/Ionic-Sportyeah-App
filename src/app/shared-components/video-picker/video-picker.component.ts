import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ModalController, Platform } from "@ionic/angular";
import {
  PixabayVideo,
  PixabayResp,
  PixabayService,
} from "../../service/pixabay.service";

@Component({
  selector: "app-video-picker",
  templateUrl: "./video-picker.component.html",
  styleUrls: ["./video-picker.component.scss"],
})
export class VideoPickerComponent implements OnInit {
  videos: PixabayVideo[] = [];
  @ViewChild("content") private content: any;
  @Input() minDimensions: [number, number] = [0, 0];
  constructor(
    private pixabayService: PixabayService,
    public modalCtrl: ModalController,
    public platform: Platform
  ) {
    platform.backButton.subscribeWithPriority(10, () => {
      this.modalCtrl.dismiss();
    });
  }

  ngOnInit() {
    this.pixabayService.searchVideos("").then((resp: PixabayResp) => {
      this.videos = resp.hits as PixabayVideo[];
      this.searching = false;
    });
  }

  searching = false;
  search(ev) {
    this.selectedVideo = null;
    this.searching = true;
    this.lastQuery = ev.detail.value;
    this.pixabayService
      .searchVideos(ev.detail.value)
      .then((resp: PixabayResp) => {
        this.videos = resp.hits as PixabayVideo[];
        this.searching = false;
      });
  }

  selectedVideo: PixabayVideo;
  selectVideo(video: PixabayVideo) {
    this.selectedVideo = video;
  }

  page = 1;
  lastQuery = "";
  noMoreVideos = false;
  loadMore() {
    this.searching = true;
    this.page = this.page + 1;

    this.pixabayService
      .searchVideos(this.lastQuery, this.page)
      .then((resp: PixabayResp) => {
        if (resp.hits.length > 0) {
          this.videos.push(...(resp.hits as PixabayVideo[]));
          this.searching = false;
          this.content.scrollByPoint(0, 300, 500);
        } else {
          this.searching = false;
          this.noMoreVideos = true;
        }
      });
  }

  handleVideo() {
    this.modalCtrl.dismiss({
      video: this.selectedVideo,
    });
  }
}
