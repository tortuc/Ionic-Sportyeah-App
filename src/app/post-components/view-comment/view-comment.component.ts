import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IComment } from 'src/app/models/iPost';
import { UserService } from 'src/app/service/user.service';
import { SeeFilesPostSliderComponent } from '../see-files-post-slider/see-files-post-slider.component';

@Component({
  selector: 'view-comment',
  templateUrl: './view-comment.component.html',
  styleUrls: ['./view-comment.component.scss'],
})
export class ViewCommentComponent implements OnInit {

  @Input() comment:IComment

  constructor(
    public userService:UserService,
    public modalCtrl:ModalController
  ) { }

  ngOnInit() {
    console.log(this.comment);
    
  }

  

  async openImg() {
    let modal = await this.modalCtrl.create({
      component: SeeFilesPostSliderComponent,
      componentProps: { files: this.comment.files },
    });
    modal.present();
  }


}
