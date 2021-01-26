import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { IPost } from 'src/app/models/iPost';
import { EditPostPage } from 'src/app/profile/edit-post/edit-post.page';
import { OptionsPostPage } from 'src/app/profile/options-post/options-post.page';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import { ViewsProfileService } from "src/app/service/views-profile.service";

@Component({
  selector: 'header-post',
  templateUrl: './header-post.component.html',
  styleUrls: ['./header-post.component.scss'],
})
export class HeaderPostComponent implements OnInit {
  
  
  @Input() post:IPost

  @Output() getPost =  new EventEmitter()

  @Input() displayOptions:boolean = true

  @Output() deleted = new EventEmitter()

  constructor(
    public userService:UserService,
    private router:Router,
    private popoverController:PopoverController,
    private modalController:ModalController,
    private alertController:AlertController,
    private postService:PostService,
    private viewsProfileService: ViewsProfileService

  ) { }

  ngOnInit() {}

  goToProfile(id,username,post_id){
    
    if(id == this.userService.User._id){
      this.router.navigate(["/profile"])
    }else{
     
      this.userService.getUserByUsername(username)
      .subscribe(
        (resp:any)=>{
          this.viewsProfileService
            .updateProfileView(this.userService.User._id, resp.user._id,'post',`/post/${post_id}`)
            .subscribe((response) => {
              this.router.navigate([`/user/${username}`])
            });
        }
      )
      
    }
  }

  goToPost(id){
    this.router.navigate([`/post/${id}`])
  }
  
  options(data){
    switch (data?.action) {
      case 'delete':
        this.askDelete(data.post)
        break;
      case 'edit':
        this.edit(data.post)
        break;
    
      default:
        break;
    }
    
  }
async edit(post: any) {

const modal = await this.modalController.create({
  component: EditPostPage,
  cssClass: 'my-custom-class',
  componentProps:{
       post
  }
});
modal.onDidDismiss().then((data)=>{
  this.modalClose(data.data)
})
return await modal.present();
 
}  


async askDelete(post: IPost) {
let alert = await this.alertController.create({
  header:"Eliminar Publicacion",
  message:"Seguro que deseas eliminar esta publicacion?",
  buttons:[
    {
      text:"Cancelar"
    },
    {
      text:"Aceptar",
      handler:()=>{
        this.deletePost(post)
      }
    }
  ]
})
alert.present()
}


deletePost(post: IPost) {
this.postService.deleteOne(post._id).toPromise()
  .then(()=>{
    this.getPost.emit(true)
    this.deleted.emit(true)
  })
  .catch((err)=>{
    // handle the error
  })
}

async openOptions(ev:any){
const popover = await this.popoverController.create({
  component: OptionsPostPage,
  cssClass: 'my-custom-class',
  event: ev,
  translucent: true,
  componentProps:{post:this.post}
});
popover.onDidDismiss().then((data)=>{
  this.options(data.data)
})
return await popover.present();
}

modalClose(data){
  if(data.edited){
    this.getPost.emit(true)
  }
  
}
   


}
