import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BillyPageRoutingModule } from "./billy-routing.module";

import { BillyPage } from "./billy.page";

@NgModule({
  entryComponents: [],
  imports: [CommonModule, FormsModule, IonicModule, BillyPageRoutingModule],
  declarations: [BillyPage],
})
export class BillyPageModule {}
