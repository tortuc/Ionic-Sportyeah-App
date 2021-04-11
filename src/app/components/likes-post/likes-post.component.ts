import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/service/user.service';
import { ViewsProfileService } from "src/app/service/views-profile.service";

@Component({
  selector: 'likes-post',
  templateUrl: './likes-post.component.html',
  styleUrls: ['./likes-post.component.scss'],
})
export class LikesPostComponent implements OnInit {
  @Input() likes: any[]
  @Input() likE: any[]
  @Input() love: any[]
  @Input() haha: any[]
  @Input() wow: any[]
  @Input() sad: any[]
  @Input() angry: any[]
  @Input() idPost: string
  @Input() idNews: string
  constructor(
    public userService:UserService,
    public router:Router,
    private modalCtrl:ModalController,
    private viewsProfileService: ViewsProfileService

  ) { }

  ngOnInit() {
  
    
  }

  segment = 0;
  goToProfile(id,username){
    if(id == this.userService.User._id){
      this.router.navigate(["/profile"])
    }else{
      this.userService.getUserByUsername(username)
      .subscribe(
        (resp:any)=>{
          this.viewsProfileService
          .createProfileView(
            { user:resp.user._id,
             visitor:this.userService.User._id,
             from:"reaction",
             link: `/post/${this.idPost}`
           }
           )
            .subscribe((response) => {
              this.router.navigate([`/user/${username}`])
            });
        }
      )
  
    }
    this.modalCtrl.dismiss({dismiss:true})
  }

  dismiss(){
    this.modalCtrl.dismiss({dismiss:true})

  }

}
