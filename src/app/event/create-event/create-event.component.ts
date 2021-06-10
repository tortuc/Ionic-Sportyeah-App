import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController, Platform, PopoverController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import * as moment from "moment";
import { MentionsDirective } from "src/app/directives/mentions.directive";
import { IEvent } from "src/app/models/IEvent";
import { EventService } from "src/app/service/event.service";
import { FilesService } from "src/app/service/files.service";
import { PostService } from "src/app/service/post.service";
import { TicketEventService } from "src/app/service/ticket-event.service";
import { UserService } from "src/app/service/user.service";
import { AssetsButtonsComponent } from "src/app/shared-components/assets-buttons/assets-buttons.component";
import { SelectCurrencyComponent } from "../select-currency/select-currency.component";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {


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
    private router:Router,
    public ticketEventService:TicketEventService
  ) { }

  ngOnInit() {}
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
    event.programatedDate = this.programatedDate;

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


    // si no hay videos para subir entonces se crea el event
    
    // if (this.videosToUploads.length == 0) {
      let loading = await this.loadingCtrl.create({
        message: this.translate.instant("loading"),
      });
      loading.present();
      this.eventService
        .create(event)
        .toPromise()
        .then((event:IEvent) => {
          loading.dismiss();
          this.ticketEventService.sendInvitation(this.userInvited,event)
          this.eventService.eventEdited$.next(event)
          this.router.navigate([`event`])
        })
        .catch((err) => {
          loading.dismiss();
        });
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

  userInvited = []
  invitedUsers(users){
    this.userInvited= users
  }

}
