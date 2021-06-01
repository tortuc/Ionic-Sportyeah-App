import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'select-currency',
  templateUrl: './select-currency.component.html',
  styleUrls: ['./select-currency.component.scss'],
})
export class SelectCurrencyComponent implements OnInit {
  @Input () currencyType:any

  constructor(
    private popover:PopoverController,
    private translate: TranslateService,


  ) { }

  ngOnInit() {

  }

  currencys = [
    {currency:"EUR",link:"assets/images/EUR.png"},
    {currency:"USD",link:"assets/images/USD.png"},
    {currency:"CNY",link:"assets/images/CNY.png"},
    {currency:"RUB",link:"assets/images/RUB.png"}
  ];


  selectCurrency(currency,link){
    this.currencyType = currency
    this.popover.dismiss({
      currency:this.currencyType,
      link:link
    })
  }

}
