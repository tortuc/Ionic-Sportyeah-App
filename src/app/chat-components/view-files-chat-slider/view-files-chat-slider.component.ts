import { Component, Input, OnInit } from "@angular/core";
import { ModalController, Platform } from "@ionic/angular";
import { IPostFile } from "src/app/models/iPost";

@Component({
  selector: "app-view-files-chat-slider",
  templateUrl: "./view-files-chat-slider.component.html",
  styleUrls: ["./view-files-chat-slider.component.scss"],
})
export class ViewFilesChatSliderComponent implements OnInit {
  @Input() files: IPostFile[] = [];
  viewEntered: boolean = false;

  constructor(public modalCtrl: ModalController, public platform: Platform) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalCtrl.dismiss();
    });
  }

  ngOnInit() {}

  download(file) {
    window.location.href = file.url;
  }

  ionViewDidEnter() {
    this.viewEntered = true;
  }
}
