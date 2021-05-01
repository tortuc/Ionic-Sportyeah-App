import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../pipes/pipes.module";
import { LangButtonComponent } from "./lang-button/lang-button.component";
import { LangBtnAppComponent } from "./lang-btn-app/lang-btn-app.component";
import { FollowButtonComponent } from "../components/follow-button/follow-button.component";

const components = [
  
  LangButtonComponent,
  LangBtnAppComponent,
  FollowButtonComponent

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
