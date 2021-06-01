import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LoadingController, ModalController, Platform } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { MentionsDirective } from "src/app/directives/mentions.directive";
import { IPost, INew, IFile } from "src/app/models/iPost";
import { FilesService } from "src/app/service/files.service";
import { PostService } from "src/app/service/post.service";
import { UserService } from "src/app/service/user.service";
import { AssetsButtonsComponent } from "src/app/shared-components/assets-buttons/assets-buttons.component";
@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.page.html",
  styleUrls: ["./new-post.page.scss"],
})
export class NewPostPage implements OnInit {
  @Input() post: IPost;
  @Input() news: INew = null;
  @Input() img: string;
  @ViewChild("assetsBtn") assetsBtn: AssetsButtonsComponent;
  @ViewChild(MentionsDirective) mentions;
  @ViewChild("openImage") fileChooser: ElementRef;
  @ViewChild("mainInput") mainInput: ElementRef;

  constructor(
    public modalController: ModalController,
    public translate: TranslateService,
    public userService: UserService,
    private fb: FormBuilder,
    public filesServices: FilesService,
    public loadingCtrl: LoadingController,
    private postService: PostService,
    private platform: Platform
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
    this.postService.fileRemovedSuscriber().subscribe((url)=>{
      this.removeFile(url);
    })
  }

  

  removeFile(url) {
    this.files = this.files.filter((file) => {
      return file.url != url; 
    });
    this.videosToUploads = this.videosToUploads.filter((video) => {
      return video.url != url;
    });
  }

  setUser(user) {
    this.mentions.setUser(user);
  }

  usersChange($event) {
    this.users = $event;
  }

  users = [];

  ngOnInit() {
    window.onclick = () => {
      this.emoji = false;
    };
    if (this.img) {
      this.form.controls.image.setValue(this.img);
    }
  }

  form = this.fb.group({
    user: [this.userService.User?._id],
    message: ["", [Validators.required]],
  });

  newValue($event) {
    this.form.controls.message.setValue($event);
  }

  async save() {
    
    // obtenemos la data del formulario
    let post = this.form.value;
    // si hay un post significa que es una comparticion
    post.post = this.post ? this.post._id : null;

    // agregamos los archivos al post
    post.files = this.files;

    // por ultimo al mensaje hay que agregarle el valor real del input que es un div editable

    post.message = this.mainInput.nativeElement.innerHTML;
    // si no hay videos para subir entonces se crea el post

    post.question = await this.assetsBtn.saveQuestion(this.question);

    post.news = this.news ? this.news._id : null;

    if (this.videosToUploads.length == 0) {
      let loading = await this.loadingCtrl.create({
        message: this.translate.instant("loading"),
      });
      loading.present();
      this.postService
        .create(post)
        .toPromise()
        .then((post: IPost) => {
          loading.dismiss();
          this.postService.newPost(post._id);
          this.modalController.dismiss();
        })
        .catch((err) => {
          loading.dismiss();
        });
    } else {
      this.postService.uploadVideoPost(post, this.videosToUploads, this.files);
      this.modalController.dismiss();
    }
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  addEmoji(ev) {
    this.mentions.setEmoji(ev.emoji.native);
  }

  emoji = false;

  stopPropagation(e) {
    e.stopPropagation();
  }
  openEmojis() {
    this.emoji = !this.emoji;
  }

  question = {
    user: this.userService.User._id,
    questionGroup: null,
    finishVotes: undefined,
  };

  async editQuestion() {
    this.assetsBtn.editQuestion(this.question.questionGroup);
  }

  deleteQuestion() {
    this.question.questionGroup = null;
  }

  newQuestion($event) {
    this.question.questionGroup = $event;
  }

  files: IFile[] = [];
  videosToUploads = [];

  loading = false;

  addFile(file) {
    console.log(file)
    this.files.push(file);
  }

  pushVideoToUpload(file) {
    this.videosToUploads.push(file);
  }

 
}
