import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LoadingController, ModalController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { UserService } from "src/app/service/user.service";
import { ChatService } from "src/app/service/chat.service";
import { Followings } from "src/app/models/IUser";
import { TranslateService } from "@ngx-translate/core";
import { FilesService } from "src/app/service/files.service";

@Component({
  selector: "app-chat-new-group",
  templateUrl: "./chat-new-group.component.html",
  styleUrls: ["./chat-new-group.component.scss"],
})
export class ChatNewGroupComponent implements OnInit {
  constructor(
    public userService: UserService,
    public modalCtrl: ModalController,
    public fb: FormBuilder,
    private filesServices: FilesService,
    private chatService: ChatService,
    private cd: ChangeDetectorRef,
    private loadingCtrl: LoadingController,
    private translate: TranslateService
  ) {}

  form = this.fb.group({
    name: ["", [Validators.required]],
    image: [
      "https://files.kecuki.com/v1/image/get/1616728941495",
      [Validators.required],
    ],
    group_privacy: ["public", Validators.required],
  });

  privacy = false;
  users: Followings[];
  allUsers: Followings[];

  step = 1;
  getUsers() {
    this.allUsers = this.userService.followings;

    this.filter(null);
  }

  @ViewChild("emojiButton") emojiButton: any;

  ngOnInit() {
    this.getUsers();

    window.onclick = () => {
      this.emojis = false;
    };
  }

  filter(ev) {
    let query = ev?.detail.value || "";
    this.users = this.allUsers.filter((user) => {
      query = query.replace(" ", "").toLowerCase();

      let find = user.user.name + user.user.last_name + user.user.username;
      find = find.replace(" ", "").toLowerCase();
      return find.includes(query);
    });
  }

  usersSelect = [];

  pushUser(user) {
    let exist = this.usersSelect.find((select) => {
      return select._id == user._id;
    });
    if (!exist) {
      this.usersSelect.push(user);
    } else {
      this.usersSelect = this.usersSelect.filter((select) => {
        return select._id != user._id;
      });
    }
  }

  dismiss() {
    this.modalCtrl.dismiss({
      action: "dismiss",
    });
  }
  isSelect(user) {
    let selected = this.usersSelect.find((select) => {
      return select._id == user._id;
    });
    return selected ? "selected" : "";
  }

  addFriends() {
    this.modalCtrl.dismiss({
      action: "create",
      users: this.usersSelect,
    });
  }

  next() {
    this.step = 2;
    this.cd.detectChanges();
  }

  focusout(e) {
    this.caretPosition = e.target.selectionStart;
  }

  async uploadImg($event) {
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });

    loading.present();
    let formData: FormData = new FormData();
    formData.append("image", $event.target.files[0]);
    this.filesServices.uploadImage(formData)
      .pipe(take(1))
      .subscribe(
        (url) => {
          this.form.controls.image.setValue(url);
          loading.dismiss();
        },
        (err) => {
          loading.dismiss();
        }
      );
  }

  async create() {
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });

    loading.present();
    let group = this.form.value;
    group.group_privacy = this.privacy ? "public" : "private";

    group.users = this.usersSelect;
    this.chatService
      .createGroup(group)
      .pipe(take(1))
      .subscribe(
        (chat) => {
          console.log(chat);
          
          loading.dismiss();
          this.modalCtrl.dismiss({
            create: true,
            chat,
          });
        },
        () => {
          loading.dismiss();
        }
      );
  }

  /**
   * apartado de emojis
   */

  caretPosition;

  emojis = false;

  addEmoji(ev) {
    let value = this.form.controls.name.value;
    const newText =
      value.substring(0, this.caretPosition) +
      ev.emoji.native +
      value.substring(this.caretPosition);

    this.form.controls.name.setValue(newText);
  }

  stopPropagation(e: Event) {
    e.stopPropagation();
  }

  openEmojis(ev) {
    ev.stopPropagation();
    this.cd.detectChanges();
    this.emojis = !this.emojis;
  }
}
