import { OpenImgComponent } from "./open-img/open-img.component";
import { ParteIzquierdaWebComponent } from "./challenge/parte-izquierda-web/parte-izquierda-web.component";
import { ParteDerechaWebComponent } from "./challenge/parte-derecha-web/parte-derecha-web.component";
import { SeeTrysComponent } from "./challenges/see-trys/see-trys.component";
import { ModalCreatedComponent } from "./challenges/modal-created/modal-created.component";
import { CamaraBrowserComponent } from "./challenges/camara-browser/camara-browser.component";
import { CreateChallengeFormComponent } from "./challenges/create-challenge-form/create-challenge-form.component";
import { VideosCComponent } from "./challenges/videos-c/videos-c.component";
import { AwardsAccordionComponent } from "./challenges/awards-accordion/awards-accordion.component";
import { AwardsListComponent } from "./challenges/awards-list/awards-list.component";
import { ShowAwardsComponent } from "./challenges/show-awards/show-awards.component";
import { FriendsMobileCComponent } from "./challenges/friends-mobile-c/friends-mobile-c.component";
import { ButtonSharedComponent } from "./challenges/button-shared/button-shared.component";
import { ButtonCommentsComponent } from "./challenges/button-comments/button-comments.component";
import { ChallengeContentComponent } from "./challenges/challenge-content/challenge-content.component";
import { ChallengesPostHeaderComponent } from "./challenges/challenges-post-header/challenges-post-header.component";
import { ChallengesPostComponent } from "./challenges/challenges-post/challenges-post.component";
import { CreateAwardChallengeComponent } from "./challenges/create-award-challenge/create-award-challenge.component";
import { ChallengeReactionsComponent } from "./challenges/challenge-reactions/challenge-reactions.component";
import { ChallengeCommentsComponent } from "./challenges/challenge-comments/challenge-comments.component";
import { CreateChallengeComponent } from "./challenges/create/create.component";
import { ImageSeeComponent } from "./image-see/image-see.component";
import { ErrorComponent } from "./error/error.component";
import { LinkYoutubeComponent } from "./link-youtube/link-youtube.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PipesModule } from "../pipes/pipes.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { PostPageRoutingModule } from "../post/post-routing.module";
import { IonicModule } from "@ionic/angular";
import { ContenteditableValueAccessorModule } from "@tinkoff/angular-contenteditable-accessor";
import { DirectivesModule } from "../directives/directive.module";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { NewProfilePhotoComponent } from "./new-profile-photo/new-profile-photo.component";
import { LangsPage } from "../langs/langs.page";
import { FollowNotificationComponent } from "./follow-notification/follow-notification.component";
import { UnfollowNotificationComponent } from "./unfollow-notification/unfollow-notification.component";
import { LikeNotificationComponent } from "./like-notification/like-notification.component";
import { CommentNotificationComponent } from "./comment-notification/comment-notification.component";
import { SharedNotificationComponent } from "./shared-notification/shared-notification.component";
import { MentionNotificationComponent } from "./mention-notification/mention-notification.component";
import { ButtonNotificationComponent } from "./button-notification/button-notification.component";
import { ButtonSearchFriendComponent } from "./button-search-friend/button-search-friend.component";
import { PreviewFilesComponent } from "./preview-files/preview-files.component";
import { ViewFilesComponent } from "./view-files/view-files.component";
import { ViewImageComponent } from "./view-image/view-image.component";
import { EmojiModule } from "@ctrl/ngx-emoji-mart/ngx-emoji";
import { ReactionsPostsComponent } from "./reactions-posts/reactions-posts.component";
import { ViewProfileComponent } from "./view-profile/view-profile.component";
import { AwardsPage } from "../profile/awards/awards.page";
import { ExperiencePage } from "../profile/experience/experience.page";
import { AptitudesPage } from "../profile/aptitudes/aptitudes.page";
import { IonicRatingModule } from "ionic4-rating";
import { StructureComponent } from "src/app/profile/structure/structure.component";
import { ChallengesPostOptionsComponent } from "./challenges/challenges-post-options/challenges-post-options.component";
import { COptionsComponent } from "./challenges/c-options/c-options.component";
import { NewsOptionsComponent } from "./news-options/news-options.component";
import { ChallengesPotsOptionsIndivComponent } from "./challenge/challenges-pots-options-indiv/challenges-pots-options-indiv.component";
import { NewQuestionComponent } from "./new-question/new-question.component";
import { ModifyMediaComponent } from "src/app/components/structure/modify-media/modify-media.component";
import { QuestionComponent } from "./question/question.component";
import { GetMediaComponent } from "./get-media/get-media.component";
import { QuestionNotificationComponent } from "./question-notification/question-notification.component";
import { NoResults } from "./no-results/no-results.component";
import { ProfilHeaderC } from "./profile-challenges/profile-header-c.components";
import { ProfileBodyC } from "./profile-challenges/profile-body-c.component";
import { FollowBtnC } from "./profile-challenges/follow-c.component";
import { DayComponent } from "./analitics-views/day/day.component";
import { MonthComponent } from "./analitics-views/month/month.component";
import { WeekComponent } from "./analitics-views/week/week.component";
import { YearComponent } from "./analitics-views/year/year.component";
import { ComponentsSharedModule } from "../shared-components/components-shared.module";

const components = [
  NewProfilePhotoComponent,
  ImageSeeComponent,
  ErrorComponent,
  LangsPage,
  FollowNotificationComponent,
  UnfollowNotificationComponent,
  LikeNotificationComponent,
  CommentNotificationComponent,
  StructureComponent,
  SharedNotificationComponent,
  ChallengeCommentsComponent,
  ChallengeReactionsComponent,
  MentionNotificationComponent,
  ButtonNotificationComponent,
  ButtonSearchFriendComponent,
  ViewFilesComponent,
  CreateAwardChallengeComponent,
  ChallengesPostHeaderComponent,
  ChallengeContentComponent,
  PreviewFilesComponent,
  ViewImageComponent,
  ExperiencePage,
  AwardsPage,
  LinkYoutubeComponent,
  AptitudesPage,
  ReactionsPostsComponent,
  ViewProfileComponent,
  CreateChallengeComponent,
  ChallengesPostComponent,
  ChallengesPostOptionsComponent,
  ButtonCommentsComponent,
  ButtonSharedComponent,
  FriendsMobileCComponent,
  ShowAwardsComponent,
  AwardsListComponent,
  AwardsAccordionComponent,
  CreateChallengeFormComponent,
  VideosCComponent,
  CamaraBrowserComponent,
  ModalCreatedComponent,
  SeeTrysComponent,
  ParteDerechaWebComponent,
  ParteIzquierdaWebComponent,
  OpenImgComponent,
  COptionsComponent,
  NewsOptionsComponent,
  ChallengesPotsOptionsIndivComponent,
  NewQuestionComponent,
  ModifyMediaComponent,
  QuestionComponent,
  QuestionNotificationComponent,
  GetMediaComponent,
  NoResults,
  ProfilHeaderC,
  ProfileBodyC,
  FollowBtnC,
  DayComponent,
  MonthComponent,
  WeekComponent,
  YearComponent,
];
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
    ContenteditableValueAccessorModule,
    IonicRatingModule,
    DirectivesModule,
    PickerModule,
    EmojiModule,
    ComponentsSharedModule,
  ],
  declarations: components,
  exports: components,
})
export class ComponentsModule {}
