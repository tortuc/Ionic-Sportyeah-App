import { 
  Component, 
  OnInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { ModalController } from '@ionic/angular'
import { ISponsor } from 'src/app/profile/structure/structure.component'
import { ReusableComponentsIonic } from "src/app/service/reusable-components-ionic.service"
import { SponsorsCreateComponent } from "src/app/components/structure/sponsors-create/sponsors-create.component"

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
   * Envia la respuesta al componente padre de los cambios realizados
   */
  @Output() action: EventEmitter<ISponsor[]> = new EventEmitter<ISponsor[]>()

  constructor(
    /*
     * Componentes reusables
     */
    public reusableCI: ReusableComponentsIonic,
    public mc: ModalController
  ) { }

  ngOnInit() {}

  async create(){
    const data = await this.modalCreate()
    if(data)
      this.sponsors.push(data)
  }

  delete(sponsor: ISponsor){}

  edit(sponsor: ISponsor){}

  async modalCreate(){
    const modal = await this.mc.create({
      component: SponsorsCreateComponent,
      cssClass: '',
      componentProps: {}
    })
    await modal.present()
    const { data } = await modal.onDidDismiss()
    return data
  }

}
