import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { IAward } from 'src/app/service/challenge.service';

@Component({
  selector: 'app-show-awards',
  templateUrl: './show-awards.component.html',
  styleUrls: ['./show-awards.component.scss'],
})
export class ShowAwardsComponent implements OnInit {
  @Input() awards: IAward;

  constructor(public mc: ModalController) { }

  ngOnInit() {}

}
