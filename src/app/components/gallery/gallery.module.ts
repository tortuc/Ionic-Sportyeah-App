import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GalleryComponent } from "./gallery/gallery.component";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "src/app/pipes/pipes.module";
import { ComponentsSharedModule } from "src/app/shared-components/components-shared.module";
import { GalleryOptionsComponent } from "./gallery-options/gallery-options.component";
import { GalleryItemComponent } from "./gallery-item/gallery-item.component";
import { GallerySliderComponent } from "./gallery-slider/gallery-slider.component";
import { PrivateGalleryPreviewComponent } from "./private-gallery-preview/private-gallery-preview.component";

const components = [
  GalleryComponent,
  GalleryOptionsComponent,
  GalleryItemComponent,
  GallerySliderComponent,
  PrivateGalleryPreviewComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FlexLayoutModule,
    TranslateModule,
    PipesModule,
    ComponentsSharedModule,
  ],
  exports: components,
})
export class GalleryModule {}
