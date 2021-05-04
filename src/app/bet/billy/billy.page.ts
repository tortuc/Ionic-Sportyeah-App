import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalCreatePage } from './modal-create/modal-create.page';

@Component({
  selector: 'app-billy',
  templateUrl: './billy.page.html',
  styleUrls: ['./billy.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BillyPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

 async openModalCreateBilly() {
    const modal = await this.modalController.create({
      component: ModalCreatePage,
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
