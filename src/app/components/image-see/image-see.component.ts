import { take } from "rxjs/operators";
import { FreeImgService } from "./../../service/freeImg.service";
import { ModalController } from "@ionic/angular";
import { Component, Input, OnInit } from "@angular/core";
import { IResponsePixabay } from "src/app/service/freeImg.service"

@Component({
  selector: "app-image-see",
  templateUrl: "./image-see.component.html",
  styleUrls: ["./image-see.component.scss"],
})
export class ImageSeeComponent implements OnInit {
  @Input() data: any;
  search: string = "";
  constructor(
    public modalCtrl: ModalController,
    public freeImg: FreeImgService
  ) {}

  ngOnInit() {}

  onsearch() {
    console.log(this.search);
    this.freeImg
      .getSearch(this.search)
      .pipe(take(1))
      .subscribe((r:IResponsePixabay) => {
        console.log(r);
        this.data = r.hits
      });
  }

  send(url: any) {
    // this.img.content.next(url.webformatURL);
    this.modalCtrl.dismiss(url.webformatURL);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
