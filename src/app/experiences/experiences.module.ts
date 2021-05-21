import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../pipes/pipes.module";
import { RouterModule } from "@angular/router";
import { ExperiencePage } from "./experience/experience.page";
import { CreateExperienceComponent } from "./create-experience/create-experience.component";
import { ExperiencieFilesPreviewComponent } from "./experiencie-files-preview/experiencie-files-preview.component";
import { ComponentsSharedModule } from "../shared-components/components-shared.module";
import { ExperienceItemComponent } from "./experience/experience-item/experience-item.component";
import { ExperienceItemPreviewFilesComponent } from "./experience/experience-item/experience-item-preview-files/experience-item-preview-files.component";
import { ExperienceFilesSliderComponent } from "./experience/experience-item/experience-files-slider/experience-files-slider.component";

const components = [
  ExperiencePage,
  CreateExperienceComponent,
  ExperiencieFilesPreviewComponent,
  ExperienceItemComponent,
  ExperienceItemPreviewFilesComponent,
  ExperienceFilesSliderComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    PipesModule,
    ReactiveFormsModule,
    ComponentsSharedModule,
  ],
  exports: components,
})
export class ExperiencesModule {}
