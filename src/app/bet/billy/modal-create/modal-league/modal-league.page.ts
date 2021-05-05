import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-league',
  templateUrl: './modal-league.page.html',
  styleUrls: ['./modal-league.page.scss'],
})
export class ModalLeaguePage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  open1 = false
  open = false

  modalCloseLeague() {
    this.modalController.dismiss();
  }

}
