import { Component, OnInit,Output,EventEmitter, OnChanges, Input } from '@angular/core';
import { TicketEventService } from 'src/app/service/ticket-event.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'will-event-attend',
  templateUrl: './will-event-attend.component.html',
  styleUrls: ['./will-event-attend.component.scss'],
})
export class WillEventAttendComponent implements OnInit, OnChanges {
  @Output() readEvent = new EventEmitter();
  @Input() ticket;
  constructor(
    private ticketEvent:TicketEventService,
    private userService:UserService
  ) { }

  willAttend;
  
  ngOnInit() {
    this.takeTicketEvent()
  }
  ngOnChanges(){
    this.takeTicketEvent()
  }

takeTicketEvent(){
  this.ticketEvent.findUserTicketEvent(this.userService.User._id).subscribe((response)=>{
    this.willAttend = response
    console.log(response);
    
  })
}

  seeEvent(event){
    this.readEvent.emit(event)  
  }

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

}
