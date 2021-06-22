import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Countrys {
  name:string;
  alpha2Code:string;
}

@Injectable({
  providedIn: 'root'
})
export class CountrysService {

  constructor(
    private readonly http:HttpClient
  ) {
    this.getCountrys
   }


  public allCountrys:Countrys[] = []

  getCountrys(){
    this.http.get("https://restcountries.eu/rest/v2/all?fields=name;alpha2Code").subscribe((countrys:Countrys[])=>{
      this.allCountrys = countrys
      console.log(this.allCountrys);
      
    })
  }
}
