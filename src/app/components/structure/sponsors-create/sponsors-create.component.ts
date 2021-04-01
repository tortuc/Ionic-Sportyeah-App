import { 
  Component, 
  OnInit,
  Input
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReusableComponentsIonic } from "src/app/service/reusable-components-ionic.service"
import { take } from 'rxjs/operators'
import { ImgVideoUpload } from "src/app/service/reusable-img-video-logic.service"
import { ModalController } from '@ionic/angular'
import { ISponsor } from "src/app/models/ISponsor"

@Component({
  selector: 'app-sponsors-create',
  templateUrl: './sponsors-create.component.html',
  styleUrls: ['./sponsors-create.component.scss'],
})
export class SponsorsCreateComponent implements OnInit {
  @Input() edit: ISponsor 

  constructor(
    public fb:          FormBuilder,
    public reusableCI:  ReusableComponentsIonic,
    public reusableIMG: ImgVideoUpload,
    public mc:          ModalController
  ) {}
  
  /*
   *  @pattern del url
   *  " and / pueden causar problemas si se pasan directamente al
   *  pattern por eso coloco una variable separada
   */
  reg: string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'

  form: FormGroup = this.fb.group({
    url: [
      '',
      [
        Validators.required, 
        Validators.pattern(this.reg)
      ]
    ],
    image: ['', [Validators.required]]
  })

  ngOnInit() {
    this.form.controls.url.setValue(this.edit.url)
    this.form.controls.image.setValue(this.edit.image)
  }

  /*
   * Add image
   */
  async add(){
    this.reusableIMG.takeOnlyPhoto()
    this.reusableIMG.content.pipe(take(1))
      .subscribe((r:string)=>
        this.form.controls.image.setValue(r))
  }

  /*
   * Envia el nuevo patrocinador
   */
  send(){
    this.mc.dismiss(this.form.value)
    this.reusableCI.toast(`Patrocinador creado con éxito`)
  }
}
