import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { User } from "src/app/models/IUser";
import { IPlayer, ITeam } from "src/app/models/structure.model";
import { FilesService } from "src/app/service/files.service";
import { StructureService } from "src/app/service/structure.service";
import { UserService } from "src/app/service/user.service";

enum Texts {
  title = "create_player.title",
  edit = "create_player.edit",
  changeImg = "create_player.changeImg",
  name = "create_player.name",
  position = "create_player.position",
  date = "create_player.date",
  place = "create_player.place",
  height = "create_player.height",
  history = "create_player.history",
  create = "create_player.create",
  save = "create_player.save",
  user = "create_player.user",
  cancelUser = "create_player.cancelUser",
}

@Component({
  selector: "app-create-player",
  templateUrl: "./create-player.component.html",
  styleUrls: ["./create-player.component.scss"],
})
export class CreatePlayerComponent implements OnInit {
  @Input() player: IPlayer = null;
  @Input() team: ITeam = null;
  @Input() role: string = "player";
  public readonly Texts = Texts;
  constructor(
    public readonly modalCtrl: ModalController,
    private readonly structureService: StructureService,
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly fileService: FilesService
  ) {}

  form = this.fb.group({
    photo: ["assets/structure/player1.png", [Validators.required]],
    name: ["", [Validators.required]],
    position: ["", [Validators.required]],
    place: ["", [Validators.required]],
    height: ["", [Validators.required]],
    role: [this.role, [Validators.required]],
    birthday: [new Date(), [Validators.required]],
    history: ["", [Validators.required]],
    team: [null, [Validators.required]],
  });

  ngOnInit() {
    if (this.player) {
      this.setValues();
    }

    if (this.team) {
      this.form.controls.team.setValue(this.team._id);
    }
  }

  public user: User = null;
  public users: User[] = [];
  filter(ev) {
    const { value } = ev.detail;
    if (value) {
      this.userService.queryUsers(ev.detail.value).subscribe((users) => {
        this.users = users;
      });
    } else {
      this.users = [];
    }
  }

  setUser(user) {
    this.user = user;
  }

  setValues() {
    this.form = this.fb.group({
      photo: [this.player.photo, [Validators.required]],
      name: [this.player.name, [Validators.required]],
      position: [this.player.position, [Validators.required]],
      place: [this.player.place, [Validators.required]],
      height: [this.player.height, [Validators.required]],
      birthday: [moment(this.player.birthday).format("YYYY-MM-DD")],
      history: [this.player.history, [Validators.required]],
      role: [this.player.role],
    });

    this.user = this.player.user;
  }

  uploadFile(event) {
    let formdata = new FormData();
    formdata.append("image", event.target.files[0]);
    this.fileService.uploadImageProgress(formdata).then((url) => {
      this.form.controls.photo.setValue(url);
    });
  }

  save() {
    let player = this.form.value;
    player.user = this.user != null ? this.user._id : null;

    if (this.player) {
      delete player.team;
      this.structureService.updatePlayer(this.player._id, player);
    } else {
      this.structureService.createPlayer(player);
    }
    this.modalCtrl.dismiss();
  }
}
