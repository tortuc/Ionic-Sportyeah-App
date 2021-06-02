import { Component, OnInit ,Input, Output,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { response } from 'express';
import * as moment from 'moment';
import { EventService } from 'src/app/service/event.service';
import { TicketEventService } from 'src/app/service/ticket-event.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'read-event',
  templateUrl: './read-event.component.html',
  styleUrls: ['./read-event.component.scss'],
})
export class ReadEventComponent implements OnInit {

  @Input() event;
  @Output() backEvent = new EventEmitter
  @Output() ticketChange = new EventEmitter
  constructor(
    public ticketService :TicketEventService,
    public userService :UserService,
    public toastController: ToastController,
    public translate: TranslateService,
    public eventService:EventService,
    public router: Router,
  ) { }


  ngOnInit() {console.log(this.event);
  
    let today = moment();
    this.ticketService.findByUserInEvent(this.event._id,this.userService.User._id).subscribe((response)=>{
      this.haveTicket = response;
      if((this.haveTicket ||this.userService.User._id == this.event.user._id ) && moment(this.event.programatedDate).format("YYYY-MM-DD HH:mm") <= today.format("YYYY-MM-DD HH:mm")){
        this.date = true;
      }
    })
    
  }
  haveTicket
  date:boolean = false;
  goToEvent(){
    if(this.event.user._id == this.userService.User._id){
      this.router.navigate([`/streaming/host/${this.event._id}`]); 
    }else{
      this.router.navigate([`/streaming/client/${this.event._id}`]);
    }
    
  }

  backToEvents(){
    this.backEvent.emit(true)
  }

  takeTicket(){
    let ticket = {
      user:this.userService.User._id,
      event:this.event._id,
      open:this.event.open,
      register:this.event.register,
      importPrice:this.event.importPrice,
      devolution:false
    }
    this.ticketService.create(ticket).subscribe((response)=>{
      this.ticketService.findByUserInEvent(this.event._id,this.userService.User._id).subscribe((response)=>{
        this.haveTicket = response;
      })
      this.presentToastWithOptions()
      this.ticketChange.emit(true)
    })
  }
  async returnTicket(){
    let result = await  this.ticketService.devolution(this.haveTicket._id,this.haveTicket.devolution)
    if(result){
      this.ticketService.findByUserInEvent(this.event._id,this.userService.User._id).subscribe((response)=>{
        this.haveTicket = response;
        this.ticketChange.emit(true)
      })
    }
  }

  async devolutionFalse(){
     (await this.ticketService.devolutionFalse(this.haveTicket._id,this.haveTicket.devolution)).subscribe((response)=>{
      this.ticketService.findByUserInEvent(this.event._id,this.userService.User._id).subscribe((response)=>{
        this.haveTicket = response;
        this.presentToastWithOptions()    
        this.ticketChange.emit(true)
      })
     })
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: this.translate.instant("event.get_ticket"),
      position: "top",
      color: "dark",
      duration: 3000,
    });
    toast.present();
  }

  goEdit(){
    this.router.navigate([`/event/edit/${this.event._id}`]);
  }

  async delete(){
    let result = await this.eventService.delete(this.event._id)
    if(result) this.backEvent.emit(true)
  }
}
