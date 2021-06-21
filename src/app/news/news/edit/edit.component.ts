import { Component, OnInit,ViewChild } from '@angular/core';
import { NewsService } from '../../../service/news.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { UserService } from "../../../service/user.service";
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { ActionSheetController ,LoadingController, ModalController   } from '@ionic/angular';
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from '@angular/router';
import {  ElementRef } from "@angular/core";
import { NewQuestionComponent } from "src/app/components/new-question/new-question.component"
import { QuestionService } from 'src/app/service/question.service';
import { EditQuestionComponent } from 'src/app/components/edit-question/edit-question.component'
import { FilesService } from 'src/app/service/files.service';
import { ButtonsOptionsComponent } from '../buttons-options/buttons-options.component';
import { ModalProgramNewsComponent } from '../modal-program-news/modal-program-news.component';
import * as moment from 'moment';
import { truncate } from 'fs';
import { SubtitleNewsComponent } from '../subtitle-news/subtitle-news.component';

const { Camera ,Filesystem} = Plugins;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @ViewChild("openVideo") openVideo: any;
  @ViewChild("openVideoParrafo") openVideoParrafo: any;
  @ViewChild("editQuestionHash") editQuestionComponent:EditQuestionComponent;
  @ViewChild("sportyeah") sportyeah: any;
  @ViewChild("optionsBtn") optionsBtn: ButtonsOptionsComponent;

  //Para el subtitulo
  @ViewChild("subtitleNewsBtn") subtitleNewsBtn: SubtitleNewsComponent;

  @ViewChild("mainInputEdit") mainInputEdit: ElementRef;

  @ViewChild("mainInput") mainInput: ElementRef;
  constructor(
    public newsService:NewsService,
    public toastController: ToastController,
    private router:Router,
    public userService: UserService,
    private fb:FormBuilder,
    public translate: TranslateService,
    private actionSheetCtrl:ActionSheetController,
    private filesServices:FilesService,
    private loading:LoadingController,
    private route:ActivatedRoute,
    public questionService:QuestionService,
    public modalController: ModalController,
    public loadingCtrl: LoadingController,
    private popover: PopoverController,

  ) {
this.idNews = route.snapshot.paramMap.get('id')
this.form.value.id = this.idNews
   }
idNews

form = this.fb.group({
  user: ["", [Validators.required]],
  question: [null, [Validators.required]],
  headline: ["", [Validators.required]],
  principalSubtitle: ["", [Validators.required]],
  sport: ["", [Validators.required]],
  stream: [false, [Validators.required]],
  postStream: ["", [Validators.required]],
  date: ["", [Validators.required]],
});
  news
  subTitleAdd($event){
    this.subTitle = $event;
  }
  subTitleEdit($event,position){
    this.parrafos[position].subtitle = $event
  }
  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message:this.translate.instant('news.edited'),
      position: 'top',
      color: 'dark',
      duration: 3000,
    });
    toast.present();
  }

  ngOnInit() {
    this.newsService.findById(this.idNews).subscribe((response:any)=>{
      

      this.news = response.news
     
      this.videoSelected = response.news.principalVideo;
      this.urlVideo = response.news.principalVideo;
      this.imagenSelected = response.news.principalImage;
      this.principalYoutube = response.news.principalYoutube
      this.parrafos = response.news.content;
      this.titulo1 = response.news.headline;
      this.subTitlePrincipal = response.news.principalSubtitle;

      this.deporte = response.news.sport;
      this.origen = response.news.origin;
      this.originPrincipaMedia = response.news.originPrincipaMedia;
      // this.date = response.news.date;
      this.form.controls.date.setValue(moment(new Date(response.news.date)).format('YYYY-MM-DD'))
      this.audioNews = response.news.audioNews;
      this.programedDate = response.news.programatedDate
      if(response.news.principalSubtitle){
        this.subTitlebool = true;
      }
      if(response.news.principalImage || response.news.principalVideo){
        this.agregandoOrigenPrincipaMedia = true
      }
      if(response.news.audioNews){
        this.newsAudio = true;
      }
      this.subTitle = response.news.principalSubtitle;
      this.agregandoOrigen = true;
    })
  }
