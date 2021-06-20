import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { sports } from "src/config/base";

@Component({
  selector: "app-sport-select",
  templateUrl: "./sport-select.component.html",
  styleUrls: ["./sport-select.component.scss"],
})
export class SportSelectComponent implements OnInit {
  constructor(public readonly modalCtrl: ModalController) {}

  ngOnInit() {}

  public readonly sports = sports;

  option(sport) {
    this.modalCtrl.dismiss(sport);
  }
}
