import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-see-trys',
  templateUrl: './see-trys.component.html',
  styleUrls: ['./see-trys.component.scss'],
})
export class SeeTrysComponent implements OnInit {

  @Input() intentos: any[];

  constructor() { }

  ngOnInit() {}

}