async editar(){
  let loading = await this.loadingCtrl.create({
    message: this.translate.instant("loading"),
  });
  loading.present();
  let news = this.form.value
  
  news.principalVideo = this.videoSelected;
  news.principalImage = this.imagenSelected;
  news.principalYoutube = this.principalYoutube  
  news.user = this.userService.User._id;
  news.headline = this.titulo1;
  news.principalSubtitle = this.subTitlePrincipal;
  news.content = await this.questionService.parrafoFilter(this.parrafos);
  
  news.origin = this.origen;
  news.originPrincipaMedia = this.originPrincipaMedia;
  news.audioNews = this.audioNews;
  news.programatedDate = this.programedDate
  if(this.programedDate != undefined){
    news.programated = true;
  }else{
    news.programated = false;
  }
  console.log(this.news.draftCopy);
  
  if(this.news.draftCopy == true){
    news.draftCopy = false;
  }
  news.sport = this.deporte;
  news.id = this.idNews;
   
  this.newsService.updateNews(news).subscribe((response) => {
      this.presentToastWithOptions();
      this.router.navigate(["news"]);
    });
    loading.dismiss();

}

fecha = new Date().getDate() + '/'+ (new Date().getMonth()+1) + '/' + new Date().getFullYear()
editando:boolean=false//si esta editando el agregar es disabled
imagen;//imagen mostrada
number:number = undefined//Posicion de el parrafo, pero no del array, 
positionEditactual:number=null; 
parrafoAntesEdicion;
parrafos=[];
  text1 ='' // `Escribe el párrafo # ${this.parrafos.length+1} `;
  titulo1= ``;
  subTitlePrincipal = '';
  subTitle = null;
  deporte= ``;
  sports=['soccer', 'basketball','tennis',
  'baseball','golf','running','volleyball',
  'swimming','boxing','table_tennis','rugby',
  'football','esport','various']

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  next(slides) {
    slides.slideNext();
  }

  prev(slides) {
    slides.slidePrev();
  }


  async consol(){
    await  this.subtitleNewsBtn.send()

    this.parrafos.push({
      subtitle: this.subTitle,
      parrafo: this.text1,
      position: this.parrafos.length,
      image: null,
      video: null,
      originMedia: null,
      online:undefined,
      url:undefined,
      link:undefined,
      format:'text'
    });
    this.text1 = ''
    this.subTitleParrafo = null
    this.agregandoParrafo = false
  }
  selectParrafo(){
    this.text1 =  this.parrafos[this.number].parrafo
  
    this.positionEditactual = this.number
    this.parrafoAntesEdicion = this.parrafos[this.number].parrafo
  }
  
  selectParrafoCards(position){
    this.number = position
    this.text1 =  this.parrafos[position].parrafo
 
    this.positionEditactual = position
    this.parrafoAntesEdicion = this.parrafos[position].parrafo
    this.editando = true
  }
  
  async EditParrafo(){
    await this.subtitleNewsBtn.edit()

    this.parrafos[this.positionEditactual].parrafo = this.text1;
    this.parrafos[this.positionEditactual].title = this.titulo1;
 
    this.positionEditactual = null
    this.editando = false
    this.text1 = ``
    this.agregandoParrafo = false
    this.number = undefined

  }
  eliminarParrafo(id){
    this.parrafos.splice(id,1)
    for(let i= id; i <= this.parrafos.length-1; i++){
      this.parrafos[i].position -= 1; 
    }
    id = null
    this.editando = false
    
    this.number = undefined

    this.text1 = ``
  
  }
  numberPositionSelect(number){
    this.number += number
  }
  cancelar(){
    this.positionEditactual = null
    this.parrafoAntesEdicion = null
    this.editando = false
    this.text1 = ``
    this.number = undefined
  }

  ////Imagenes
