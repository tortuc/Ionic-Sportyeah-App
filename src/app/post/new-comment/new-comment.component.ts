import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MentionsDirective } from 'src/app/directives/mentions.directive';
import { IPost } from 'src/app/models/iPost';
import { JdvimageService } from 'src/app/service/jdvimage.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss'],
})
export class NewCommentComponent implements OnInit {
  @Input() post:IPost
  @ViewChild(MentionsDirective) mentions

  constructor(
    private modalCtrl:ModalController,
    public userService:UserService,
    public fb:FormBuilder,
    private loadingCtrl:LoadingController,
    private translate:TranslateService,
    private imageService:JdvimageService,
    private postService:PostService
  ) { }


  form = this.fb.group({
      message:['',[]],
      image:['',[]],

  })


  ngOnInit() {}

  addEmoji(ev){
    this.form.controls.message.setValue(
      this.form.controls.message.value + ev.emoji.native
      
    )
  }


  emoji = false

  openEmojis(){
    this.emoji = !this.emoji
  }

  send(){
    if(this.form.value.message != null || this.form.value.image != null){
      let comment = this.form.value
      comment.post = this.post._id
      this.postService.newComment(comment).toPromise()
        .then((comments)=>{
          
          this.modalCtrl.dismiss({
            action:'comment',
            comments,
            post:this.post
          })
          
        })
        .catch((err)=>{
          // handle err
          
        })
    }
  
  }

  async uploadImg($event){
    let loading = await this.loadingCtrl.create({
      message:this.translate.instant('loading')
    })
    loading.present()

    let formData: FormData = new FormData();
    formData.append('image',$event.target.files[0])
    this.imageService.uploadImage(formData).toPromise()
    .then((url)=>{
      loading.dismiss()
      this.form.controls.image.setValue(url)
    })
    .catch((err)=>{
      loading.dismiss()
    })
    
  }

  removeImg(){
    this.form.controls.image.setValue('')
  }


  dismiss(){
    this.modalCtrl.dismiss({
      action:'closed'
    })
  }

  
  setUser(user){
    this.mentions.setUser(user)
    
  }

  usersChange($event){
    this.users = $event
    
  }

  users = []
newValue($event){
  this.form.controls.message.setValue($event)

}
}
