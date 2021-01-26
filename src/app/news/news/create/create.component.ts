import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormControl,FormGroup} from '@angular/forms';
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "../../../service/user.service";
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

number:number = 0//Posicion de el parrafo, pero no del array, 
positionEditactual:number=null; 
parrafoAntesEdicion;
parrafos=[];
  text1 = `Escribe el párrafo # ${this.parrafos.length+1} `;
  titulo1= `Escribe el Titulo # ${this.parrafos.length+1} `;
  subtitulo1= `Escribe el Subtitulo # ${this.parrafos.length+1} `;
  consol(){
  this.parrafos.push({parrafo:this.text1,position:this.parrafos.length,title:this.titulo1,subtitle:this.subtitulo1})
  this.text1 = `Escribe el párrafo # ${this.parrafos.length+1} `
  this.titulo1= `Escribe el Titulo # ${this.parrafos.length+1} `;
  this.subtitulo1= `Escribe el Subtitulo # ${this.parrafos.length+1} `;
  console.log(this.parrafos)
}
selectParrafo(){
  this.text1 =  this.parrafos[this.number].parrafo
  this.titulo1 =  this.parrafos[this.number].title
  this.subtitulo1 =  this.parrafos[this.number].subtitle
  this.positionEditactual = this.number
  this.parrafoAntesEdicion = this.parrafos[this.number].parrafo
}

selectParrafoCards(position){
  this.number = position
  this.text1 =  this.parrafos[position].parrafo
  this.titulo1 =  this.parrafos[position].title
  this.subtitulo1 =  this.parrafos[position].subtitle
  this.positionEditactual = position
  this.parrafoAntesEdicion = this.parrafos[position].parrafo
}

EditParrafo(){
  this.parrafos[this.positionEditactual].parrafo = this.text1;
  this.parrafos[this.positionEditactual].title = this.titulo1;
  this.parrafos[this.positionEditactual].subtitle = this.subtitulo1;
  this.positionEditactual = null
  this.text1 = `Escribe el párrafo # ${this.parrafos.length+1} `
  this.titulo1= `Escribe el Titulo # ${this.parrafos.length+1} `;
  this.subtitulo1= `Escribe el Subtitulo # ${this.parrafos.length+1} `;
}
eliminarParrafo(){
  this.parrafos.splice(this.positionEditactual,1)
  for(let i= this.positionEditactual; i <= this.parrafos.length-1; i++){
    this.parrafos[i].position -= 1; 
  }
  this.positionEditactual = null
  if(this.number != 0 && this.number == this.parrafos.length){
    this.number -= 1
  }
  
  this.text1 = `Escribe el párrafo # ${this.parrafos.length+1} `
  this.titulo1= `Escribe el Titulo # ${this.parrafos.length+1} `;
  this.subtitulo1= `Escribe el Subtitulo # ${this.parrafos.length+1} `;
}
numberPositionSelect(number){
  this.number += number
}
cancelar(){
  this.positionEditactual = null
  this.parrafoAntesEdicion = null
}

imprimir(){
  console.log(this.parrafos)
}
  ngOnInit(): void {
 
  }
  /* constructor(
    private fb:FormBuilder,
    public userService: UserService,
    public translate: TranslateService,
  ) { }

  ngOnInit() {}
console(){
 
}

texto;
  profileForm = new FormGroup({
    htmlContent1: new FormControl(''),
    htmlContent2: new FormControl(''),
  });

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize','backgroundColor']
    ]
}; */

}