selectedImage(imag){
  this.imagen = imag;
}
/* deleteImage(){
  this.arrayImagenes = this.arrayImagenes.filter((imagenes)=>{
    return imagenes != this.imagen;
  })
  this.imagen = undefined
  if(this.arrayImagenes.length == 0 ){
    this.imagenSelected = undefined
  }
} */
goBackImage(){
  this.imagen = undefined
}

  ////////
arrayImagenes = [];
async takePhotoFrom(imagenType,i){
  let action = await this.actionSheetCtrl.create({
    header:this.translate.instant("img-options.header"),
    buttons:[
      {
      text:this.translate.instant("img-options.galery"),
      icon:'images',
      handler:()=>{
        if(imagenType=='principal'){
          this.takePrincipal(CameraSource.Photos)
        }else if('notPrincipal'){
          this.takePictures(CameraSource.Photos,i)
        }
      }
    },
    /* {//NUEVO
      text: this.translate.instant("img-options.grabar"),
      icon: "videocam",
      handler: () => {
        
      },
    }, */
    {//NUEVO
      text: this.translate.instant("img-options.galery"),
      icon: "videocam",
      handler: () => {
        if(imagenType=='principal'){
          this.video(this.openVideo)
        }else if('notPrincipal'){
          this.video(this.openVideoParrafo)
        }
      },
    },
    {
      text:this.translate.instant("cancel"),
      icon:'close',
      role:'cancel'
    }
  ]
  })
  action.present()
}
video(fileChooser: ElementRef) {
  fileChooser.nativeElement.click();
}


/* subirImage(){
  //no hace nada
 this.imagenSelected = this.arrayImagenes[0]
 
} */
async takePictures(source,i) {
  let formData = new FormData()

 Camera.getPhoto({
    source,
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    
  })
  .then(async (image)=>{
    let loading = await this.loading.create({message:this.translate.instant('loading')})
    loading.present()
    let blob = this.DataURIToBlob(image.dataUrl);
    formData.append('image', blob)
    this.filesServices.uploadImage(formData).toPromise()
    .then((url:string)=>{
      loading.dismiss()
      this.parrafos[i].image= url;
      this.openArray = false;
    })
    .catch((err)=>{
      loading.dismiss()
    })
    
    
    
   
    loading.dismiss()

  })
  .catch((err)=>{   
  })
}
async takePrincipal(source) {
  let formData = new FormData()

 Camera.getPhoto({
    source,
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    
  })
  .then(async (image)=>{
    let loading = await this.loading.create({message:this.translate.instant('loading')})
    loading.present()
    let blob = this.DataURIToBlob(image.dataUrl);
    formData.append('image', blob)
    this.filesServices.uploadImage(formData).toPromise()
    .then((url:string)=>{
      loading.dismiss() 
      this.imagenSelected = url 
      this.open = false;  
    })
    .catch((err)=>{
      loading.dismiss()
    }) 
    loading.dismiss()
  })
  .catch((err)=>{})
}
deleteImagePrincipal(){
  this.imagenSelected = null
  this.originPrincipaMedia = null;
  this.agregandoOrigenPrincipaMedia = false;
  this.open = false;
}

DataURIToBlob(dataURI: string) {
    
  const splitDataURI = dataURI.split(',')
  const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)

  return new Blob([ia], { type: mimeString })
}
//////
////


imagenSelected
open= false
clickImage(){
  this.open=true;
}
closeImage(){
  this.open=false
}
takeImage(img){
  this.imagenSelected = img
  this.open=false
}


//OPEN ARRAY
openArray=false
imagenACambiar
clickImageArray(i){
  this.imagenACambiar = i
  this.openArray=true;
}
closeImageArray(){
  this.openArray=false
}
takeImageArray(img,i){
  let copia = this.arrayImagenes
  let actual = this.arrayImagenes[this.imagenACambiar]
  let nueva = this.arrayImagenes[i]
  this.arrayImagenes.splice(this.imagenACambiar,1,nueva)
  this.arrayImagenes.splice(i,1,actual)
  this.openArray=false
  this.imagenACambiar= undefined;
}

