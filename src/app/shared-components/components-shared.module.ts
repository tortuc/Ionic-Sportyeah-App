import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../pipes/pipes.module";
import { LangButtonComponent } from "./lang-button/lang-button.component";
import { LangBtnAppComponent } from "./lang-btn-app/lang-btn-app.component";
import { FollowButtonComponent } from "../components/follow-button/follow-button.component";
import { MainCardUserComponent } from "./main-card-user/main-card-user.component";
import { RouterModule } from "@angular/router";
import { ViewSponsorsComponent } from "./view-sponsors/view-sponsors.component";
import { LoadingProgressComponent } from "./loading-progress/loading-progress.component";
import { AttachLinkPreviewPostComponent } from "../post-components/attach-link-preview-post/attach-link-preview-post.component";

const components = [
  
  LangButtonComponent,
  LangBtnAppComponent,
  FollowButtonComponent,
  MainCardUserComponent,
  ViewSponsorsComponent,
  LoadingProgressComponent,
  AttachLinkPreviewPostComponent

];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TranslateModule,
    PipesModule,
    RouterModule
    
  ],
  declarations: components,
  exports: components,
})
export class ComponentsSharedModule {}
