import { take } from "rxjs/operators";
import { ImgVideoUpload } from "./../../service/reusable-img-video-logic.service";
import { ModalController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-sponsors",
  templateUrl: "./sponsors.component.html",
  styleUrls: ["./sponsors.component.scss"],
})
export class SponsorsComponent implements OnInit {
  @Input() data: any;
  public editing: boolean = false;
  public photo: string = `https://www.pngitem.com/pimgs/m/471-4714557_insert-your-logo-here-hd-png-download.png`;
  public form: FormGroup = this.fb.group({
    url: ["", Validators.required],
  });

  constructor(
    public fb: FormBuilder,
    public mc: ModalController,
    public img: ImgVideoUpload
  ) {}

  ngOnInit() {
    if (this.data) {
      this.editing = true;
      this.form.controls.url.setValue(this.data.url);
      this.photo = this.data.photo;
    }
  }

  changePhoto() {
    this.img.takeOnlyPhoto();
    this.img.content.pipe(take(1)).subscribe((r: string) => (this.photo = r));
  }

  save() {
    this.form.value.photo = this.photo;
    this.mc.dismiss(this.form.value);
  }

  close(){
    this.mc.dismiss();
  }
}
