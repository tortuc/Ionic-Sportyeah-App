import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PostPageRoutingModule } from "./post-routing.module";

import { PostPage } from "./post.page";
import { TranslateModule } from "@ngx-translate/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PipesModule } from "../pipes/pipes.module";
import { ComponentsModule } from "../components/components.module";
import { PostComponetsModule } from "../post-components/post-componets.module";
import { ComponentsSharedModule } from "../shared-components/components-shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPageRoutingModule,
    TranslateModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    PipesModule,
    ComponentsModule,
    PostComponetsModule,
    ComponentsSharedModule
  ],
  declarations: [PostPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PostPageModule {}
