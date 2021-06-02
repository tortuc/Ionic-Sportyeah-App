import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/models/IUser";
import { IPlayer, IStructure } from "src/app/models/structure.model";
import { StructureService } from "src/app/service/structure.service";
import { UserService } from "src/app/service/user.service";
enum Texts {
  toolbar = "Perfil de organigrama",
  from = "Desde",
  birth = "Fecha de nacimiento",
  position = "Posicion",
  place = "Lugar de nacimiento",
  name = "Nombre",
  height = "Estatura",
  bio = "Biografia",
}

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"],
})
export class PlayerComponent implements OnInit {
  public Texts = Texts;

  profile: IPlayer = null;
  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly structureService: StructureService,
    private readonly userService: UserService
  ) {}

  ngOnInit() {
    this.findInfo();
  }
  findInfo() {
    let id = this.route.snapshot.paramMap.get("id");

    if (id) {
      this.structureService.getPlayer(id).subscribe(
        (profile) => {
          console.log(profile);

          this.profile = profile;
        },
        () => {
          this.router.navigate(["/404"]);
        }
      );
    } else {
      this.router.navigate(["/404"]);
    }
  }

  goToStructure() {
    let user = (this.profile.team.category.division.structure as IStructure)
      .user as User;

    if (user._id == this.userService.User?._id) {
      this.router.navigate([
        `/profile/structure/team/${this.profile.team._id}`,
      ]);
    } else {
      this.router.navigate([
        `/user/${user.username}/structure/team/${this.profile.team._id}`,
      ]);
    }
  }
}
