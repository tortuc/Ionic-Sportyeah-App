import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ChatInfoGroupComponent } from 'src/app/chat-components/chat-info-group/chat-info-group.component';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'popular-groups-panel',
  templateUrl: './popular-groups-panel.component.html',
  styleUrls: ['./popular-groups-panel.component.scss'],
})
export class PopularGroupsPanelComponent implements OnInit {

   /**
   * Solo es true si esta en la pagina del post
   */
    @Input() postPage: boolean = false;


  constructor(
    public chatService:ChatService,
    public modalCtrl:ModalController,
    private router:Router
  ) { }

  ngOnInit() {
    // this.chatService.getPublicGroups()
  }

  
async optionsChatBox( item ){
  let modal = await this.modalCtrl.create({
    component: ChatInfoGroupComponent,
    componentProps: { chat: item.chat, public_group: true },
  });


  modal.present();
}

seeAll(){
  this.router.navigate(["/chat"],{queryParams:{s:'g'}})
}

}
