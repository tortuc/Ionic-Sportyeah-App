import { ModalCreatedComponent } from './../modal-created/modal-created.component';
import { CreateChallengeComponent } from './../create/create.component';
import { ModalController } from '@ionic/angular';
import { IChallenge } from './../../../service/challenge.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-shared',
  templateUrl: './button-shared.component.html',
  styleUrls: ['./button-shared.component.scss'],
})
export class ButtonSharedComponent implements OnInit {
  @Input() Challenge: IChallenge;

  constructor(public mc: ModalController) { }

  ngOnInit() {}

  async openShared(){
    const modal = await this.mc.create({
      component:ModalCreatedComponent,
      componentProps:{Challenge:this.Challenge}
    })
    await modal.present()

  }

}
