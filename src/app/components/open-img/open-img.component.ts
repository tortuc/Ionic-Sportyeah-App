import { ModalController } from "@ionic/angular";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-open-img",
  templateUrl: "./open-img.component.html",
  styleUrls: ["./open-img.component.scss"],
})
export class OpenImgComponent implements OnInit {
  @Input() img: string;

  constructor(public mc: ModalController) {}

  ngOnInit() {}
}
