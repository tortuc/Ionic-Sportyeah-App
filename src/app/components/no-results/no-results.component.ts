import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'no-results',
  template: `
    <div>
      <img src="https://img.icons8.com/fluent-systems-filled/96/000000/no-user.png" style="margin-top:10%;"/>
      <br>
      <br>
      No hay resultados disponibles para este {{name}} <b>"{{result}}"</b>
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