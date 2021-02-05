import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MentionsDirective } from 'src/app/directives/mentions.directive';
import { IPost,INew } from 'src/app/models/iPost';
import { JdvimageService } from 'src/app/service/jdvimage.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import { NewsService } from 'src/app/service/news.service';

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
    private postService:PostService,
    public newsService:NewsService,
    ) { }


  form = this.fb.group({
    user:[this.userService.User?._id],
    message:['',[Validators.required]],
    image:[""],
    video:[null],
    post:[null]
  })
  formNews = this.fb.group({
    user:[this.userService.User?._id],
    message:['',[Validators.required]],
    image:[""],
    video:[null],
    news:[null]
  })

  @Input() post :IPost
  @Input() news: INew

  @ViewChild(MentionsDirective) mentions


  ngOnInit() {}

  /**
   * Add emoji
   * @param ev 
   */
  addEmoji(ev){
    if(this.post){
      this.form.controls.message.setValue(
        this.form.controls.message.value + ev.emoji.native
      )
    }else if(this.news){
      this.formNews.controls.message.setValue(
        this.formNews.controls.message.value + ev.emoji.native
      )
    }
    
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
  if(this.post){
    this.form.controls.message.setValue($event)
  }else if(this.news){
    this.formNews.controls.message.setValue($event)
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
    if(this.post){
      this.form.controls.image.setValue(url)
    }else if(this.news){
      this.formNews.controls.image.setValue(url)
    }
  })
  .catch((err)=>{
    loading.dismiss()
  })
  
}

removeImg(){
  if(this.post){
    this.form.controls.image.setValue('')
  }else if(this.news){
    this.formNews.controls.image.setValue('')
  }
}

@Output() newComment = new EventEmitter()
send(){
  this.emoji = false
  if(this.post && (this.form.value.message != null || this.form.value.image != null)){
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
  }else if(this.news && (this.formNews.value.message != null || this.formNews.value.image != null)){
    let comment = this.formNews.value
    
    comment.news = this.news._id
    this.newsService.newComment(comment).toPromise()
    .then((comments)=>{  
      this.newComment.emit(comments)
      this.formNews.controls.message.setValue('')
      this.formNews.controls.image.setValue('')
      this.formNews.controls.video.setValue(null)
    })
    .catch((err)=>{
      // handle err
      
    })
  }

}


}
