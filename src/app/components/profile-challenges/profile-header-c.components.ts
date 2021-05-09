import { Component, Input, OnInit } from "@angular/core";
import { IUser } from "src/app/models/IUser";

@Component({
  selector: 'profile-header-c',
  template: `
    <div 
      class="banner"
      [ngStyle]="{'background-image': 'url(' + banner + ')'}"
    >
      <ion-avatar class="photo">
        <img [src]="photo" class="photo-img">
      </ion-avatar>
      <div class="estado">
        @{{username}}
        <!-- <follow-btn [user]="user" style="margin-top:10px;"></follow-btn> -->
      </div>
    </div>
    
  `,
  styleUrls:['./profile-challenges.component.scss']
})
export class ProfilHeaderC implements OnInit {
  @Input() photo: string
  @Input() banner: string
  @Input() state: string
  @Input() username: string
  @Input() user: IUser
  constructor(){}
  ngOnInit(){
  }
}