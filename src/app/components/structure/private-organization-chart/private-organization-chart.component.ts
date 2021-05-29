import { Component, OnInit } from "@angular/core";
import { IStructure, StructureService } from "src/app/service/structure.service";

enum Texts {
  title = "Organigrama",
  description = "Junta directiva del club encargada de...",
}

@Component({
  selector: "app-private-organization-chart",
  templateUrl: "./private-organization-chart.component.html",
  styleUrls: ["./private-organization-chart.component.scss"],
})
export class PrivateOrganizationChartComponent implements OnInit {
  public readonly Texts = Texts;
  constructor(private readonly structureService: StructureService) {}


  public structure:IStructure = this.structureService.myStructure

  testprofiles = [
    {
      photo: "assets/structure/president.jpg",
      name: "Pepe escamilla",
      position: "Presidente",
      description: "Presidente del club",
      date: new Date(),
    },
    {
      photo: "assets/structure/vicepresident.jpg",
      name: "Maria infante",
      position: "Vicepresidenta",
      description: "Vicepresidenta del club",
      date: new Date(),
    },
    {
      photo: "assets/structure/director.jpg",
      name: "Pablo Valderrama",
      position: "Director de area",
      description: "Director de area del club",
      date: new Date(),
    },
  ];

  ngOnInit() {}
}
