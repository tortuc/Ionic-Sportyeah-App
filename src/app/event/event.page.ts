import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import {Router} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventService } from '../service/event.service';
import { CreateEventComponent } from './create-event/create-event.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit{

  constructor(
    public modalController: ModalController,
    private router:Router,
    private eventService:EventService,
  ) { }

  ngOnInit() {
  }
 


  createEvent(){
    this.router.navigate([`event/create`])
  }

  // eventRead;
   readEvent(event){
    this.router.navigate([`event/read/${event._id}`])
  }
  // backToEvents(){
  //   this.eventRead = undefined;
  //   this.ticketChange()
  // }

  // ticket:boolean
  // ticketChange(){
  //   this.ticket = !this.ticket
  // }


  
}
