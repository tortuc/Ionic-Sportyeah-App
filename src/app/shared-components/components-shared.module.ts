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
import { NewPostHeaderComponent } from "../post-components/new-post-header/new-post-header.component";
import { PostPreviewImagesSliderComponent } from "../post-components/post-preview-images-slider/post-preview-images-slider.component";
import { PostPreviewImagesComponent } from "../post-components/post-preview-images/post-preview-images.component";
import { UserItemReactionsComponent } from "../post-components/user-item-reactions/user-item-reactions.component";
import { MiniflagComponent } from "../components/miniflag/miniflag.component";
import { UserItemPreviewComponent } from "../components/user-item-preview/user-item-preview.component";
import { CommentOptionsComponent } from "../post-components/view-comment/comment-options/comment-options.component";
import { ReactToCommentComponent } from "../post-components/view-comment/comment-options/react-to-comment/react-to-comment.component";
import { CommentsInCommentComponent } from "../post-components/view-comment/comment-options/comments-in-comment/comments-in-comment.component";
import { ViewRespondsCommentComponent } from "../post-components/view-comment/view-responds-comment/view-responds-comment.component";
import { ReportCommentComponent } from "../post-components/view-comment/report-comment/report-comment.component";

const components = [
  QuestionCommentComponent,
  FollowButtonComponent,
  LangButtonComponent,
  LangBtnAppComponent,
  MainCardUserComponent,
  LoadingProgressComponent,
  AttachLinkPreviewPostComponent,
  UrlPreviewComponent,
  PopularGroupsPanelComponent,
  FriendsMobileComponent,
  ChatUserItemComponent,
  UserItemComponent,
  UserItemPanelComponent,
  UserItemPreviewComponent,
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
  ProfileUserInfoComponent,
  UserItemReactionsComponent,
  MiniflagComponent,
  NewPostHeaderComponent,
  PostPreviewImagesSliderComponent, 
  PostPreviewImagesComponent
 
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
