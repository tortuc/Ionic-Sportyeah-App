import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IUser } from 'src/app/models/IUser';
import { ReusableComponentsIonic } from 'src/app/service/ionicHelpers.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-miniflag',
  templateUrl: './miniflag.component.html',
  styleUrls: ['./miniflag.component.scss'],
})
export class MiniflagComponent implements OnInit {
  @Input() user: any
  @Input() edit?: boolean

  constructor(
    public mc: ModalController,
    public userService: UserService
  ) { }

  ngOnInit() {}

  async editM() {
    // if(this.user.geo.country === 'Spain'){
      const modal = await this.mc.create({
        component:ModalMiniFlagComponent,
      })
      await modal.present()
      const {data} = await modal.onDidDismiss()
      if(data){
        this.user.geo.flag = data
        this.userService.update(this.user)
      }
    // }
  }
}

@Component({
  selector: 'app-modal-miniflag',
  template: `
    <ion-content style="background:black;" scroll-y="false" fullscreen >
      <div style="width:100%; height:100%; text-align:center; background:black;" *ngIf="!slides">
        <ion-spinner  
          style="
            margin:auto;
            color:white;
            height: 93%;
            width: 8%;
          "></ion-spinner>
      </div>
      <ion-slides pager="true" [options]="slideOpts" *ngIf="slides"
        style="width:100%; height:100%; background black"
      >
        <ion-slide *ngFor="let bandera of banderas" style="background:black;display:grid;">
          <h1 style="color:white">{{bandera.country}}</h1>
          <img [src]="bandera.img" style="width: 200px; margin:auto" (click)="mc.dismiss(bandera.img)"/>
          <p style="color:white">Pulsa en la bandera para cambiarla</p>
        </ion-slide>
      </ion-slides>
    <ion-content>
  `,
})
export class ModalMiniFlagComponent implements OnInit {
  banderas: any[] = [
    {country:`País Vasco`,img:`https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Flag_of_the_Basque_Country.svg/200px-Flag_of_the_Basque_Country.svg.png`},
    {country:`Cataluña`,img:`https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Estelada_blava.svg/270px-Estelada_blava.svg.png`},
    {country:`Navarra`,img:`https://astelus.com/wp-content/viajes/El-color-rojo-en-la-bandera-de-Navarra.png`}
  ]

  slideOpts = this.ih.slideOpts
  slides: boolean = false

  constructor(
    public mc: ModalController,
    public ih: ReusableComponentsIonic
  ){}

  ngOnInit(){
    setTimeout(()=> this.slides = true,300)
  }
}