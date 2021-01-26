import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MentionsDirective } from 'src/app/directives/mentions.directive';
import { IPost } from 'src/app/models/iPost';
import { JdvimageService } from 'src/app/service/jdvimage.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.scss'],
})
export class CommentPostComponent implements OnInit {

  constructor(
    public userService:UserService,
    public fb:FormBuilder,
    private loadingCtrl:LoadingController,
    private translate:TranslateService,
    private imageService:JdvimageService,
    private postService:PostService
  ) { }


  form = this.fb.group({
    user:[this.userService.User?._id],
    message:['',[Validators.required]],
    image:[""],
    video:[null],
    post:[null]
  })

  @Input() post :IPost
  
  @ViewChild(MentionsDirective) mentions


  ngOnInit() {}

  /**
   * Add emoji
   * @param ev 
   */
  addEmoji(ev){
    this.form.controls.message.setValue(
      this.form.controls.message.value + ev.emoji.native
      
    )
  }

  // variable control para emojis 

  emoji = false
  // cambia la variable de control del emoji
  openEmojis(){
    this.emoji = !this.emoji
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

@Output() newComment = new EventEmitter()
send(){
  this.emoji = false
  if(this.form.value.message != null || this.form.value.image != null){
    let comment = this.form.value
    comment.post = this.post._id
    this.postService.newComment(comment).toPromise()
      .then((comments)=>{
        
        this.newComment.emit(comments)
        this.form.controls.message.setValue('')
        this.form.controls.image.setValue('')
        this.form.controls.video.setValue(null)
      })
      .catch((err)=>{
        // handle err
        
      })
  }

}


}
