import { Component, OnChanges, OnInit, ViewChild,ElementRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "../../../service/user.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import * as moment from "moment";
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import {
  ActionSheetController,
  LoadingController,
  ModalController,
  PopoverController,
} from "@ionic/angular";
import { NewsService } from "../../../service/news.service";
import { ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
import { QuestionService } from "src/app/service/question.service";
import { NewQuestionComponent } from "src/app/components/new-question/new-question.component";
import { EditQuestionComponent } from "src/app/components/edit-question/edit-question.component";
import { ButtonsOptionsComponent } from "../buttons-options/buttons-options.component";
import { FilesService } from "src/app/service/files.service";
import { ModalProgramNewsComponent } from "../modal-program-news/modal-program-news.component";
import { MentionsDirective } from "src/app/directives/mentions.directive";
import { SubtitleNewsComponent } from "../subtitle-news/subtitle-news.component";
import { AftherCreateNewsComponent } from "../afther-create-news/afther-create-news.component";

const { Camera } = Plugins;

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit,OnChanges {
  @ViewChild("openVideo") openVideo: any;
  @ViewChild("openVideoParrafo") openVideoParrafo: any;
  @ViewChild("sportyeah") sportyeah: any;
  @ViewChild("editQuestionHash") editQuestionComponent: EditQuestionComponent;
  @ViewChild("optionsBtn") optionsBtn: ButtonsOptionsComponent;

  
  @ViewChild("mainInputEdit") mainInputEdit: ElementRef;

  @ViewChild("mainInput") mainInput: ElementRef;

ngOnChanges(){
}
urlYu

  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    public translate: TranslateService,
    private modalCtrl: ModalController,
    private loading: LoadingController,
    private filesServices: FilesService,
    private actionSheetCtrl: ActionSheetController,
    public newsService: NewsService,
    public toastController: ToastController,
    private router: Router,
    public questionService: QuestionService,
    public modalController: ModalController,
    public loadingCtrl: LoadingController,
    private popover: PopoverController,
  ) {
    if(this.userService.User.profile_user != 'press'){
      this.router.navigate([`news`])
    }
  }
  @ViewChild("subtitleNewsBtn") subtitleNewsBtn: SubtitleNewsComponent;
 
  subTitleAdd($event){
    this.subTitle = $event;
  }
  subTitleEdit($event,position){
    this.parrafos[position].subtitle = $event
  }
  form = this.fb.group({
    user: [""],
    headline: [""],
    principalSubtitle: [""],
    sport: [""],
    stream: [false],
    postStream: [""],
    date: [""],
    programated: [null],
  });

  async presentToastWithOptions(draft) {
    let message 
    if(draft == false){
      message = this.translate.instant("news.published") 
    }else{
      message = this.translate.instant("news.saved_draft_copy") 
    }
    const toast = await this.toastController.create({
      message ,
      position: "top",
      color: "dark",
      duration: 3000,
    });
    toast.present();
  }
  news;
  published;
  async publicar(draft) {
    let loading = await this.loadingCtrl.create({
      message: this.translate.instant("loading"),
    });
    loading.present();
    this.news.draftCopy = draft;
      this.newsService.create(this.news).subscribe((response:any) => {
        this.presentToastWithOptions(draft);
        this.published = response._id;
        this.newsCreated(response)
        loading.dismiss();
      });
  }
  fecha =
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear();
  editando: boolean = false; //si esta editando el agregar es disabled
  imagen; //imagen mostrada
  number: number = undefined; //Posicion de el parrafo, pero no del array,
  positionEditactual: number = null;
  parrafoAntesEdicion;
  parrafos = [];

  today = moment().format("YYYY-MM-DD")
  text1 = ``;
  titulo1 = null;
  deporte = null;
  subTitle = null;
  subTitlePrincipal = null;
  sports = [
    "soccer",
    "basketball",
    "tennis",
    "baseball",
    "golf",
    "running",
    "volleyball",
    "swimming",
    "boxing",
    "table_tennis",
    "rugby",
    "football",
    "esport",
    "various",
  ];
  date;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  next(slides) {
    slides.slideNext();
  }

  prev(slides) {
    slides.slidePrev();
  }

  async consol() {
   
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
    }); //title:this.titulo1,subtitle:this.deporte
    this.text1 = ``;
    /* this.titulo1= `Escribe el Titulo # ${this.parrafos.length+1} `;
  this.deporte= `Escribe el Subtitulo # ${this.parrafos.length+1} `; */
    this.agregandoParrafo = false;
    this.subTitleParrafo = null;
  }
  selectParrafo() {
    this.text1 = this.parrafos[this.number].parrafo;
    /*  this.titulo1 =  this.parrafos[this.number].title
  this.deporte =  this.parrafos[this.number].subtitle */
    this.positionEditactual = this.number;
    this.parrafoAntesEdicion = this.parrafos[this.number].parrafo;
  }

  selectParrafoCards(position) {
    this.number = position;
    this.text1 = this.parrafos[position].parrafo;
    /*  this.titulo1 =  this.parrafos[position].title
  this.deporte =  this.parrafos[position].subtitle */
    this.positionEditactual = position;
    this.parrafoAntesEdicion = this.parrafos[position].parrafo;
    this.editando = true;
  }

  async EditParrafo() {
    await this.subtitleNewsBtn.edit()
    this.parrafos[this.positionEditactual].parrafo = this.text1;
    //this.parrafos[this.positionEditactual].title = this.titulo1;
    // this.parrafos[this.positionEditactual].subtitle = this.deporte;
    this.positionEditactual = null;
    this.editando = false;
    this.text1 = ``;
    /*   this.titulo1= `Escribe el Título # ${this.parrafos.length+1} `;
  this.deporte= `Escribe el Subtítulo # ${this.parrafos.length+1} `; */
    this.agregandoParrafo = false;
    this.number = undefined
  }
  eliminarParrafo(id) {
    this.parrafos.splice(id, 1);
    for (let i = id; i <= this.parrafos.length - 1; i++) {
      this.parrafos[i].position -= 1;
    }
    id = null;
    this.editando = false;
    // if (this.number != 0 && this.number == this.parrafos.length) {
    //   this.number -= 1;
    // }

    this.number = undefined

    this.text1 = ``;
    /*   this.titulo1= `Escribe el Título # ${this.parrafos.length+1} `;
  this.deporte= `Escribe el Subtítulo # ${this.parrafos.length+1} `; */
    this.agregandoParrafo = false;
  }
  numberPositionSelect(number) {
    this.number += number;
  }
  cancelar() {
    this.positionEditactual = null;
    this.parrafoAntesEdicion = null;
    this.editando = false;
    this.text1 = ``;
    /*  this.titulo1= `Escribe el Título # ${this.parrafos.length+1} `;
  this.deporte= `Escribe el Subtítulo # ${this.parrafos.length+1} `; */
    this.agregandoParrafo = false;
    this.number = undefined
  }


  ////Imagenes
  selectedImage(imag) {
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
  goBackImage() {
    this.imagen = undefined;
  }

  ////////
  arrayImagenes = [];
  async takePhotoFrom(imagenType, i) {
    let action = await this.actionSheetCtrl.create({
      header: this.translate.instant("img-options.header"),
      buttons: [
        {
          text: this.translate.instant("img-options.galery"),
          icon: "images",
          handler: () => {
            if (imagenType == "principal") {
              this.takePrincipal(CameraSource.Photos);
            } else if ("notPrincipal") {
              this.takePictures(CameraSource.Photos, i);
            }
          },
        },
        /* {//NUEVO
      text: this.translate.instant("img-options.grabar"),
      icon: "videocam",
      handler: () => {
        
      },
    }, */
        {
          //NUEVO
          text: this.translate.instant("img-options.galery"),
          icon: "videocam",
          handler: () => {
            if (imagenType == "principal") {
              this.video(this.openVideo);
            } else if ("notPrincipal") {
              this.video(this.openVideoParrafo);
            }
          },
        },
        {
          text: this.translate.instant("cancel"),
          icon: "close",
          role: "cancel",
        },
      ],
    });
    action.present();
  }
  video(fileChooser: ElementRef) {
    fileChooser.nativeElement.click();
  }

  async takePictures(source, i) {
    let formData = new FormData();

    Camera.getPhoto({
      source,
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    })
      .then(async (image) => {
        let loading = await this.loading.create({
          message: this.translate.instant("loading"),
        });
        loading.present();
        let blob = this.DataURIToBlob(image.dataUrl);
        formData.append("image", blob);
        this.filesServices
          .uploadImage(formData)
          .toPromise()
          .then((url: string) => {
            loading.dismiss();
            this.parrafos[i].image = url;
            
            this.openArray = false;
          })
          .catch((err) => {
            loading.dismiss();
          });

        loading.dismiss();
      })
      .catch((err) => {});
  }

  async takePrincipal(source) {
    let formData = new FormData();
    Camera.getPhoto({
      source,
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    })
      .then(async (image) => {
        let loading = await this.loading.create({
          message: this.translate.instant("loading"),
        });
        loading.present();
        let blob = this.DataURIToBlob(image.dataUrl);
        formData.append("image", blob);
        this.filesServices
          .uploadImage(formData)
          .toPromise()
          .then((url: string) => {
            loading.dismiss();
            this.imagenSelected = url;
            this.open = false;
          })
          .catch((err) => {
            loading.dismiss();
          });
        loading.dismiss();
      })
      .catch((err) => {});
  }
  deleteImagePrincipal() {
    this.imagenSelected = null;
    this.originPrincipaMedia = null;
    this.agregandoOrigenPrincipaMedia = false;
    this.open = false;
  }

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }
  //////

  /////

  ////

  imagenSelected;
  open = false;
  clickImage() {
    this.open = true;
  }
  closeImage() {
    this.open = false;
  }
  takeImage(img) {
    this.imagenSelected = img;
    this.open = false;
  }

  //OPEN ARRAY
  openArray = false;
  imagenACambiar;
  clickImageArray(i) {
    this.imagenACambiar = i;
    this.openArray = true;
  }
  closeImageArray() {
    this.openArray = false;
  }
  takeImageArray(img, i) {
    let copia = this.arrayImagenes;
    let actual = this.arrayImagenes[this.imagenACambiar];
    let nueva = this.arrayImagenes[i];
    this.arrayImagenes.splice(this.imagenACambiar, 1, nueva);
    this.arrayImagenes.splice(i, 1, actual);
    this.openArray = false;
    this.imagenACambiar = undefined;
  }

  deleteImage(i) { /////////////////////////////7
    this.parrafos[i].image = "";
    this.openArray = false;
  }

  ///Create Video
  urlVideo = null;
  videoFile = null;
  videoSelected = null;
  urlVideoNotPrincipal = null;
  videoFileNotPrincipal = null;
  closeVideoPrincipal() {
    this.videosToUploads = this.videosToUploads.filter((file)=>{
      return file.url != this.videoSelected
    })
    this.urlVideo = null;
    this.videoFile = null;
    this.videoSelected = null;
    this.originPrincipaMedia = null;
    this.agregandoOrigenPrincipaMedia = false;
  }
  closeVideoNotPrincipal(i) {//////////////////////
    this.parrafos[i].video = null;
  }
  async uploadVideo($event, type: string, i) {
    let form = new FormData();
    if ($event.target.files[0] && type == "principal") {
      if (this.imagenSelected) {
        this.imagenSelected = undefined;
      }
      this.urlVideo = URL.createObjectURL($event.target.files[0]);
      this.videoFile = $event.target.files[0];
      form.append("video", this.videoFile);
      await this.uploadVideoPrincipal(form);
    } else if ($event.target.files[0] && type == "notPrincipal") {
      this.urlVideoNotPrincipal = URL.createObjectURL($event.target.files[0]);
      this.videoFileNotPrincipal = $event.target.files[0];
      form.append("video", this.videoFileNotPrincipal);
      await this.uploadVideoNotPrincipal(form, i);
    } else {
    }
  }

  uploadVideoPrincipal(video) {
    this.filesServices
      .uploadVideo(video)
      .then((url) => {
        this.videoSelected = url;
      })

      .catch((err) => {});
  }
  uploadVideoNotPrincipal(video, i) {
    this.filesServices
      .uploadVideo(video)

      .then((url) => {
        this.parrafos[i].video = url;
      })
      .catch((err) => {});
  }

  ///
  //Para verificar si exite un titulo o no
  titlebool: boolean = false;
  deportebool: boolean = false;
  subTitlebool: boolean = false;
  tituloListo() {
    this.titlebool = !this.titlebool;
  }
  subTituloListo(i) {
    this.subTitlebool = !this.subTitlebool;
  }
  deporteListo() {
    this.deporte = null;
  }
  // es true si se esta agregando un parrafo
  agregandoParrafo: boolean = false;
  //es true si se esta agregando un subtitulo
  subTitleParrafo;
  numberSubtitle;
  agregandoSubtitulo: boolean = false;
  editandoSubTitle: boolean = false;
  positionEditactualSubtitle: number = null;
  poisionAgregarSubtitulo;
  agregarSubtitulo(i) {
    this.parrafos[i].subtitle = this.subTitleParrafo;
    this.agregandoSubtitulo = false;
  }
  cancelarSubtitle() {
    this.numberSubtitle = null;
    this.editandoSubTitle = false;
    this.subTitleParrafo = null;
    this.positionEditactualSubtitle = null;
  }
  editandoSubtitulo() {
    this.parrafos[
      this.positionEditactualSubtitle
    ].subtitle = this.subTitleParrafo;
    this.editandoSubTitle = false;
    this.positionEditactualSubtitle = null;
    this.subTitleParrafo = null;
  }
  selectsubTitulo(position) {
    this.positionEditactualSubtitle = position;
    this.numberSubtitle = position;
    this.subTitleParrafo = this.parrafos[position].subtitle;
    this.editandoSubTitle = true;
  }
  eliminarSubtitulo() {
    this.parrafos[this.positionEditactualSubtitle].subtitle = null;
    this.editandoSubTitle = false;
    this.positionEditactualSubtitle = null;
    this.subTitleParrafo = null;
  }
  listoPublicar: boolean = false;
  listoParaPublicar() {
    this.listoPublicar = !this.listoPublicar;
  }

  //Origen de la noticia
  agregandoOrigen: boolean = false;
  origen;
  origenSelect = [
    { value: 0, origenSelect: "Mío" },
    { value: 1, origenSelect: "Otra fuente" },
  ];
  miNoticia = undefined;
  origenListoMio() {
    if (this.miNoticia == 0) {
      this.origen = "De mi propiedad";
      this.miNoticia = undefined;
      this.agregandoOrigen = true;
    } else if (this.miNoticia == 1) {
      this.origen = undefined;
      this.agregandoOrigen = false;
    }
  }
  origenListo(change) {
    if (change == 0) {
      this.miNoticia = undefined;
      this.origen = undefined;
      this.agregandoOrigen = false;
    } else if (change == 1) {
      this.agregandoOrigen = true;
    }
  }

  //Origen de las imagenes de parrafos
  agregandoOrigenParrafo;
  originParrafoMedia;
  todosParrafosConOrigen: boolean = false;
  MiParrafoMedia = undefined;
  origenParrafoMedia = [
    { value: 0, origenSelect: "Mío" },
    { value: 1, origenSelect: "Otra fuente" },
  ];
  origenParrafoListoMio(i) {
    if (this.MiParrafoMedia == 0) {
      this.parrafos[i].originMedia = "De mi propiedad";
      this.MiParrafoMedia = undefined;
    } else if (this.MiParrafoMedia == 1) {
      this.parrafos[i].originMedia = undefined;
      this.originParrafoMedia = undefined;
    }
  }
  origenParrafoListo(i, change) {
    if (change == 0) {
      this.parrafos[i].originMedia = this.originParrafoMedia;
      this.MiParrafoMedia = undefined;
    } else if (change == 1) {
      this.parrafos[i].originMedia = undefined;
      this.MiParrafoMedia = undefined;
    }
    //this.agregandoOrigenParrafo = !this.agregandoOrigenParrafo;
    this.originParrafoMedia = null;
  }
  origenParrafoEditar(i) {
    this.originParrafoMedia = this.parrafos[i].originMedia;
    this.parrafos[i].originMedia = null;
  }
 async todoConOrigen() {
   this.news = this.form.value
    this.news.principalVideo = this.videoSelected;
    this.news.principalImage = this.imagenSelected;
    this.news.principalYoutube = this.principalYoutube
    this.news.user = this.userService.User._id;
    this.news.headline = this.titulo1;
    this.news.principalSubtitle = this.subTitlePrincipal;
    this.news.content = await this.questionService.parrafoFilter(this.parrafos);
    // loading.dismiss();
    this.news.date = this.date;
    this.news.origin = this.origen;
    this.news.originPrincipaMedia = this.originPrincipaMedia;
    this.news.audioNews = this.audioNews;
    this.news.programatedDate = this.programedDate;
    if(this.programedDate != undefined){
      this.news.programated = true;
    }else{
      this.news.programated = false;
    }
    this.news.sport = this.deporte;
    
    if(this.news.sport == undefined){
      this.news.sport = 'various'
    }
    // this.whitTime = this.editQuestionComponent.whitTime;
    // this.endDate = this.editQuestionComponent.endDate;
    this.todosParrafosConOrigen = false;
    for (let parrafo of this.parrafos) {
      if ((parrafo.video || parrafo.image) && parrafo.originMedia == null) {
        this.todosParrafosConOrigen = true;
      }
    }
    this.checkNoVacio();
    if (this.todosParrafosConOrigen) {
      this.ToastError(
        "Asegurate de que todos los archivos multimedia tengan origen"
      );
    }
    if (!this.todosParrafosConOrigen && this.checkNoVacio()) {
      this.listoParaPublicar();
    }
  }

  //cheka que no exista campo importante vacio
  checkNoVacio() {
    let ok: boolean = true;
    this.titulo1 = this.titulo1.trim();
    if (this.titulo1.length != 0) {
    } else {
      this.ToastError("El título no puede estar vacio");
      this.titlebool = false;
      ok = false;
    }

    this.subTitlePrincipal = this.subTitlePrincipal.trim();
    if (this.subTitlePrincipal.length != 0) {
    } else {
      this.ToastError("El subtítulo no puede estar vacio");
      this.subTitlebool = false;
      ok = false;
    }

    this.origen = this.origen.trim();
    if (this.origen.length != 0) {
    } else {
      this.ToastError("El origen no puede estar vacio");
      this.agregandoOrigen = false;
      ok = false;
    }

    if (this.urlVideo || this.imagenSelected) {
      this.originPrincipaMedia = this.originPrincipaMedia.trim();
      if (this.originPrincipaMedia.length != 0) {
      } else {
        this.ToastError("El origen de foto o video no puede estar vacio");
        this.agregandoOrigenPrincipaMedia = false;
        ok = false;
      }
    }

    return ok;
  }

  async ToastError(message) {
    const toast = await this.toastController.create({
      header: this.translate.instant("analytics-views.information"),
      message: this.translate.instant(message),
      position: "top",
      color: "dark",
      duration: 4000,
      buttons: [
        {
          text: "Cerrar",
          role: "cancel",
          handler: () => {},
        },
      ],
    });
    toast.present();
  }

  //Origen de las imagenes Principal
  agregandoOrigenPrincipaMedia: boolean = false;
  originPrincipaMedia;
  MiprincipalMedia = undefined;
  principalMedia = [
    { value: 0, origenSelect: "Mío" },
    { value: 1, origenSelect: "Otra fuente" },
  ];
  originPrincipaMediaListoMio() {
    if (this.MiprincipalMedia == 0) {
      this.originPrincipaMedia = "De mi propiedad";
      this.MiprincipalMedia = undefined;
      this.agregandoOrigenPrincipaMedia = true;
    } else if (this.MiprincipalMedia == 1) {
      this.originPrincipaMedia = undefined;
      this.agregandoOrigenPrincipaMedia = false;
    }
  }
  originPrincipaMediaListo(change) {
    if (change == 0) {
      this.MiprincipalMedia = undefined;
      this.originPrincipaMedia = undefined;
      this.agregandoOrigenPrincipaMedia = false;
    } else if (change == 1) {
      this.agregandoOrigenPrincipaMedia = true;
    }
  }

  //Stream
  id;
  // makeid(length) {
  //   var result = "";
  //   var characters =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   var charactersLength = characters.length;
  //   for (var i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }
  createStream() {
    this.router.navigate([`/news/createStream/${this.userService.User._id}`]);
  }
  redactarArticulo: boolean = false;
  redactar() {
    
    this.redactarArticulo = true;
  }

  animateSportyeah() {
    if (this.sportyeah.nativeElement.classList.contains("logoSport")) {
      this.sportyeah.nativeElement.classList.remove("logoSport");
      this.sportyeah.nativeElement.classList.add("logoSportBig");
    }
  }
  ngOnInit(): void { }

  question = {
    user: this.userService.User._id,
    questionGroup: [],
    finishVotes: undefined,
  };

  badDate: boolean = false;
  // createdNews(loading) {
  //   this.questionService.create(this.question).subscribe((response: any) => {
  //     //Crea el cuestionario y agrega el id al news
  //     this.form.value.question = response._id;

  //     this.newsService.create(this.form.value).subscribe((response) => {
  //       this.presentToastWithOptions();
  //       this.router.navigate(["news"]);
  //     });
  //   });
  //   loading.dismiss(); 
  // }
  // createNewsAndQuestion(loading) {
  //     this.createdNews(loading);
  // }
  whitTime: boolean;
  endDate;

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
  
  deleteQuestion(i) {
    this.question.questionGroup.splice(i, 1);
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

  async newsCreated(news){
    let modal = await this.modalCtrl.create({
      component:AftherCreateNewsComponent,
      componentProps:{news}
    })
    modal.present()
  }

}
