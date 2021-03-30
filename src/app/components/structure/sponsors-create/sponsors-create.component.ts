import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-sponsors-create',
  templateUrl: './sponsors-create.component.html',
  styleUrls: ['./sponsors-create.component.scss'],
})
export class SponsorsCreateComponent implements OnInit {

  constructor(
    public fb:      FormBuilder,
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

  ngOnInit() {}

}
