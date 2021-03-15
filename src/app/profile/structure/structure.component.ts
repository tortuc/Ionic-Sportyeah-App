import { Input, Component, OnInit } from "@angular/core";
import { User, UserService } from "src/app/service/user.service";
import { ModalController } from "@ionic/angular";
import { NewNodeComponent } from "./new-node/new-node.component";
import { take } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";

interface UserData {
  user: User;
  friends: {
    followers: number;
    followings: number;
  };
  posts: number;
  connected: boolean;
}

@Component({
  selector: "app-structure",
  templateUrl: "./structure.component.html",
  styleUrls: ["./structure.component.scss"],
})
export class StructureComponent implements OnInit {
  @Input() public ID: string;
  public canteraMasculina = {
    id: 2,
    photo: this.userService.User.photoBanner,
    subtitle: `Cantera Masculina`,
    title: `Cantera Masculina`,
    text: `Categorias`,
    childs: [],
  };
  public canteraFemenina = {
    id: 3,
    photo: this.userService.User.photoBanner,
    subtitle: `Cantera Femenina`,
    title: `Cantera Femenina`,
    text: `Categorias`,
    childs: [],
  };
  public primerEquipo = {
    id: 4,
    photo: this.userService.User.photoBanner,
    subtitle: `Primer Equipo`,
    title: `Primer Equipo`,
    text: `Plantilla`,
    childs: [],
  };
  public equipoFemenino = {
    id: 5,
    photo: this.userService.User.photoBanner,
    subtitle: `Equipo Femenino`,
    title: `Equipo Femenino`,
    text: `Plantilla`,
    childs: [],
  };
  public otrosEquipos = {
    id: 6,
    photo: this.userService.User.photoBanner,
    subtitle: `Otros Equipos`,
    title: `Otros Equipos`,
    text: `Equipos`,
    childs: [],
  };
  public structureDefault = {
    id: 1,
    photo: this.userService.User.photoBanner,
    subtitle: `structure.subtitle.club`,
    title: `structure.title.club`,
    text: `structure.text.club`,
    childs: [
      this.canteraMasculina,
      this.canteraFemenina,
      this.primerEquipo,
      this.equipoFemenino,
      this.otrosEquipos,
    ],
  };

  public structure = this.structureDefault;

  public actualNode = this.structure;
  public creator: boolean = false;
  public structureStatus: boolean = true;

  constructor(
    public uS: UserService,
    public mc: ModalController,
    public userService: UserService,
    public route: ActivatedRoute
  ) {}

  getStructure() {
    // Obtenemos la estructura organizacional del usuario si y solo si, dicha estructura existe.
    console.log(this.ID);
    if (this.ID === this.uS.User._id) {
      this.uS.User.structure !== undefined
        ? (this.structure = this.uS.User.structure)
        : null;
      this.actualNode = this.structure;
      this.creator = true;
    } else {
      this.uS
        .getUserByUsername(this.route.snapshot.paramMap.get("username"))
        .pipe(take(1))
        .subscribe((r: UserData) => {
          console.log("c%UserData", "color:green;");
          console.log(r);
          if (r.user.structure) {
            this.structure = r.user.structure;
            this.actualNode = r.user.structure;
          } else {
            this.structureStatus = false;
          }
        });
    }
  }

  ngOnInit() {
    this.getStructure();
  }
  async editNodes(node: any) {
    const modal = await this.mc.create({
      component: NewNodeComponent,
      cssClass: "my-custom-class",
      componentProps: {
        structure: this.structure,
        actualNode: node,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log("form", data);
      console.log("node", node);
      node ? this.searchEdit(this.actualNode, data) : this.createNode();
    }
  }

  async createNode() {
    //this.actualnode es el node padre
    const modal = await this.mc.create({
      component: NewNodeComponent,
      cssClass: "my-custom-class",
      componentProps: {
        structure: this.structure,
        actualNode: undefined,
        parentNode: this.actualNode,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log("form: ", data, "parent: ", this.actualNode);
      data.childs = [];
      this.insertNode(this.structure, data, this.actualNode);
    }
  }

  insertNode(node: any, newNode: any, parentNode: any) {
    if (node.id === parentNode.id) {
      node.childs.push(newNode);
      this.as();
    } else if (node.childs !== null) {
      for (let i in node.childs) {
        this.insertNode(node.childs[i], newNode, parentNode);
      }
    }
  }

  searchEdit(node: any, newNode: any) {
    console.log("EDITANDO STRUCTURA", node, newNode);
    // Se buscara dentro de la estructura el nodo otorgado para su remplazo
    if (node.id === newNode.id) {
      console.log("Editando");
      node.photo = newNode.photo;
      node.title = newNode.title;
      node.subtitle = newNode.subtitle;
      node.text = newNode.text;
      console.log(node);
      console.log(newNode);
      this.as();
    } else if (node.childs.length != 0) {
      console.log("revisando hijos");
      for (let i = 0; i < node.childs.length; i++) {
        this.searchEdit(node.childs[i], newNode);
      }
    }
  }

  deleteNode(node: any, nodeId: number) {
    console.log(
      "%cDeleting a NODE",
      "color:red;font-size:30px;font-weight:bold;"
    );
    if (node.childs !== null) {
      for (let i in node.childs) {
        console.log("Revisando hijos");
        let filtered = node.childs.filter((f: any) => f.id === nodeId);
        console.log("Filtro", filtered);
        if (filtered && filtered.length > 0) {
          node.childs = node.childs.filter((f: any) => f.id !== nodeId);
          this.as();
          return;
        }
        this.deleteNode(node.childs[i], nodeId);
      }
    }
  }

  go(subtitle: string, level: number, node: any) {
    if (subtitle === node.subtitle.split(" / ")[level]) {
      this.actualNode = node;
    } else if (node.childs.length != 0) {
      for (let i in node.childs) {
        this.go(subtitle, level, node.childs[i]);
      }
    }
  }

  // Actualizar estructura
  as() {
    this.userService.User.structure = this.structure;
    this.userService
      .update(this.userService.User)
      .pipe(take(1))
      .subscribe((r: any) => console.log(r));
  }
}
