import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ImageComponent } from '../chat/image/image.component';
import { AddFriendsPage } from '../dashboard/add-friends/add-friends.page';
import { NewPostPage } from '../dashboard/new-post/new-post.page';
import { ILike } from '../models/iPost';
import { PostService } from '../service/post.service';
import { UserService } from '../service/user.service';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { Plugins } from '@capacitor/core';
import { LikesPostComponent } from '../components/likes-post/likes-post.component';
import { ViewsProfileService } from "src/app/service/views-profile.service";

const { Share } = Plugins;


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  constructor(
    public userService:UserService,
    private router:Router,
    private route:ActivatedRoute,
    private postService:PostService,
    private modalController:ModalController,
    private toastController:ToastController,
    private translate:TranslateService,
    private modalCtrl:ModalController,
    private actionSheetCtrl:ActionSheetController,
    private viewsProfileService: ViewsProfileService

    ){
     this.getPost(route.snapshot.paramMap.get('id'))
  }

  goBack(){
    this.router.navigate(['/dashboard'])
  }
  getPost(id){
    this.postService.getPost(id).toPromise()
    .then((post)=>{
      this.item = post
    })
    .catch((err)=>{
      // handle err
      
      this.item = 404
    })
  }
  ngOnInit() {}

  item = null


  
  goToPost(id){
    this.router.navigate([`/post/${id}`])
  }
  

    async openImg(msg){
   
      let modal = await this.modalCtrl.create({
        component:ImageComponent,
        componentProps:{msg}
      })
   
      return modal.present()
   
    }

    goToProfile(id,username){
      if(id == this.userService.User._id){
        this.router.navigate(["/profile"])
      }else{
        //this.router.navigate([`/user/${username}`])
        this.userService.getUserByUsername(username)
        .subscribe(
          (resp:any)=>{
            this.viewsProfileService
              .updateProfileView(this.userService.User._id, resp.user._id,'comment',`/post/${this.item.post._id}`)
              .subscribe((response) => {
                this.router.navigate([`/user/${username}`])
              });
          }
        )
      }
    }
    
    goToMyProfile(){
      this.router.navigate(["/profile"])
    }

    async searchFriend(){
      let modal = await this.modalController.create({
        component: AddFriendsPage,
        cssClass: 'my-custom-class'
      });
      modal.onDidDismiss().then((data)=>{
      })
      return await modal.present();
    }



  comments($event){
    this.item.comments = $event
  }


}
