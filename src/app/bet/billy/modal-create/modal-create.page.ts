import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalLeaguePage } from './modal-league/modal-league.page';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.page.html',
  styleUrls: ['./modal-create.page.scss'],
})
export class ModalCreatePage implements OnInit {


  @Input() dataModal;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  modalCloseBilly() {
    this.modalController.dismiss();
  }

  async openModalLeague() {
    const modal = await this.modalController.create({
      component: ModalLeaguePage,
      componentProps: {
        dataModal:  {
          name: "Richard",
          country: "Venezuela"
        }
      }
    });
    await modal.present();
  }

}