deleteImage(i){
  this.parrafos[i].image = '';
  this.openArray = false;
 }

 ///Create Video
urlVideo = null
videoFile = null
videoSelected = null;
urlVideoNotPrincipal = null
videoFileNotPrincipal = null
closeVideoPrincipal(){
  this.urlVideo = null
  this.videoFile = null
  this.videoSelected = null;
  this.originPrincipaMedia = null;
  this.agregandoOrigenPrincipaMedia = false;
}
closeVideoNotPrincipal(i){
  this.parrafos[i].video = null;
}
async uploadVideo($event,type:string,i){
  let form = new FormData();
  if($event.target.files[0] && type == 'principal'){
    this.urlVideo = URL.createObjectURL($event.target.files[0])
    this.videoFile = $event.target.files[0]
    form.append("video", this.videoFile);
   await this.uploadVideoPrincipal(form)
  }else if($event.target.files[0] && type == 'notPrincipal'){
    
    this.urlVideoNotPrincipal = URL.createObjectURL($event.target.files[0])
    this.videoFileNotPrincipal = $event.target.files[0]
    form.append("video", this.videoFileNotPrincipal);
   await this.uploadVideoNotPrincipal(form,i)
  }else{
  }
}

uploadVideoPrincipal(video){
  this.filesServices.uploadVideo(video)
  .then((url)=>{
    this.videoSelected = url
  })
  .catch((err)=>{
  })
}
uploadVideoNotPrincipal(video,i){
  this.filesServices.uploadVideo(video)
  .then((url)=>{
    this.parrafos[i].video = url
  })
  .catch((err)=>{
  })
}
 
///
//Para verificar si exite un titulo o no
titlebool:boolean= true;
subTitlebool:boolean = false;
deportebool:boolean = false;
tituloListo(){
this.titlebool = !this.titlebool;
}
subTituloListo(i){
  this.subTitlebool = !this.subTitlebool;
}
deporteListo(){
  this.deporte = null
}
// es true si se esta agregando un parrafo
agregandoParrafo:boolean = false;
/* agregarParrafo(){
  agregandoParrafo
} */
listoPublicar:boolean = false
listoParaPublicar(){
  this.listoPublicar = !this.listoPublicar
}




//es true si se esta agregando un subtitulo
subTitleParrafo;
numberSubtitle;
agregandoSubtitulo:boolean = false;
editandoSubTitle:boolean = false;
positionEditactualSubtitle:number=null;
poisionAgregarSubtitulo; 
agregarSubtitulo(i){
this.parrafos[i].subtitle = this.subTitleParrafo
this.agregandoSubtitulo = false;
}
cancelarSubtitle(){
  this.numberSubtitle = null;
  this.editandoSubTitle = false;
  this.subTitleParrafo = null;
  this.positionEditactualSubtitle = null;
}
editandoSubtitulo(){
  this.parrafos[this.positionEditactualSubtitle].subtitle = this.subTitleParrafo;
  this.editandoSubTitle = false
  this.positionEditactualSubtitle = null;
  this.subTitleParrafo = null;
}
selectsubTitulo(position){
  this.positionEditactualSubtitle = position;
  this.numberSubtitle = position
  this.subTitleParrafo =  this.parrafos[position].subtitle
  this.editandoSubTitle = true
}
eliminarSubtitulo(){
  this.parrafos[this.positionEditactualSubtitle].subtitle = null;
  this.editandoSubTitle = false
  this.positionEditactualSubtitle = null;
  this.subTitleParrafo = null;
}



//Origen de la noticia
agregandoOrigen:boolean = false;
origen;
origenSelect = [
{value:0,origenSelect:"Mío"},
{value:1,origenSelect:"Otra fuente"}
]
miNoticia = undefined;f
origenListoMio(){
  if(this.miNoticia == 0){
    this.origen = 'De mi propiedad'
    this.miNoticia = undefined;
    this.agregandoOrigen = true;
  }else if(this.miNoticia == 1){
    this.origen = undefined;
    this.agregandoOrigen = false;
  }
}
origenListo(change){
  if(change == 0){
this.miNoticia = undefined;
this.origen = undefined
this.agregandoOrigen = false;
  }else if(change == 1){
  this.agregandoOrigen = true;
  }
}


