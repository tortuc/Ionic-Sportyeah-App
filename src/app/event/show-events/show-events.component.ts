import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, PopoverController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { EventService } from 'src/app/service/event.service';
import { UserService } from 'src/app/service/user.service';
import { OptionEventComponent } from '../option-event/option-event.component';

@Component({
  selector: 'show-events',
  templateUrl: './show-events.component.html',
  styleUrls: ['./show-events.component.scss'],
})
export class ShowEventsComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    private eventService:EventService,
    public popoverController: PopoverController,
    private router:Router,
  ) { }
  @Output() readEvent = new EventEmitter();
  @Input() displayOptions: boolean = true;


  ngOnInit() {
    this.eventService.find().subscribe((response)=>{
      this.events = response;
    })
  }
    events

    seeEvent(event){
      this.readEvent.emit(event)
    }


    async deleteEvent(id){
      let result = await this.eventService.delete(id)
      if(result){
        this.eventService.find().subscribe((response)=>{
          this.events = response;
        })
      }
    }

    editEvent(idEvent) {
      this.router.navigate([`event/edit/${idEvent}`]);
    }

    options(data) {
      switch (data?.action) {
        case "delete":
          this.deleteEvent(data.event);
          break;
        case "edit":
          this.editEvent(data.event);
          break;
        default:
          break;
      }
    }
    async openOptions(ev: any, event) {
      const popover = await this.popoverController.create({
        component: OptionEventComponent,
        cssClass: "my-custom-class",
        event: ev,
        translucent: true,
        componentProps: { event },
      });
      popover.onDidDismiss().then((data) => {
        this.options(data.data);
      });
      return await popover.present();
    }

}
