import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { ICategory, IStructure, ITeam } from "src/app/models/structure.model";
import { StructureService } from "src/app/service/structure.service";
import { CreateTeamComponent } from "./create-team/create-team.component";
enum Texts {
  title = "divisions.title",
  description = "divisions.description",
  create = "Crear equipo",
  header = "Categoria",
}
@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
})
export class CategoryComponent implements OnInit {
  public readonly Texts = Texts;
  constructor(
    private readonly structureService: StructureService,
    private readonly modalCtrl: ModalController,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public structure: IStructure = null;

  ngOnInit() {
    this.getCategory();
  }

  public teams: ITeam[] = [];

  
  public category: ICategory = null;
  getCategory() {
    this.structureService
      .getCategory(this.route.snapshot.paramMap.get("id"))
      .subscribe(
        (category) => {
          this.structureService.newTeam$.subscribe((team) => {
            this.teams.push(team);
          });

          this.category = category;

          const { structure } = category.division;
          this.structure = structure;
          this.getTeams();
        },
        () => {
          this.router.navigate(["/404"]);
        }
      );
  }

  getTeams() {
    this.structureService
      .getAllTeamsByCategory(this.category._id)
      .subscribe((teams) => {
        this.teams = teams;
      });
  }

  public categories: ICategory[] = [];

  async create() {
    const modal = await this.modalCtrl.create({
      component: CreateTeamComponent,
      componentProps: { category: this.category },
      cssClass: "modal-border",
    });
    return await modal.present();
  }
}
