import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'no-results',
  template: `
    <div>
      <img src="https://img.icons8.com/wired/128/000000/cancel--v1.png" style="margin-top:10%;"/>
      <br>
      <br>
      {{name}} <b>"{{result}}"</b>
    </div>
  `
})
export class NoResults implements OnInit{
  /**
   * Nombre del resultado no conseguido
   */
  @Input() name:string
  /**
   * El parametro buscado
   */
  @Input() result:string
  constructor(){}
  ngOnInit(){}
}