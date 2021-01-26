import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentionsDirective } from './mentions.directive';
import { CurrencyDirective } from './currency.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MentionsDirective,
    CurrencyDirective
  ],
  exports:[
    MentionsDirective,
    CurrencyDirective
  ]
})
export class DirectivesModule { }
