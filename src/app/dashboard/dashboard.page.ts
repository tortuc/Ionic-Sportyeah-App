import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LangsPage } from '../langs/langs.page';
import { ILike, IPost, IPostC } from '../models/iPost';
import { NewCommentComponent } from '../post/new-comment/new-comment.component';
import { LoginService } from '../service/login.service';
import { PostService } from '../service/post.service';
import { UserService } from '../service/user.service';
import { AddFriendsPage } from './add-friends/add-friends.page';
import { NewPostPage } from './new-post/new-post.page';
import { Plugins } from '@capacitor/core';
import { JdvimageService } from '../service/jdvimage.service';
const { Share } = Plugins;
interface ConnectionResp {
  code:Number
  msg:String
  connections:object[]
}

interface Connection {
  user:Object
  ip:String
  country:String
  city:String
  date:Date
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit,AfterViewInit {

  public loadingPost: boolean;
  constructor(
    public  toastController :   ToastController,
    public  translate       :   TranslateService,
    public  userService     :   UserService,
    public  modalController :   ModalController,
    public  postService     :   PostService,
    private loginService    :   LoginService,
    private popover         :   PopoverController,
    private router          :   Router,
    private actionSheetCtrl :   ActionSheetController,
    private alertCtrl :   AlertController,
    private imageService :   JdvimageService,
    public el:ElementRef
) {

  if(userService.User != undefined && userService.User.username != null){
    // captar el username
  }
  

 }





 ngAfterViewInit(){
   
 }

ngOnInit() {
// const event = fromEvent(document, 'backbutton');
// this.backbuttonSubscription = event.subscribe(async () => {
//   const modal = await this.modalController.getTop();
//   if (modal) {
//     modal.dismiss();
//   }
// });
}
ngOnDestroy() {
//  this.backbuttonSubscription.unsubscribe();
}
onScroll($event){
  
  
}


skipPost = 0



ionViewWillEnter() {
this.getPost()
        
  this.getConnections()
}

posts:IPostC[] = []

  getPost(event = null,newPosts = false) {
    if(newPosts){
      this.skipPost = 0
      this.posts = []
    }
    this.loadingPost = true
    this.postService.friendsPosts({friends_id:this.userService.followings_id,skip:this.skipPost})
      .toPromise()
      .then((posts:IPostC[])=>{   
        
        this.posts = this.posts.concat(posts)     
        this.skipPost += 10
        if(event){
          event.target.complete();
        }
        this.loadingPost = false
      })
      .catch((err)=>{
        
        this.loadingPost = false

        // handle error        
      })
  }


connections: Connection[] = []
getConnections(){
  this.loginService.connections().subscribe((connections)=>{
      
          this.connections = <Connection[]>connections
       
      
  })
}


  async showAlert(header,message){
  let alert = await this.alertCtrl.create(
      {
        header,
        message,
        buttons:[{text:this.translate.instant('okey')}]
      }
  )
  alert.present()
}

modalClose(data){
  if(data.data?.create){
    let post = data.data.post
    this.newPost(post)
   
    
  }else if(data.data?.video != null){
    this.uploadVideoPost(data.data.post,data.data.video)
   }
    

  
}

newPost(post){
  this.postService.getPost(post._id).toPromise()
  .then((post:IPostC)=>{
    this.posts.unshift(post)
  })
  .catch((err)=>{
    // handle err
  })
}

uploadVideoPost(post,video){
  this.showAlert(
    this.translate.instant('upload_video.uploading.header'),
    this.translate.instant('upload_video.uploading.message')
    )
  this.imageService.uploadVideo(video)
  .toPromise()
  .then((url)=>{
    post.video = url
    this.postService.create(post).toPromise()
      .then((post)=>{
        this.newPost(post)
        this.showAlert(
          this.translate.instant('upload_video.create.header'),
          this.translate.instant('upload_video.create.message')
          )         
         })
  })
  .catch((err)=>{
    this.showAlert(
      this.translate.instant('upload_video.error.header'),
      this.translate.instant('upload_video.error.message')
      )
  })
}

 
goToProfile(id,username){
  if(id == this.userService.User._id){
    this.router.navigate(["/profile"])
  }else{
    this.router.navigate([`/user/${username}`])

  }
}

goToMyProfile(){
  this.router.navigate(["/profile"])
}



async presentModal() {
  
  const modal = await this.modalController.create({
    component: NewPostPage,
    cssClass: 'my-custom-class',
    backdropDismiss:false
  });
  modal.onDidDismiss().then((data)=>{
    this.modalClose(data)
  })
  return await modal.present();
}

  async searchFriend(){
  let modal = await this.modalController.create({
    component: AddFriendsPage,
    cssClass: 'my-custom-class'
  });
 
  return await modal.present();
}

async langs(ev){
  let langs = await this.popover.create({
    component: LangsPage,
    translucent: true,
    event:ev

  })

  langs.present()
}



goToPost(id){
  this.router.navigate([`/post/${id}`])
}




async logScrolling(ev){
 let el = await ev.target.getScrollElement()
  if((el.scrollHeight - el.scrollTop < el.clientHeight + 400) && !this.loadingPost){
    this.getPost()
  }
  
  
}



}
