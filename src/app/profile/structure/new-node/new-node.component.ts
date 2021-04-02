import { UserService } from './../../../service/user.service';
import { ReusableComponentsIonic } from "src/app/service/reusable-components-ionic.service"
import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ImgVideoUpload } from "src/app/service/reusable-img-video-logic.service";
import { take } from "rxjs/operators";
import { INode } from "src/app/models/INode"
import { ModifyMediaComponent } from "src/app/components/structure/modify-media/modify-media.component"

@Component({
  selector: "app-new-node",
  templateUrl: "./new-node.component.html",
  styleUrls: ["./new-node.component.scss"],
})
export class NewNodeComponent implements OnInit {
  /*
   * Slide Options para darle estilo al componente slide de html
   */
  slideOpts = this.reusableCI.slideOpts

  /*
   * La estructura completa
   */
  @Input() structure: INode;
  /*
   * El nodo/elemento actual
   */
  @Input() actualNode: INode;
  /*
   * El padre del nodo
   */
  @Input() parentNode: INode;

  /*
   * Variable para evitar el bug de slides ionic
   */
  showSlides: boolean = false;
  /*
   * Formulario
   */
  form: FormGroup = null;
  constructor(
    public reusableCI: ReusableComponentsIonic,
    private fb: FormBuilder,
    public userService: UserService,
    private viUp: ImgVideoUpload,
    public mc: ModalController
  ) {}

  ngOnInit() {
    /*
     * Evita el bug de slides
     */
    setTimeout(() => {
      this.showSlides = true;
    }, 300);
    if(!this.actualNode)
      this.actualNode={
        id:null,
        media:null,
        title:null,
        subtitle:null,
        text:null,
        idUser:null,
        canEdit: true,
        sponsors:[],
        childs:[]
      }
    this.generateForm()
  }

  /*
   * Genera el formulario
   */
  generateForm() {
    this.form = this.fb.group({
      id: [
        this.actualNode.id
        ? this.actualNode.id
        : null
      ],
      media: [
        this.actualNode.media 
           ? this.actualNode.media
           : [`./assets/images/logox.png`]
      ],
      title: [this.actualNode.title, [Validators.required]],
      subtitle: [
      this.actualNode.subtitle 
      ? this.actualNode.subtitle.split(" / ").reverse()[0]
      : null ,
        [Validators.required],
      ],
      text: [
        this.actualNode.text, 
        [Validators.required]
      ],
      idUser:[this.actualNode.idUser],
      canEdit:[this.actualNode.canEdit]
    });
  }


  /*
   * Genera un numero random
   */
  randomNumber() {
    return Math.floor(Math.random() * 1000000);
  }


  save(form: any) {
    /*
     * Buscar todos los nodos padre de dicho nodo para poder darle 
     * el subtitulo
     * adecuado...
     */
    const resp = this.recopilarSubtitles(
      this.structure.subtitle,
      this.structure,
      this.parentNode
    );
    const array = resp.split(" / ");
    array.length === 1 && array[0] === ""
      ? array.splice(array.length - 1, 1)
      : null;
    array.push(form.subtitle);
    form.subtitle = array.join(" / ");
    this.mc.dismiss(form);
  }

  recopilarSubtitles(subtitle: string, node: any, parentNode: any) {
    if (node.id === 1 && this.actualNode?.id === node.id) {
      return "";
    } else if (this.actualNode?.id === node.id) {
      return subtitle;
    } else if (node.id === parentNode?.id && node.id !== 1) {
      subtitle = `${subtitle} / ${node.subtitle.split(" / ").reverse()[0]}`;
      return subtitle;
    } else if (node.id === 1 && node.id === parentNode?.id) {
      return subtitle;
    } else if (node.id === 1) {
    } else {
      subtitle = `${subtitle} / ${node.subtitle.split(" / ").reverse()[0]}`;
    }
    for (let i in node.childs) {
      const resp = this.recopilarSubtitles(
        subtitle,
        node.childs[i],
        this.parentNode
      );
      if (resp !== `Error`) {
        return resp;
      }
    }
    return `Error`;
  }

  //editPhoto() {
  //  this.viUp.takeOnlyPhoto();
  //  this.viUp.content.pipe(take(1)).subscribe((r: string) => (this.photo = r));
  //}
  async editMedia(node: INode){
    const modal = await this.mc.create({
      component: ModifyMediaComponent,
      cssClass: "my-custom-class",
      componentProps: {
        media: node.media,
        idUser: null
      }
    })
    await modal.present()
    const { data } = await modal.onDidDismiss()
    if(data){
      const newMedia = data
      this.form.controls.media.setValue(newMedia)
    }
  }
}
