import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MentionsDirective } from 'src/app/directives/mentions.directive';
import { IPost } from 'src/app/models/iPost';
import { JdvimageService } from 'src/app/service/jdvimage.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.page.html',
  styleUrls: ['./edit-post.page.scss'],
})
export class EditPostPage implements OnInit {
    @Input() post:IPost
  loading: HTMLIonLoadingElement;
  @ViewChild(MentionsDirective) mentions

  
  constructor(
    public modalController: ModalController,
    public translate:TranslateService,
    public userService:UserService,
    private fb:FormBuilder,
    public JDVImage:JdvimageService,
    public loadingCtrl:LoadingController,
    private postService:PostService
  ) { 
    
    window.onclick = () => {
      this.emoji = false;
    }
   
  }

  setUser(user){
    this.mentions.setUser(user)
    
  }

  usersChange($event){
    this.users = $event
    
  }

  newValue($event){
    this.form.controls.message.setValue($event)
  
  }
  users = []

 form = this.fb.group({
    message:["",[Validators.required]],
    image:[""],
    video:[""]
  })
  emoji = false
  async ngOnInit() {
    this.loading =  await this.loadingCtrl.create({
      message:this.translate.instant('loading')
    })
    this.setValues()
  }
  
  setValues() {
    this.form.controls.message.setValue(this.post.message)
    this.form.controls.image.setValue(this.post.image)
    this.form.controls.video.setValue(this.post.video)
  }

 

  async uploadImg($event){
    let loading = await this.loadingCtrl.create({
      message:this.translate.instant('loading')
    })
    loading.present()

    let formData: FormData = new FormData();
    formData.append('image',$event.target.files[0])
    this.JDVImage.uploadImage(formData).toPromise()
    .then((url)=>{
      loading.dismiss()
      this.form.controls.image.setValue(url)
    })
    .catch((err)=>{
      loading.dismiss()
    })
    
  }


  save(){
    this.loading.present()
    this.postService.updateOne(this.post._id,this.form.value).toPromise()
      .then((resp)=>{
        this.loading.dismiss()
        this.modalController.dismiss({
          'dismissed': true,
          'edited':true
        });
      })
      .catch((err)=>{
        this.loading.dismiss()

      })
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  addEmoji(ev){
    this.form.controls.message.setValue(
      this.form.controls.message.value + ev.emoji.native
      
    )
  }



  openEmojis(){
    this.emoji = !this.emoji
   // this.inputNode.nativeElement.onclick = function (e) {
   //   e.stopPropagation();
   // }
   // this.emojiButton.nativeElement.onclick = function (e) {
   //   e.stopPropagation();
   // }
   // this.emojisContainer.nativeElement.onclick = function (e) {
   //   e.stopPropagation();
   // }
  }


}
