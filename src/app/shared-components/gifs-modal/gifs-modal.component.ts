import { Component, OnInit } from "@angular/core";

import { GiphyFetch } from "@giphy/js-fetch-api";
import { ModalController } from "@ionic/angular";
const gf = new GiphyFetch("kUPuk7CSdbLGEEoJiITdrT6Msc8jSj7r");

@Component({
  selector: "app-gifs-modal",
  templateUrl: "./gifs-modal.component.html",
  styleUrls: ["./gifs-modal.component.scss"],
})
export class GifsModalComponent implements OnInit {
  offset: number = 0;
  gifs: any[] = [];

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {
    this.findGifs();
  }

  loading = false;
  findGifs() {
    if (!this.loading) {
      this.loading = true;
      gf.trending({ offset: this.offset, limit: 30 })
        .then((gifs) => {
          this.loading = false;
          this.gifs = this.gifs.concat(gifs.data);
          this.offset += 30;
          console.log(this.gifs);
        })
        .catch((e) => {
          this.loading = false;
        });
    }
  }

  selected(id) {
    let url = `https://media.giphy.com/media/${id}/giphy.gif`;
    this.modalCtrl.dismiss({ url });
  }

  lastHeight = 0;
  /**
   * Esta funcion se llama cuando el usuario baja el scroll, y si llega muy abajo, entonces se llaman mas posts automaticamente
   * @param ev
   */
  async logScrolling(ev) {
    let el = await ev.target.getScrollElement();
    let { scrollHeight, scrollTop, clientHeight } = el;


    if (
      scrollHeight - scrollTop < clientHeight + 400 &&
      scrollHeight > this.lastHeight + 2500
    ) {
      this.lastHeight = scrollHeight;
      this.findGifs();
    }
  }
}
