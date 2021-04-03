import { Input, Component, OnInit } from "@angular/core";
import { ModifyMediaComponent } from "src/app/components/structure/modify-media/modify-media.component"
import { User, UserService } from "src/app/service/user.service";
import { ModalController } from "@ionic/angular";
import { NewNodeComponent } from "./new-node/new-node.component";
import { take } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { ReusableComponentsIonic } from "src/app/service/ionicHelpers.service"
import { Structures } from "src/app/models/defaultStructures"
import { INode } from "src/app/models/INode"
import { ISponsor } from "src/app/models/ISponsor"
import { IUserDataResponse } from "src/app/models/IUserDataResponse"


@Component({
  selector: "app-structure",
  templateUrl: "./structure.component.html",
  styleUrls: ["./structure.component.scss"],
})
export class StructureComponent implements OnInit {
  /*
   * Slide options
   */

  slideOpts = this.reusableCI.slideOpts

  /*
   * Variables
   */

  @Input() public ID: string // ID del usuario
  showSlides: boolean = false // El ion slides
  creator: boolean = false // Saber si es el creador
  structureStatus: boolean = true // Existe la estructura
  defaultImg: string = `./assets/images/logox.png` // Imagen de sportyeah
  userNode: User = null

  /*
   * Data default para club
   */
  
  structureDefault = this.structures.Soccer
  

  structure: INode = JSON.parse(JSON.stringify(this.structureDefault));
  actualNode: INode = this.structure;
  seleccion: INode = this.structure.childs[0];

  constructor(
    public mc: ModalController,
    public userService: UserService,
    public route: ActivatedRoute,
    public reusableCI: ReusableComponentsIonic,
    public structures: Structures,
  ) {}

  openImg(i:INode){
    if(i.media){
      if(i.media.length > 0)
        this.reusableCI.openImg(i.media[0],null)
    }
    else this.reusableCI.openImg(this.defaultImg,null)
  }

  async editMedia(node: INode){
    const modal = await this.mc.create({
      component: ModifyMediaComponent,
      cssClass: "my-custom-class",
      componentProps: {
        media: node.media ? node.media: [this.defaultImg],
        idUser:this.ID !== this.userService.User._id 
                ? this.route.snapshot.paramMap.get("username")
                : this.userService.User.username
      }
    })
    await modal.present()
    const { data } = await modal.onDidDismiss()
    if(data){
      const newMedia = data
      node.media = newMedia
      this.searchEdit(node, node)
    }
  }

  async eliminar(node: INode){
    const data = await this.reusableCI.desicionAlert(
      `¿Esta seguro de eliminar este elemento?`, ``
    )
    if(data)
      this.deleteNode(this.structure, node.id)
  }

  getStructure() {
    // Obtenemos la estructura organizacional del usuario si y solo si, dicha estructura existe.
    if(this.userService.User){
      if (this.ID === this.userService.User._id) {
        this.userService.User.structure !== undefined
          ? (this.structure = this.userService.User.structure)
          : null;
        this.setActualNode(this.structure)
        this.creator = true;
      } else {
        this.userService
          .getUserByUsername(this.route.snapshot.paramMap.get("username"))
          .pipe(take(1))
          .subscribe((r: IUserDataResponse) => {
            if (r.user.structure) {
              this.structure = r.user.structure
              this.setActualNode(this.structure)
            } else {
              this.structureStatus = false;
            }
          });
      }
    }else{
      this.userService
          .getUserByUsername(this.route.snapshot.paramMap.get("username"))
          .pipe(take(1))
          .subscribe((r: IUserDataResponse) => {
            if (r.user.structure) {
              this.structure = r.user.structure;
              this.setActualNode(this.structure)
            } else {
              this.structureStatus = false;
            }
          });
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.showSlides = true;
    }, 300);
    this.getStructure();
  }
  async editNodes(node: INode) {
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
      node ? this.searchEdit(this.structure, data) : this.createNode();
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

  searchEdit(node: INode, newNode: INode) {
    // Se buscara dentro de la estructura el nodo otorgado para su remplazo
    if (node.id === newNode.id) {
      node.title = newNode.title
      node.subtitle = newNode.subtitle
      node.text = newNode.text
      node.idUser = newNode.idUser
      node.media = newNode.media
      this.as()
      if(this.actualNode.id === node.id)
        this.setActualNode(node)
    } else if (node.childs.length != 0) {
      for (let i = 0; i < node.childs.length; i++) {
        this.searchEdit(node.childs[i], newNode);
      }
    }
  }

  deleteNode(node: any, nodeId: number) {
    if (node.childs !== null) {
      for (let i in node.childs) {
        let filtered = node.childs.filter((f: any) => f.id === nodeId);
        if (filtered && filtered.length > 0) {
          node.childs = node.childs.filter((f: any) => f.id !== nodeId);
          this.as();
          return;
        }
        this.deleteNode(node.childs[i], nodeId);
      }
    }
  }

  goBack(
    idNode: number, 
    node: INode = this.structure,
    parentNode: INode = this.structure
  ) {
    if(idNode === node.id){
      this.setActualNode(parentNode)
    }else{
      node.childs.forEach((child:INode) => {
        this.goBack(idNode, child, node)
      })
    }
  }

  /* 
   * Actualizar estructura
   */
  as() {
    this.userService.User.structure = this.structure;
    this.userService
      .update(this.userService.User)
      .pipe(take(1))
      .subscribe((r: any) => {
        this.reusableCI.toast(`Estructura Actualizada`) 
      })
  }

  /*
   * Reiniciar Estructura Default
   */
  async restart(){
    const data = await this.reusableCI.desicionAlert(
      `¿Esta seguro de reiniciar su estructura?`,
      `Todas las configuraciones volveran a su estado original`
    )
    if(data){
      this.structure = JSON.parse(JSON.stringify(this.structureDefault))
      this.setActualNode(this.structure)
      this.as()
    }
  }

  /*
   * Vacia y elmina los ejemplos de structure default para
   * permitir al usuario una plantilla limpia
   */
  async empty(){
    const data = await this.reusableCI.desicionAlert(
      `¿Esta seguro de eliminar su estructura?`,
      `Todas las configuraciones realizadas hasta el momento se perderan`
    )
    if(data){
      const structure = JSON.parse(JSON.stringify(this.structureDefault))
      structure.childs = []
      this.structure = structure      
      this.setActualNode(this.structure)
      this.as()
    }
  }

  /*
   * Recibe la data del mini componente sponsors
   */
  sponsorsAction(e: ISponsor[]){
    this.actualNode.sponsors = e
    this.as()
  }

  /*
   * Cambia el nodo actual, basicamente es la navegacion
   */
  setActualNode(node: INode){
    this.actualNode = node
    if(node.idUser)
      this.userService.getUserByUsername(node.idUser)
        .pipe(take(1))
        .subscribe((user:IUserDataResponse)=> {
          this.userNode = user.user
        })
    else this.userNode = null
  }
}
