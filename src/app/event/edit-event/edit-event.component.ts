import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { response } from 'express';
import * as moment from 'moment';
import { EventService } from 'src/app/service/event.service';
import { FilesService } from 'src/app/service/files.service';
import { TicketEventService } from 'src/app/service/ticket-event.service';
import { UserService } from 'src/app/service/user.service';
import { SelectCurrencyComponent } from '../select-currency/select-currency.component';

@Component({
  selector: 'edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  
 
  @ViewChild("openImage") fileChooser: ElementRef;

  constructor(
    public translate: TranslateService,
    public userService: UserService,
    private fb: FormBuilder,
    public filesServices: FilesService,
    public loadingCtrl: LoadingController,
    private platform: Platform,
    private eventService:EventService,
    private fileService: FilesService,
    private popoverController: PopoverController,
    public toastController: ToastController,
    private route:ActivatedRoute,
    private router:Router,
  ) {    this.idEvent = route.snapshot.paramMap.get('id')}
  idEvent
  ngOnInit() {
    this.eventService.findOne(this.idEvent).subscribe((response:any)=>{
          // agregamos los archivos al event
   this.files.url = response.principalImage;
   this.files.format = 'image';
    // agregamos el titulo al event
    this.title = response.title ;
    this.colorTitle = response.colorTitle; 

    // agregamos la descripcion al event
    this.description =  response.description;
    this.colorDescription = response.colorDescription;

    // agregamos la descripcion al event
    this.modality = response.modality;

    
    // agregamos la fecha programada del event
    this.programatedDate = moment(new Date(response.programatedDate)).format('YYYY-MM-DD-HH');
    this.form.controls.programatedDate.setValue(response.programatedDate.slice(0,-8));
    
    // agregamos el estado del event
    if(response.open){
      this.state = 'open'
    }else{
      this.state = 'register'
    }
    
    

    // agregamos la condicion de compra al event
    this.buyCondition = response.buyCondition;

    // agregamos la condicion de devolucion al event
    this.devolutionCondition = response.devolutionCondition;

    // agregamos  el costo del event
    this.budgetDesc.amount = response.importPrice;

    // agregamos la divisa en elevent
    this.budgetDesc.currency = response.currency;

    })
  }
  currencyType="EUR";
  link = "assets/images/EUR.png";
  async openCurrencyType() {
    const popover = await this.popoverController.create({
      component: SelectCurrencyComponent,
      cssClass: "my-custom-class",
      translucent: true,
      componentProps: { currencyType:this.currencyType },
    });
    popover.onDidDismiss().then((data) => {
      if(data.data != undefined){
      this.link = data.data.link
      this.budgetDesc.currency = data.data.currency
      }
    });
    return await popover.present();
  }
  
newPrice($event){
  let price = $event.replaceAll(".", "").replace(",", ".")
  this.budgetDesc.amount =  price
}

  form = this.fb.group({
    user: [this.userService.User?._id],
    programatedDate:[''],
    state:['']
  });
  state:string = "open"
  title:string;
  colorTitle:string;
  description:string;
  colorDescription:string;
  modality:string;
  files = {url:'',format:''}
  videosToUploads:string;
  programatedDate:string;
  programated:boolean = false;
  budgetDesc = {
    amount: 0,
    handler: null,
    visible: false,
    currency:"EUR"
  };
  buyCondition:string;
  devolutionCondition:string;
  today = moment().format("YYYYY-MM-DD")

  async save() {
    
    // obtenemos la data del formulario
    let event = this.form.value;


    // agregamos los archivos al event
    event.principalImage = this.files.url;

    // agregamos el titulo al event
    event.title = this.title;
    event.colorTitle = this.colorTitle;

    // agregamos la descripcion al event
    event.description = this.description;
    event.colorDescription = this.colorDescription;

    // agregamos la descripcion al event
    event.modality = this.modality;

    if(this.programatedDate){
      event.programated = true;
    }
    // agregamos la fecha programada del event
    event.programatedDate = this.form.value.programatedDate;

    // agregamos el estado del event
    if(this.state == 'register'){
      event.open = false;
      event.register = true
    }

    // agregamos la condicion de compra al event
    event.buyCondition = this.buyCondition;

    // agregamos la condicion de devolucion al event
    event.devolutionCondition = this.devolutionCondition;

    // agregamos  el costo del event
    event.importPrice = this.budgetDesc.amount;

    // agregamos la divisa en elevent
    event.currency = this.budgetDesc.currency;


    //agregamos el id del evento
    event._id = this.idEvent
    // si no hay videos para subir entonces se crea el event
    
    // if (this.videosToUploads.length == 0) {
      let loading = await this.loadingCtrl.create({
        message: this.translate.instant("loading"),
      });
      loading.present();
      this.eventService.updateEvent(event).subscribe((response)=>{
        loading.dismiss();
        this.router.navigate([`event`])
      })
      // this.eventService
      //   .create(event)
      //   .toPromise()
      //   .then((event) => {
      //     loading.dismiss();
      //     // this.eventService.newPost(event._id);
      //   })
      //   .catch((err) => {
      //     loading.dismiss();
      //   });
    // } else {
      // this.eventService.uploadVideoEvent(event, this.videosToUploads, this.files);
    // }
  }

  fileChoose(){
    this.fileChooser.nativeElement.click();
  }
  uploadFile(event) {
    this.uploadImages(event.target.files);
  }
  videoToUpload
  uploadImages(files, i = 0) {
    if (files.length > i) {
      let name = files[i].type.split("/")[0];

      let formData: FormData = new FormData(); 
      if (name == "video") {
        let url = URL.createObjectURL(files[i]);
        this.videoToUpload = ({ file: files[i], url });
        this.files = ({ url, format: "video" });
        this.uploadImages(files, ++i);
      } else if (name == "image") {
        formData.append("image", files[i]);
        this.fileService
          .uploadImageProgress(formData)
          .then((url: string) => {
            this.files = ({ url, format: "image" });
            this.uploadImages(files, ++i);
          })
          .catch((e) => {
            this.uploadImages(files, ++i);
          });
      } else {
        // handle
      }
    }
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: this.translate.instant("event.event_created"),
      position: "top",
      color: "dark",
      duration: 3000,
    });
    toast.present();
  }
}
