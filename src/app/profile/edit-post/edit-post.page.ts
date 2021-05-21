import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LoadingController, ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { MentionsDirective } from "src/app/directives/mentions.directive";
import { IPost, IFile } from "src/app/models/iPost";
import { FilesService } from "src/app/service/files.service";
import { PostService } from "src/app/service/post.service";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.page.html",
  styleUrls: ["./edit-post.page.scss"],
})
export class EditPostPage implements OnInit {
  @Input() post: IPost;
  loading: boolean = false;
  @ViewChild(MentionsDirective) mentions;
  @ViewChild("mainInput") mainInput: ElementRef;

  constructor(
    public modalController: ModalController,
    public translate: TranslateService,
    public userService: UserService,
    private fb: FormBuilder,
    public filesServices: FilesService,
    public loadingCtrl: LoadingController,
    private postService: PostService
  ) {
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

  newValue($event) {
    this.form.controls.message.setValue($event);
  }
  users = [];

  // tslint:disable-next-line: member-ordering
  form = this.fb.group({
    message: ["", [Validators.required]],
  });

  async ngOnInit() {
 
    this.setValues();

    window.onclick = () => {
      this.emoji = false;
    };
  }

  setValues() {
    this.form.controls.message.setValue(this.post.message);
    this.files = this.post.files
  }

  async save() {
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    let post = this.form.value;
    post.files = this.files;

    post.message = this.mainInput.nativeElement.innerHTML;
    if (this.videosToUploads.length == 0) {
      this.postService
        .updateOne(this.post._id, post)
        .toPromise()
        .then((resp) => {
          loading.dismiss();
          this.modalController.dismiss({
            dismissed: true,
            edited: true,
          });
        })
        .catch((err) => {
          loading.dismiss();
        });
    } else {
      loading.dismiss();
      this.postService.editPostVideo(
        this.post._id,
        this.form.value,
        this.videosToUploads,
        this.files
      );
      this.modalController.dismiss({
        dismissed: true,
        edited: true,
      });
    }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  lastCaretPosition = 0;

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

  files: IFile[] = [];
  videosToUploads = [];

  addFile(file) {
    this.files.push(file);
  }

  pushVideoToUpload(file) {
    this.videosToUploads.push(file);
  }
}
