import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Countrys, CountrysService } from 'src/app/service/countrys.service';
import { normalize } from 'src/config/base';

enum Texts {
 selectAll =  "countryFilter.selectAll",
 discardAll =  "countryFilter.discardAll",
 cancelSearch = "countryFilter.cancelSearch",
 title = "countryFilter.title",
 hint = "countryFilter.hint"
}

@Component({
  selector: 'app-country-filter',
  templateUrl: './country-filter.component.html',
  styleUrls: ['./country-filter.component.scss']
})


export class CountryFilterComponent implements OnInit {

  
  public readonly Texts = Texts;
  countrysFilters: Countrys[] = [];
  constructor(
    public readonly countryService:CountrysService,
    public readonly modalCtrl:ModalController
  ) { }

  ngOnInit() {
    console.log(this.countryService.allCountrys)
  }

  @Input() countrys:Countrys[] = []

  addCountry(country:Countrys){
    let exist = this.countrys.find(x=>x.alpha2Code == country.alpha2Code)
    if(!exist){
      this.countrys.push(country)
    }else{
      this.countrys = this.countrys.filter(x=>x.alpha2Code != country.alpha2Code)
    }
  }

  isSelect(country){
    let exist = this.countrys.find(x=>x.alpha2Code == country.alpha2Code)

    return (exist)?"selected":""
  }

  selectAll(){
    this.countrys = (this.countrys.length == 250)?[]:this.countryService.allCountrys
  }


  filter() {
    this.countrysFilters = this.countryService.allCountrys.filter((country) => {
      const text: string = country.name

      return normalize(text).toLowerCase().indexOf(this.query.toLowerCase()) != -1;
    });
  }
  query = "";

  close(){
    this.modalCtrl.dismiss(this.countrys)
  }

}
