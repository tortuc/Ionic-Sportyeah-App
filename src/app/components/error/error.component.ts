import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'error-form',
  template: `
    <div class="error">{{errorText}}</div>
  `,
  styles: [`
    .error{
      background: #dc3545!important;
      color: white;
      padding:15px;
    }
  `]
})
export class ErrorComponent implements OnInit {
  @Input() errorText: string;
  constructor() { }

  ngOnInit(): void { }
}
