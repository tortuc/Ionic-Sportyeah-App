import { Component, OnInit,ViewChild } from '@angular/core';
import { NewsService } from '../../../service/news.service';
import { ToastController } from '@ionic/angular';
import { UserService } from "../../../service/user.service";
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { ActionSheetController ,LoadingController, ModalController   } from '@ionic/angular';
import { TranslateService } from "@ngx-translate/core";
import { JdvimageService } from 'src/app/service/jdvimage.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  ElementRef } from "@angular/core";
import { NewQuestionComponent } from "src/app/components/new-question/new-question.component"
import { QuestionService } from 'src/app/service/question.service';

const { Camera ,Filesystem} = Plugins;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @ViewChild("openVideo") openVideo: any;
  @ViewChild("openVideoParrafo") openVideoParrafo: any;
  constructor(
    public newsService:NewsService,
    public toastController: ToastController,
    private router:Router,
    public userService: UserService,
    private fb:FormBuilder,
    public translate: TranslateService,
    private actionSheetCtrl:ActionSheetController,
    private jdvImage:JdvimageService,
    private loading:LoadingController,
    private route:ActivatedRoute,
    public questionService:QuestionService,
    public modalController: ModalController,
  ) {
this.idNews = route.snapshot.paramMap.get('id')
this.form.value.id = this.idNews
   }
idNews

  form = this.fb.group({
    id:[''],
    user:['',[Validators.required]],
    question:[null,[Validators.required]],
    headline:['',[Validators.required]],
    content:['',[Validators.required]],
    //image:['',[Validators.required]],
    principalSubtitle:['',[Validators.required]],
    principalImage:['',[Validators.required]],
    principalVideo:['',[Validators.required]],
    origin:['',[Validators.required]],
    originPrincipaMedia:['',[Validators.required]],
    sport:['',[Validators.required]]
  })
  news

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
      this.parrafos = response.news.content;
      this.titulo1 = response.news.headline;
      this.deporte = response.news.sport;
      this.origen = response.news.origin;
      this.originPrincipaMedia = response.news.originPrincipaMedia;
      this.question.questionGroup = response.question
      if(response.news.principalSubtitle){
        this.subTitlebool = true;
      }
      if(response.news.principalImage || response.news.principalVideo){
        this.agregandoOrigenPrincipaMedia = true
      }
      this.subTitle = response.news.principalSubtitle;
      this.agregandoOrigen = true;
    })
  }

async editar(){
  let loading = await this.loading.create({
    message: this.translate.instant("loading"),
  });
  loading.present();
    this.form.value.principalVideo = this.videoSelected;
    this.form.value.principalImage = this.imagenSelected;
    this.form.value.user = this.userService.User._id 
    this.form.value.headline = this.titulo1;
    this.form.value.principalSubtitle = this.subTitle;
    this.form.value.content = this.parrafos
    this.form.value.origin = this.origen
    this.form.value.originPrincipaMedia = this.originPrincipaMedia
    this.form.value.sport = this.deporte

    if(this.question.questionGroup.length > 0){
      this.editNewsAndQuestion(this.form.value,loading)
    }else{
      this.newsService.updateNews(this.form.value).subscribe((response)=>{
        this.presentToastWithOptions()
        this.router.navigate([`news/read/${this.news._id}`])
      })
      loading.dismiss();
    }

    
}

