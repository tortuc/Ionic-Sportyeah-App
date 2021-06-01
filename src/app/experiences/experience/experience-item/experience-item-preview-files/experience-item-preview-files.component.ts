import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ModalController } from "@ionic/angular";
import { interval, Subscription, timer } from "rxjs";
import { IFile } from "src/app/models/iPost";
import { ExperienceFilesSliderComponent } from "../experience-files-slider/experience-files-slider.component";

@Component({
  selector: "experience-item-preview-files",
  templateUrl: "./experience-item-preview-files.component.html",
  styleUrls: ["./experience-item-preview-files.component.scss"],
})
export class ExperienceItemPreviewFilesComponent implements OnInit, OnDestroy {
  @Input() files: IFile[] = [];
  interval: Subscription;
  @ViewChild("content") content: ElementRef;
  constructor(
    private readonly modalCtrl: ModalController,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.rotateFiles();
  }

  rotateFiles() {
    if (this.files.length >= 2) {
      this.cd.detectChanges();
      this.interval = interval(4000).subscribe((x) => {
        this.files.push(this.files.shift());

        this.content.nativeElement.classList.add("fade-in");
        timer(1000).subscribe(() => {
          this.content.nativeElement.classList.remove("fade-in");
        });
      });
    }
  }

  ngOnDestroy() {
    this.interval?.unsubscribe();
  }

  async openSlider() {
    this.interval?.unsubscribe();
    let modal = await this.modalCtrl.create({
      component: ExperienceFilesSliderComponent,
      componentProps: { files: this.files },
    });
    modal.onDidDismiss().then(() => {
      this.rotateFiles();
    });
    modal.present();
  }
}
