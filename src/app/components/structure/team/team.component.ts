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
import { CreatePlayerComponent } from "./player-card/create-player/create-player.component";
enum Texts {
  title = "organizationChart.title",
  description = "organizationChart.description",
  create = "organizationChart.createBtn",
  from = "Desde",
}
@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
})
export class TeamComponent implements OnInit {
  public readonly Texts = Texts;
  constructor(
    private readonly structureService: StructureService,
    private readonly modalCtrl: ModalController,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public structure: IStructure = this.structureService.myStructure;

  public team: ITeam = null;
  ngOnInit() {
    this.structureService
      .getTeam(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        (team) => {
          this.structureService.newPlayer$.subscribe((player) => {
            if (player.role == PlayerRole.player) {
              this.players.unshift(player);
            } else {
              this.staff.unshift(player);
            }
          });
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

  async create(role) {
    const modal = await this.modalCtrl.create({
      component: CreatePlayerComponent,
      componentProps: { team: this.team, role },
      cssClass: "modal-border",
    });

    return await modal.present();
  }
}
