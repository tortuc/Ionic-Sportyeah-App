import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ISponsorInfo } from "src/app/models/ISponsor";
import {  FilesService } from "src/app/service/files.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-customize-sponsor",
  templateUrl: "./customize-sponsor.component.html",
  styleUrls: ["./customize-sponsor.component.scss"],
})
export class CustomizeSponsorComponent implements OnInit {
  constructor(
    public modalCtrl: ModalController,
    private readonly userService: UserService,
    private readonly fileService:FilesService
  ) {}

  copy_info: ISponsorInfo = null;
  upload_option: 'miniature' | 'profile' = 'miniature'

  ngOnInit() {
    this.copy_info = this.userService.User.sponsor_info;
    console.log(this.copy_info);
    
  }

  uploadFile(event){
    let form = new FormData()
    form.append('image',event.target.files[0])
    this.fileService.uploadImageProgress(form).then((url)=>{
      console.log(url);
      
    })
  }
}
