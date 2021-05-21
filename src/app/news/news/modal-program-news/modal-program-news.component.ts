import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { LoadingController, ModalController, Platform } from "@ionic/angular";
import { PopoverController } from '@ionic/angular';
import * as moment from "moment";
@Component({
  selector: 'app-modal-program-news',
  templateUrl: './modal-program-news.component.html',
  styleUrls: ['./modal-program-news.component.scss'],
})
export class ModalProgramNewsComponent implements OnInit {

  @Input() date: Date;
  @Input() edited: boolean;
  
  constructor(
    private modalCtrl: ModalController,
    private popoverCtrl:PopoverController,
  ) { }

  ngOnInit() {}
  today = moment().format("YYYYY-MM-DD")
cancel(){
  this.popoverCtrl.dismiss({date:undefined,option:"cancel"})
}
deleteProgramed(){
  this.popoverCtrl.dismiss({date:undefined,deleteProgramed:true})
}
accept(){
  this.popoverCtrl.dismiss({date:this.date,option:"accept"})
}


}
