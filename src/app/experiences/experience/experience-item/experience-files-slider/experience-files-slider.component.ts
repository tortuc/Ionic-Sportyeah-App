import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { IFile } from "src/app/models/iPost";

@Component({
  selector: "app-experience-files-slider",
  templateUrl: "./experience-files-slider.component.html",
  styleUrls: ["./experience-files-slider.component.scss"],
})
export class ExperienceFilesSliderComponent implements OnInit {
  @Input() files: IFile[] = [];
  viewEntered: boolean = false;
  constructor(public readonly modalCtrl: ModalController) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.viewEntered = true;
  }
}