//Origen de las imagenes de parrafos
agregandoOrigenParrafo;
originParrafoMedia;
todosParrafosConOrigen:boolean = false;
MiParrafoMedia = undefined;
origenParrafoMedia = [
  {value:0,origenSelect:"Mío"},
  {value:1,origenSelect:"Otra fuente"}
  ]
  origenParrafoListoMio(i){
    if(this.MiParrafoMedia == 0){
      this.parrafos[i].originMedia = 'De mi propiedad'
      this.MiParrafoMedia = undefined;
    }else if(this.MiParrafoMedia == 1){
      this.parrafos[i].originMedia = undefined;
      this.originParrafoMedia = undefined;
    }
  }
origenParrafoListo(i,change){
  if(change == 0){
    this.parrafos[i].originMedia = this.originParrafoMedia;
    this.MiParrafoMedia = undefined;
  }else if(change == 1){
    this.parrafos[i].originMedia = undefined;
    this.MiParrafoMedia = undefined;
  }
  //this.agregandoOrigenParrafo = !this.agregandoOrigenParrafo;
  this.originParrafoMedia = null;
}
origenParrafoEditar(i){
 this.originParrafoMedia = this.parrafos[i].originMedia
 this.parrafos[i].originMedia = null
}
todoConOrigen(){
// this.whitTime = this.editQuestionComponent.whitTime;
// this.endDate = this.editQuestionComponent.endDate;
  this.todosParrafosConOrigen = false
  for(let parrafo of this.parrafos){
    if((parrafo.video || parrafo.image ) && (parrafo.originMedia == null) ){
      this.todosParrafosConOrigen = true
    }
  }
  this.checkNoVacio() 
  if(this.todosParrafosConOrigen ){
    this.ToastError('Asegurate de que todos los archivos multimedia tengan origen')
  }
  if(!this.todosParrafosConOrigen && this.checkNoVacio()){
    this.listoParaPublicar()
  }
}

//cheka que no exista campo importante vacio 
 checkNoVacio() {
   let ok:boolean = true
  this.titulo1 = this.titulo1.trim();
  if ( this.titulo1.length != 0) {
  } else { 
    this.ToastError('El título no puede estar vacio')
    this.titlebool = false;
    ok = false
}

  this.subTitle = this.subTitle.trim();
  if ( this.subTitle.length != 0) {
  } else { 
    this.ToastError('El subtítulo no puede estar vacio')
    this.subTitlebool = false;
    ok = false
  }

  this.origen = this.origen.trim();
  if ( this.origen.length != 0) {
  } else {
  this.ToastError('El origen no puede estar vacio')
  this.agregandoOrigen = false;  
  ok = false
}

  if(this.urlVideo || this.imagenSelected){
    this.originPrincipaMedia = this.originPrincipaMedia.trim();
    if ( this.originPrincipaMedia.length != 0) {
    } else { 
      this.ToastError('El origen de foto o video no puede estar vacio')
      this.agregandoOrigenPrincipaMedia = false;
      ok = false
    }
  }

  return ok
}

async ToastError(message) {
  const toast = await this.toastController.create({
    header: this.translate.instant('analytics-views.information'),
    message:this.translate.instant(message),
    position: 'top',
    color: 'dark',
    duration: 4000,
    buttons: [
      {
        text: 'Cerrar',
        role: 'cancel',
        handler: () => {
          
        }
      }
    ]
  });
  toast.present();
}


