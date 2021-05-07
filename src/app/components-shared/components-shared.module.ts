import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// import { ConfettiComponent } from "../components/confetti/confetti.component";
import { IonicModule } from "@ionic/angular";
// import { LoadingProgressComponent } from "../components/loading-progress/loading-progress.component";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
// import { MsgAudioComponent } from "../components/msg-audio/msg-audio.component";
import { PipesModule } from "../pipes/pipes.module";
// import { MsgUserPreviewComponent } from "../components/msg-user-preview/msg-user-preview.component";
// import { LangButtonComponent } from "../components/lang-button/lang-button.component";
// import { FriendsPanelDesktopComponent } from "../components/friends-panel-desktop/friends-panel-desktop.component";
// import { UserItemPanelComponent } from "../components/users/user-item-panel/user-item-panel.component";
// import { FollowButtonComponent } from "../component/follow-button/follow-button.component";
// import { AddUsersPanelDesktopComponent } from "../components/add-users-panel-desktop/add-users-panel-desktop.component";
import { PopularGroupsPanelComponent } from "../components/popular-groups-panel/popular-groups-panel.component";
// import { ChatUserItemComponent } from "../components/chat-user-item/chat-user-item.component";
// import { EventSelectTypesComponent } from "../components/event-select-types/event-select-types.component";
// import { MainCardUserComponent } from "../components/main-card-user/main-card-user.component";
import { FriendsMobileComponent } from "../components/friends-mobile/friends-mobile.component";
// import { NewProfilePhotoComponent } from "../components/new-profile-photo/new-profile-photo.component";
// import { LangsPage } from "../pages/langs/langs.page";
// import { AskLogoutComponent } from "../components/ask-logout/ask-logout.component";
// import { AttachLinkPreviewPostComponent } from "../components/attach-link-preview-post/attach-link-preview-post.component";
import { UrlPreviewComponent } from "../components/url-preview/url-preview.component";
import { RouterModule } from "@angular/router";

const components = [
  // NewProfilePhotoComponent,
  // FriendsPanelDesktopComponent,
  // UserItemPanelComponent, 
  // ConfettiComponent,
  // LoadingProgressComponent,
  // MsgAudioComponent,
  // MsgUserPreviewComponent,
  // LangButtonComponent,
  // FollowButtonComponent,
  // AddUsersPanelDesktopComponent,
  PopularGroupsPanelComponent,
  // ChatUserItemComponent,
  // EventSelectTypesComponent,
  // MainCardUserComponent,
  FriendsMobileComponent,
  // LangsPage,
  // AskLogoutComponent,
  // AttachLinkPreviewPostComponent,
  UrlPreviewComponent

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
