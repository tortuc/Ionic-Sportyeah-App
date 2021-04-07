import { Component, Input, OnInit } from "@angular/core";

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
  constructor(){}
  ngOnInit(){
    console.log(this.photo,this.banner,this.state)
  }
}