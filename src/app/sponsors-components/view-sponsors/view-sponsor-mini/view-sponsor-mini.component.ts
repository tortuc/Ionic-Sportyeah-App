import { Component, Input, OnInit } from '@angular/core';
import { ISponsor, ISponsorInfo } from 'src/app/models/ISponsor';

@Component({
  selector: 'view-sponsor-mini',
  templateUrl: './view-sponsor-mini.component.html',
  styleUrls: ['./view-sponsor-mini.component.scss']
})
export class ViewSponsorMiniComponent implements OnInit {
 /**
   * Informacion del patrocinador
   */
  @Input() info: ISponsorInfo;
  /**
   * Cuerpo completo del patrocinador
   */
  @Input() sponsor: ISponsor = null;
  constructor() { }

  ngOnInit() {
  }

}
