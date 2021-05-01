import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../pipes/pipes.module";
import { LangButtonComponent } from "./lang-button/lang-button.component";
import { LangBtnAppComponent } from "./lang-btn-app/lang-btn-app.component";

const components = [
  
  LangButtonComponent,
  LangBtnAppComponent,

];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TranslateModule,
    PipesModule
    
  ],
  declarations: components,
  exports: components,
})
export class ComponentsSharedModule {}
