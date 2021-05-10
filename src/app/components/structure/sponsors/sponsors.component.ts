import { 
  Component, 
  OnInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ModalController } from '@ionic/angular'
import { ISponsor } from "src/app/models/ISponsor"
import { ReusableComponentsIonic } from "src/app/service/ionicHelpers.service"
import { SponsorsCreateComponent } from "src/app/components/structure/sponsors-create/sponsors-create.component"
import { UserService } from 'src/app/service/user.service';
import { ViewsSponsorService } from "src/app/service/views-sponsor.service";
@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss'],
})
export class SponsorsNodeComponent implements OnInit {
  /*
   * Nos indica si el usuario es el creador de este nodo
   */
  @Input() creator: boolean
  /*
   * Trae todos los sponsors para su muestreo
   */
  @Input() sponsors: ISponsor[]
    /*
   * El id del usuario con patrocinadores
   */
    @Input() idUser: string[]
  /*
   * Envia la respuesta al componente padre de los cambios realizados
   */
  @Output() action: EventEmitter<ISponsor[]> = new EventEmitter<ISponsor[]>()

  constructor(
    /*
     * Componentes reusables
     */
    public reusableCI: ReusableComponentsIonic,
    public mc: ModalController,
    public userService:UserService,
    private viewsSponsorService:ViewsSponsorService
  ) { }

  ngOnInit() {
    if(!this.sponsors)
      this.sponsors=[]
  }

  async create(){
    const data: ISponsor = await this.modalCreate()
    if(data){
      this.sponsors.push(data)
      this.action.emit(this.sponsors)
    }
  }

  async delete(sponsor: ISponsor){
    const data: boolean = await this.reusableCI.desicionAlert(`¿Seguro desea eliminar esta marca?`,``)
    if(data){
      const deleteIndex = this.sponsors.indexOf(sponsor)  
      this.sponsors.splice(deleteIndex,1)
      this.action.emit(this.sponsors)
    }
  }

  async edit(sponsor: ISponsor){
    const data: ISponsor = await this.modalCreate(sponsor)
    if(data){
      const index = this.sponsors.indexOf(sponsor)
      this.sponsors[index] = data
      this.action.emit(this.sponsors)
    }
  }

  async modalCreate(edit:ISponsor= {url:'',image:'./assets/images/logox.png',name:''}){
    const modal = await this.mc.create({
      component: SponsorsCreateComponent,
      cssClass: '',
      componentProps: {edit}
    })
    await modal.present()
    const { data } = await modal.onDidDismiss()
    return data
  }



  go(url:string,name){
    this.viewsSponsorService
    .createSponsorView(
      {
       user:this.idUser,
       visitor:this.userService.User._id,
       from:"profile",
       link:null,
       nameSponsor:name
     }
     )
      .subscribe((response) => {
        window.location.replace(url);
      });
  }
} 