fecha = new Date().getDate() + '/'+ (new Date().getMonth()+1) + '/' + new Date().getFullYear()
editando:boolean=false//si esta editando el agregar es disabled
imagen;//imagen mostrada
number:number = 0//Posicion de el parrafo, pero no del array, 
positionEditactual:number=null; 
parrafoAntesEdicion;
parrafos=[];
  text1 = `Escribe el párrafo # ${this.parrafos.length+1} `;
  titulo1= ``;
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


  consol(){
    let subtitulo
    if(this.parrafos.length == 0){
      subtitulo = null 
    }else{
      subtitulo = this.subTitleParrafo 
    } 
    this.parrafos.push({subtitle:subtitulo,parrafo:this.text1,position:this.parrafos.length,image:'',video:null})
    this.text1 = `Escribe el párrafo # ${this.parrafos.length+1} `
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
  
  EditParrafo(){
    this.parrafos[this.positionEditactual].parrafo = this.text1;
    this.parrafos[this.positionEditactual].title = this.titulo1;
 
    this.positionEditactual = null
    this.editando = false
    this.text1 = `Escribe el párrafo # ${this.parrafos.length+1} `
    this.agregandoParrafo = false
  }
  eliminarParrafo(id){
    this.parrafos.splice(id,1)
    for(let i= id; i <= this.parrafos.length-1; i++){
      this.parrafos[i].position -= 1; 
    }
    id = null
    this.editando = false
    if(this.number != 0 && this.number == this.parrafos.length){
      this.number -= 1
    }
    
    this.text1 = `Escribe el párrafo # ${this.parrafos.length+1} `
  
  }
  numberPositionSelect(number){
    this.number += number
  }
  cancelar(){
    this.positionEditactual = null
    this.parrafoAntesEdicion = null
    this.editando = false
    this.text1 = `Escribe el párrafo # ${this.parrafos.length+1} `

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
    this.jdvImage.uploadImage(formData).toPromise()
    .then((url:string)=>{
      loading.dismiss()
      this.parrafos[i].image= url;
      this.openArray = false;
    })
    .catch((err)=>{
      loading.dismiss()
      console.error(err);
    })
    
    
    
   
    loading.dismiss()
  /* 
      this.jdvImage.uploadImage(formData).toPromise()
        .then((url:string)=>{
          loading.dismiss()
        this.userService.update({photo:url})
          .toPromise()
          .then((resp)=>{
            this.userService.User.photo = url
          }) 
        })
        .catch((err)=>{
          loading.dismiss()
          console.error(err);
          
        })*/
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
    this.jdvImage.uploadImage(formData).toPromise()
    .then((url:string)=>{
      loading.dismiss() 
      this.imagenSelected = url 
      this.open = false;  
    })
    .catch((err)=>{
      loading.dismiss()
      console.error(err);
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
  console.log(i)
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
    console.log($event.target.files[0])
   await this.uploadVideoNotPrincipal(form,i)
  }else{
    console.log('No has seleccionado ningun video')
  }
}

uploadVideoPrincipal(video){
  this.jdvImage.uploadVideo(video)
  .toPromise()
  .then((url)=>{
    this.videoSelected = url
  })
  .catch((err)=>{
    console.log('No se subio el mmg video')
  })
}
uploadVideoNotPrincipal(video,i){
  this.jdvImage.uploadVideo(video)
  .toPromise()
  .then((url)=>{
    this.parrafos[i].video = url
  })
  .catch((err)=>{
    console.log('No se subio el mmg video NOTPREINCIPAL')
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
miNoticia = undefined;
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
  console.log(this.titulo1.length)
  if ( this.titulo1.length != 0) {
    console.log('Sin espacios')
  } else { 
    this.ToastError('El título no puede estar vacio')
    this.titlebool = false;
    ok = false
}

  this.subTitle = this.subTitle.trim();
  console.log(this.subTitle.length)
  if ( this.subTitle.length != 0) {
    console.log('Sin espacios')
  } else { 
    this.ToastError('El subtítulo no puede estar vacio')
    this.subTitlebool = false;
    ok = false
  }

  this.origen = this.origen.trim();
  console.log(this.origen.length)
  if ( this.origen.length != 0) {
    console.log('Sin espacios')
  } else {
  this.ToastError('El origen no puede estar vacio')
  this.agregandoOrigen = false;  
  ok = false
}

  if(this.urlVideo || this.imagenSelected){
    this.originPrincipaMedia = this.originPrincipaMedia.trim();
    console.log(this.originPrincipaMedia.length)
    if ( this.originPrincipaMedia.length != 0) {
      console.log('Sin espacios')
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
}
editNewsAndQuestion(news: any,loading) {
  this.questionService.create(this.question).subscribe((response:any)=>{//Crea el cuestionario y agrega el id al news
    news.question = response._id  
   
    this.newsService.updateNews(this.form.value).subscribe((response)=>{
      this.presentToastWithOptions()
      this.router.navigate([`news/read/${this.news._id}`])
    })
  })
  loading.dismiss();
}


//Crea una modal donde se pueden crear preguntas 
async createQuestion(){
const modal = await this.modalController.create({
  component: NewQuestionComponent,
  cssClass: 'my-custom-class',
  backdropDismiss:false
  ,
  componentProps: {
  
    edit:false
  }
});
modal.onDidDismiss().then((data)=>{
  if(data.data.question != undefined){
    this.question.questionGroup.push(data.data.question) //Las preguntas creadas se introducen en el grupo de preguntas
  }
  console.log(this.question.questionGroup)
})
.catch((err) => {
  console.log(err)
});

return await modal.present();
}
async editQuestion(i){
const modalEdit = await this.modalController.create({
  component: NewQuestionComponent,
  cssClass: 'my-custom-class',
  backdropDismiss:false,
  componentProps: {
    question:this.question.questionGroup[i],
    edit:true
  }
});
modalEdit.onDidDismiss().then((data)=>{
  if(data.data.question != undefined){
    this.question.questionGroup.splice(i,1,data.data.question);
  }
  
})
.catch((err) => {
  console.log(err)
});
return await modalEdit.present();
}
deleteQuestion(i){
this.question.questionGroup.splice(i,1);
}

}
