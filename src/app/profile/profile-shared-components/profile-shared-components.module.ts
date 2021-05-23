import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { PipesModule } from "src/app/pipes/pipes.module";
import { TranslateModule } from "@ngx-translate/core";
import { ExperienceFilesSliderComponent } from "src/app/experiences/experience/experience-item/experience-files-slider/experience-files-slider.component";
import { ExperienceItemPreviewFilesComponent } from "src/app/experiences/experience/experience-item/experience-item-preview-files/experience-item-preview-files.component";
import { ExperiencieFilesPreviewComponent } from "src/app/experiences/experiencie-files-preview/experiencie-files-preview.component";

const components = [
  ExperiencieFilesPreviewComponent,
  ExperienceItemPreviewFilesComponent,
  ExperienceFilesSliderComponent,
];

@NgModule({
  declarations: components,
  imports: [CommonModule, IonicModule, PipesModule, TranslateModule],
  exports: components,
})
export class ProfileSharedComponentsModule {}
