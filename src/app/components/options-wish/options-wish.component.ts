import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-options-wish',
  templateUrl: './options-wish.component.html',
  styleUrls: ['./options-wish.component.scss'],
})
export class OptionsWishComponent implements OnInit {

  constructor(
    private popover:PopoverController,
    public translate:TranslateService
  ) { }

  @Input() privacity:string
  @Input() done:boolean

  ngOnInit() {
    
  }



  dismiss(option:string){
    this.popover.dismiss(option)
  }

}
