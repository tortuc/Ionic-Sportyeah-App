import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AuthPageRoutingModule } from "./auth-routing.module";

import { AuthPage } from "./auth.page";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentsSharedModule } from "../shared-components/components-shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    FlexLayoutModule,
    TranslateModule,
    ReactiveFormsModule,
    ComponentsSharedModule,
  ],
  declarations: [AuthPage],
})
export class AuthPageModule {}
