import { Component, OnInit, Input } from '@angular/core';
import { LandingService } from 'src/app/service/landingService';

interface IProducts {
  photo:string;
  title:string;
  subtitle:string;
  url:string;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  @Input() creator:boolean; 
  @Input() createProduct: () => void;
  @Input() changeText: (name:string,index?:string,property?:string) => void; 
  @Input() modalController: any; 
  constructor(
    public landingService: LandingService,
    public ls: LandingService
  ) { }

  ngOnInit() {}
  
  delete(product:IProducts){
    this.ls.ls.products.splice(this.ls.ls.products.indexOf(product),1);
    this.ls.edit(this.ls.ls);
  }
}
