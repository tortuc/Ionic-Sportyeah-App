import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LandingService } from 'src/app/service/landingService';
import { ModalController } from '@ionic/angular';
import { ImgVideoUpload } from 'src/app/service/reusable-img-video-logic.service';
import { take } from 'rxjs/operators';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  form: FormGroup = null;
  constructor(
    private fb: FormBuilder,
    public translate: TranslateService,
    public landingService : LandingService,
    public ls : LandingService,
    public mc : ModalController,
    public img: ImgVideoUpload
  ) { this.generateForm() }
  generateForm() {
    this.form = this.fb.group({
      photo: [`https://trello-attachments.s3.amazonaws.com/5ff9d47572424648014190dc/700x422/29f3e5ed0cea0a6b7439bfb986a090cd/original.jpg`],
      title: ['',Validators.required],
      subtitle: ['',Validators.required],
      url: ['',Validators.required]
    });
  }
  ngOnInit() {}
  change(){
    this.img.takeOnlyPhoto();
    this.img.content.pipe(take(1)).subscribe((img:string)=>{
      this.form.controls.photo.setValue(img);    
    });
  }
  save(){
    this.ls.ls.products.push(this.form.value)
    this.ls.edit(this.ls.ls);
    this.mc.dismiss();
  }
}
