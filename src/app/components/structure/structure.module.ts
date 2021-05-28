import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrivateStructureComponent } from "./private-structure/private-structure.component";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "src/app/pipes/pipes.module";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const components = [PrivateStructureComponent];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    TranslateModule,
    PipesModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: components,
})
export class StructureModule {}
