import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../service/news.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from "../../../service/user.service";
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { ActionSheetController, LoadingController, ModalController   } from '@ionic/angular';
import { TranslateService } from "@ngx-translate/core";
import { JdvimageService } from 'src/app/service/jdvimage.service';

const { Camera ,Filesystem} = Plugins;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {

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

  ) { }

  form = this.fb.group({
    id:[this.newsService.editNews],
    user:['',[Validators.required]],
    headline:['',[Validators.required]],
    content:['',[Validators.required]],
    //image:['',[Validators.required]],
    principalImage:['',[Validators.required]],
    principalVideo:['',[Validators.required]],
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
    this.newsService.findById(this.newsService.editNews).subscribe((response:any)=>{
      this.news = response.news
      console.log(response.news)
      this.videoSelected = response.news.principalVideo;
      this.urlVideo = response.news.principalVideo;
      this.imagenSelected = response.news.principalImage;
     // this.arrayImagenes = response.news.image;
      this.parrafos = response.news.content;
      this.titulo1 = response.news.headline;
      this.deporte = response.news.sport;
    })
  }

editar(){
    this.form.value.principalVideo = this.videoSelected;
    this.form.value.principalImage = this.imagenSelected;
    this.form.value.user = this.userService.User._id 
    this.form.value.headline = this.titulo1;
    this.form.value.content = this.parrafos
    //this.form.value.image = this.arrayImagenes
    this.form.value.sport = this.deporte
    this.newsService.updateNews(this.form.value).subscribe((response)=>{
      this.presentToastWithOptions()
      this.newsService.openNews = this.newsService.editNews
      this.router.navigate(["news/read"])
    })
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
    this.parrafos.push({parrafo:this.text1,position:this.parrafos.length,image:'',video:null})
    this.text1 = `Escribe el párrafo # ${this.parrafos.length+1} `
   
   
    console.log(this.parrafos)
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
  
  }
  eliminarParrafo(){
    this.parrafos.splice(this.positionEditactual,1)
    for(let i= this.positionEditactual; i <= this.parrafos.length-1; i++){
      this.parrafos[i].position -= 1; 
    }
    this.positionEditactual = null
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
    
    {
      text:this.translate.instant("cancel"),
      icon:'close',
      role:'cancel'
    }
  ]
  })
  action.present()
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
 



}