//Origen de las imagenes Principal
agregandoOrigenPrincipaMedia:boolean = false;
originPrincipaMedia;
MiprincipalMedia = undefined;
principalMedia = [
  {value:0,origenSelect:"Mío"},
  {value:1,origenSelect:"Otra fuente"}
  ]
  originPrincipaMediaListoMio(){
    if(this.MiprincipalMedia == 0){
      this.originPrincipaMedia = 'De mi propiedad'
      this.MiprincipalMedia = undefined;
      this.agregandoOrigenPrincipaMedia = true;
    }else if(this.MiprincipalMedia == 1){
      this.originPrincipaMedia = undefined;
      this.agregandoOrigenPrincipaMedia = false;
    }
  }
originPrincipaMediaListo(change){
  if(change == 0){
    this.MiprincipalMedia = undefined;
    this.originPrincipaMedia = undefined
    this.agregandoOrigenPrincipaMedia = false;
  }else if(change == 1){
      this.agregandoOrigenPrincipaMedia = true;
  }
}
redactarArticulo:boolean = false;
redactar(){
this.redactarArticulo = true;
}


question = {
  user: this.userService.User._id,
  questionGroup: [],
  finishVotes:undefined
}
editNewsQuestion(news,loading){
  this.questionService.create(this.question).subscribe((response:any)=>{//Crea el cuestionario y agrega el id al news
    news.question = response._id  
    this.newsService.updateNews(this.form.value).subscribe((response)=>{
      this.presentToastWithOptions()
      this.router.navigate([`news/read/${this.news._id}`])
    })
  })
  loading.dismiss();
}
editNewsAndQuestion(news: any,loading) {
  if(this.whitTime  &&
    new Date(this.endDate) >= new Date()){
    this.question.finishVotes = new Date(this.endDate)
    this.badDate = false;
     this.editNewsQuestion(news,loading)
   }else{
     this.badDate = true;
     loading.dismiss();
   }
   if(!this.whitTime){
     this.badDate = false;
     this.editNewsQuestion(news,loading)
   }
}
whitTime:boolean;
endDate;
badDate:boolean=false;

//Crea una modal donde se pueden crear preguntas 
async createQuestion() {
  const modal = await this.modalController.create({
    component: NewQuestionComponent,
    cssClass: "my-custom-class",
    backdropDismiss: false,
    componentProps: {
      edit: false,
    },
  });
  modal
    .onDidDismiss()
    .then((data) => {
      if (data.data.question != undefined) {
        this.question.questionGroup.push(data.data.question); //Las preguntas creadas se introducen en el grupo de preguntas
      }
    })
    .catch((err) => {});
  return await modal.present();
}
// async editQuestion(i){
// const modalEdit = await this.modalController.create({
//   component: NewQuestionComponent,
//   cssClass: 'my-custom-class',
//   backdropDismiss:false,
//   componentProps: {
//     question:this.question.questionGroup[i],
//     edit:true
//   }
// });
// modalEdit.onDidDismiss().then((data)=>{
//   if(data.data.question != undefined){
//     this.question.questionGroup.splice(i,1,data.data.question);
//   }
  
// })
// .catch((err) => {
// });
// return await modalEdit.present();
// }
deleteQuestion(i){
this.question.questionGroup.splice(i,1);
}


