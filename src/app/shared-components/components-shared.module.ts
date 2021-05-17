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
import { UrlPreviewComponent } from "../components/url-preview/url-preview.component";
import { FriendsMobileComponent } from "../components/friends-mobile/friends-mobile.component";
import { PopularGroupsPanelComponent } from "../components/popular-groups-panel/popular-groups-panel.component";
import { ChatUserItemComponent } from "../chat-components/chat-user-item/chat-user-item.component";
import { UserItemComponent } from "../components/user-item/user-item.component";
import { UserItemPanelComponent } from "../components/users/user-item-panel/user-item-panel.component";
import { FriendsPanelDesktopComponent } from "../components/friends-panel-desktop/friends-panel-desktop.component";
import { AddUsersPanelDesktopComponent } from "../components/add-users-panel-desktop/add-users-panel-desktop.component";
import { FollowBtn } from "../components/profile-challenges/follow-btn.component";
import { ViewCommentComponent } from "../post-components/view-comment/view-comment.component";
import { QuestionCommentComponent } from "../components/question-comment/question-comment.component";
import { AssetsButtonsComponent } from "./assets-buttons/assets-buttons.component";
import { GifsModalComponent } from "./gifs-modal/gifs-modal.component";
import { ImagePickerComponent } from "./image-picker/image-picker.component";
import { VideoPickerComponent } from "./video-picker/video-picker.component";
import { EditQuestionComponent } from "../components/edit-question/edit-question.component";
import { ProfileBannerComponent } from "./profile-banner/profile-banner.component";
import { ProfileBannerOptionsComponent } from "./profile-banner-options/profile-banner-options.component";
import { SeeProfileBannerComponent } from "./see-profile-banner/see-profile-banner.component";
import { ProfilePhotoComponent } from "./profile-photo/profile-photo.component";
import { ProfilePhotoOptionsComponent } from "./profile-photo-options/profile-photo-options.component";
import { ProfileUserInfoComponent } from "./profile-user-info/profile-user-info.component";

const components = [
  ViewCommentComponent,
  QuestionCommentComponent,
  FollowButtonComponent,
  LangButtonComponent,
  LangBtnAppComponent,
  MainCardUserComponent,
  ViewSponsorsComponent,
  LoadingProgressComponent,
  AttachLinkPreviewPostComponent,
  UrlPreviewComponent,
  PopularGroupsPanelComponent,
  FriendsMobileComponent,
  ChatUserItemComponent,
  UserItemComponent,
  UserItemPanelComponent,
  FriendsPanelDesktopComponent,
  AddUsersPanelDesktopComponent,
  FollowBtn,
  AssetsButtonsComponent,
  GifsModalComponent,
  ImagePickerComponent,
  VideoPickerComponent,
  EditQuestionComponent,
  ProfileBannerComponent,
  ProfileBannerOptionsComponent,
  SeeProfileBannerComponent,
  ProfilePhotoComponent,
  ProfilePhotoOptionsComponent,
  ProfileUserInfoComponent
  
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
