import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {  ImgVideoUpload } from 'src/app/service/reusable-img-video-logic.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-new-node',
  templateUrl: './new-node.component.html',
  styleUrls: ['./new-node.component.scss'],
})
export class NewNodeComponent implements OnInit {
  @Input() structure: any;
  @Input() actualNode: any;
  @Input() parentNode:any;


  public structureDefault = {
    id:1,
    photo: `https://www.necg.com.lb/sites/default/files/images/organization.jpg`,
    subtitle:`structure.subtitle`,
    title: `structure.title`,
    text: `structure.text`,
    childs: [], 
  }

  public photo:string = `https://www.necg.com.lb/sites/default/files/images/organization.jpg`;
  public creating: boolean = false;
  public form: FormGroup = null;
  constructor(
    private fb: FormBuilder,
    private viUp: ImgVideoUpload,
    private mc: ModalController,
  ) {}

  ngOnInit() {
    // Verifica si trae datos para editar o es para crear un nuevo nodo
    // si trae los datos del structureDefault entonces crea toda la estructura
    // de 0
    console.log(this.actualNode);
    console.log(this.structure.subtitle);
    console.log(this.structureDefault.subtitle);
    console.log(this.actualNode !== undefined && this.structure.subtitle !== this.structureDefault.subtitle);
    this.actualNode !== undefined && this.structure.subtitle !== this.structureDefault.subtitle ? this.generateForm(): this.generateVoidForm();
  }

  randomNumber(){
    return Math.floor(Math.random() * 1000000);
  }

  generateVoidForm() {
    this.creating = true;
    console.log("Actual node", this.actualNode);
    console.log("ID",this.actualNode?.id);
    this.form = this.fb.group({
      id:       [this.actualNode?.id !== undefined ? this.actualNode.id : 
                    this.randomNumber()],
      title:    ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      text:     ['', [Validators.required]],
    });
  }

  generateForm() {
    this.photo = this.actualNode.photo;
    this.form = this.fb.group({
      id:       [this.actualNode.id      , [Validators.required]],
      title:    [this.actualNode.title   , [Validators.required]],
      subtitle: [this.actualNode.subtitle.split(' / ').reverse()[0], 
                  [Validators.required]],
      text:     [this.actualNode.text    , [Validators.required]],
    });
  }

  save(form:any){
    form.photo = this.photo;
    // Buscar todos los nodos padre de dicho nodo para poder darle el subtitulo
    // adecuado...
    const resp = this.recopilarSubtitles(this.structure.subtitle , this.structure,this.parentNode)
    console.log("%cFINALIZADA LA FUNCION DE SUBTITLES", "color:red;font-size:30px;font-weight:bold;");
    console.log(resp);
    console.log(resp.split(' / '));
    const array = resp.split(' / ');
    array.length === 1 && array[0] === '' ? array.splice(array.length -1,1): null;
    array.push(form.subtitle);
    form.subtitle = array.join(' / ');
    console.log("SUBTITLE",form.subtitle);
    this.mc.dismiss(form);
  }

  recopilarSubtitles(subtitle:string,node:any,parentNode:any) {
    console.log("################################")
    console.log("-------Funcion recopilacion-------")
    console.log("################################")
    console.log("Datos");
    console.log("subtitle",subtitle);
    console.log("node",node);
    console.log("parentNode",parentNode);
    if(node.id === 1 && this.actualNode?.id === node.id ){
      console.log("retorno vacio porque esta es la primera iteracion");
      return ''
    }
    else if(this.actualNode?.id === node.id){
      console.log("Retorno el subtitle porque el nodo es este")
      return subtitle;
    }else if(node.id === parentNode?.id && node.id !== 1){
      console.log("Agrego subtitle porque el padre es este");
      subtitle = `${subtitle} / ${node.subtitle.split(' / ').reverse()[0]}`
      return subtitle;
    }else if(node.id === 1 && node.id === parentNode?.id){
      return subtitle;
    }else if(node.id === 1){
      console.log("FATHER");
    }else{
      console.log("Agrego un subtitle en caso que ninguno de los dos se cumplan");
      subtitle = `${subtitle} / ${node.subtitle.split(' / ').reverse()[0]}`
    } 
    for(let i in node.childs){
      console.log("Revisando hijos")
      const resp = this.recopilarSubtitles(subtitle,node.childs[i],this.parentNode);
      if(resp !== `Error`){
        console.log("Retorno el subtitle porque esta en los childs");
        return resp;
      }
    }
    console.log("retorno error");
    return `Error`; 
  }

  editPhoto(){
    this.viUp.takeOnlyPhoto();
    this.viUp.content.pipe(take(1)).subscribe((r:string)=>this.photo = r);
  }
  
}