addFile(file) {
  this.parrafos.push({
    subtitle: null,
    parrafo: undefined,
    position: this.parrafos.length,
    image: (file.format =='image' || file.format == 'imageGif')?file.url:null,
    video: file.format =='video'?file.url:null,
    originMedia: null,
    online:undefined,
    url:undefined,
    link:file.format =='link'?file.url:null,
    format:file.format
  });
}
editFile(format,i){
  this.optionsBtn.editFile(format,i)
}
editedFile(file){

  this.parrafos[file.position] = {
    subtitle: null,
    parrafo: undefined,
    position: file.position,
    image: (file.format =='image' || file.format == 'imageGif')?file.url:null,
    video: file.format =='video'?file.url:null,
    originMedia: null,
    online:undefined,
    url:undefined,
    link:file.format =='link'?file.url:null,
    format:file.format
  }

}
editLink(i){
  this.optionsBtn.editedLink(i);
}
editedLink(file){
  this.parrafos[file.position] = {
    subtitle: null,
    parrafo: undefined,
    position: file.position,
    image: null,
    video: null,
    originMedia: null,
    online:undefined,
    url:undefined,
    link:file.url,

  }
}
videosToUploads = []
pushVideoToUpload(file) {
  this.videosToUploads.push(file);
}
addVideoPrincipal(file){
  if(file.format == 'video'){
    this.videoSelected = file.url;
  }else{
    this.imagenSelected = file.url;
  }
}
agregandoYoutubePrincipal = false
principalYoutube
addYoutubePrincipal(){
  this.principalYoutube  =   this.mainInput.nativeElement.innerHTML
  this.agregandoYoutubePrincipal = false
}
editYoutubePrincipal = false;
saveEditYoutubePrincipal(){
  this.principalYoutube  =   this.mainInputEdit.nativeElement.innerHTML
  this.editYoutubePrincipal = false
}
eliminarYoutube(){
  this.principalYoutube = null;
}

addYoutube(){
  if(this.mainInput.nativeElement.innerHTML){
    this.parrafos.push({
      subtitle: null,
      parrafo: undefined,
      position: this.parrafos.length,
      image: null,
      video: null,
      originMedia: 'Youtube.com ' + this.mainInput.nativeElement.innerHTML ,
      url:this.mainInput.nativeElement.innerHTML,
      link:undefined,
      format:'youtube'
    });
  }
this.agregandoYoutube = false
}
saveEditYoutube(i){
  if(this.mainInputEdit.nativeElement.innerHTML){
    this.parrafos[i] = {
      subtitle: null,
      parrafo: undefined,
      position: i,
      image: null,
      video: null,
      originMedia: 'Youtube.com ' + this.mainInputEdit.nativeElement.innerHTML ,
      url:this.mainInputEdit.nativeElement.innerHTML,
      link:undefined,
      format:'youtube'
    };
  }
this.editYoutube = false
}
editYoutube:boolean = false;
agregandoYoutube:boolean = false;

newQuestion($event) {
 let question = {
    user: this.userService.User._id,
    questionGroup:$event,
    finishVotes: undefined,
  };
  this.question.questionGroup.push($event) ;
  this.parrafos.push({
    subtitle: null,
    parrafo: undefined,
    position: this.parrafos.length,
    image: null,
    video: null,
    originMedia: undefined ,
    online:undefined,
    url:undefined,
    link:undefined,
    question,
    format:'question'
  }) 
}
questionEdited($event) {
  let question = {
     user: this.userService.User._id,
     questionGroup:$event.question,
     finishVotes: undefined,
   };
   this.parrafos[$event.position] = {
     subtitle: null,
     parrafo: undefined,
     position: $event.position,
     image: null,
     video: null,
     originMedia: undefined ,
     online:undefined,
     url:undefined,
     link:undefined,
     question
   }
 }
 async editQuestion(question,i) {
  this.optionsBtn.editQuestion(question.questionGroup,i);
}


 audioNews
 date
 /**
 * Envia un audio por el chat
 * @param url url del audio
 */
msgAudio(url) {
  this.audioNews = url;
  this.newsAudio = true;
}
deleteAudio(){
  this.audioNews = null;
  this.newsAudio = false;
}

newsAudio:boolean=false

popoverOpen
programedDate 
async porgramDate(){
  // if (this.isPost) {
    if (!this.popoverOpen) {

      let popover = await this.popover.create({
        component: ModalProgramNewsComponent,
        componentProps: {
          date:moment(this.programedDate).format("YYYY-MM-DD"),
          edited:true,
        },
      });
      popover.onDidDismiss().then((data) => {
        try{

            if(data.data != undefined && data.data.option == 'accept' ){
              this.programedDate = data.data.date
            }else if(data.data.date == undefined && data.data.option !='cancel' ){
              this.programedDate = undefined
            }
            this.popoverOpen = false;
        }catch(err){}

      });
      return popover.present();
    }
}
}
