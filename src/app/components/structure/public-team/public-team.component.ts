import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import {
  IPlayer,
  IStructure,
  ITeam,
  PlayerRole,
} from "src/app/models/structure.model";
import { StructureService } from "src/app/service/structure.service";
enum Texts {
  players = "team.players",
  staff = "team.staff",
}
@Component({
  selector: "app-public-team",
  templateUrl: "./public-team.component.html",
  styleUrls: ["./public-team.component.scss"],
})
export class PublicTeamComponent implements OnInit {
  public readonly Texts = Texts;
  constructor(
    private readonly structureService: StructureService,
    private readonly modalCtrl: ModalController,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public structure: IStructure = null;
  public team: ITeam = null;
  ngOnInit() {
    this.structureService
      .getTeam(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        (team) => {
          this.structure = team.category.division.structure;
          this.team = team;
          this.gePlayers();
        },
        () => {
          this.router.navigate(["/404"]);
        }
      );
  }

  gePlayers() {
    this.structureService
      .getAllPlayersByTeam(this.team._id, PlayerRole.player)
      .subscribe((players) => {
        console.log(players);

        this.players = players;
      });
    this.structureService
      .getAllPlayersByTeam(this.team._id, PlayerRole.staff)
      .subscribe((staff) => {
        this.staff = staff;
      });
  }

  public players: IPlayer[] = [];
  public staff: IPlayer[] = [];
}
