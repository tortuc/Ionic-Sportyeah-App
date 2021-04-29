import { MiniflagComponent, ModalMiniFlagComponent } from './miniflag/miniflag.component';
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
import { SponsorsComponent } from "./../profile/sponsors/sponsors.component";
import { ImageSeeComponent } from "./image-see/image-see.component";
import { ErrorComponent } from "./error/error.component";
import { LinkYoutubeComponent } from "./link-youtube/link-youtube.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageComponent } from "../chat/image/image.component";
import { PipesModule } from "../pipes/pipes.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { PostPageRoutingModule } from "../post/post-routing.module";
import { IonicModule } from "@ionic/angular";
import { AddFriendsPage } from "../dashboard/add-friends/add-friends.page";
import { MsgAudioComponent } from "./msg-audio/msg-audio.component";
import { PostSharedComponent } from "./post-shared/post-shared.component";
import { PostOptionsComponent } from "./post-options/post-options.component";
import { PostContentComponent } from "./post-content/post-content.component";
import { FriendsMobileComponent } from "./friends-mobile/friends-mobile.component";
import { HeaderPostComponent } from "./header-post/header-post.component";
import { CommentPostComponent } from "./comment-post/comment-post.component";
import { ContenteditableValueAccessorModule } from "@tinkoff/angular-contenteditable-accessor";
import { DirectivesModule } from "../directives/directive.module";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { LikesPostComponent } from "./likes-post/likes-post.component";
import { SharedsPostComponent } from "./shareds-post/shareds-post.component";
import { NewProfilePhotoComponent } from "./new-profile-photo/new-profile-photo.component";
import { ChatUserItemComponent } from "./chat-user-item/chat-user-item.component";
import { MessageDeletedComponent } from "./message-deleted/message-deleted.component";
import { ChatHeaderComponent } from "./chat-header/chat-header.component";
import { FriendsPanelDesktopComponent } from "./friends-panel-desktop/friends-panel-desktop.component";
import { LangsPage } from "../langs/langs.page";
import { FollowNotificationComponent } from "./follow-notification/follow-notification.component";
import { UnfollowNotificationComponent } from "./unfollow-notification/unfollow-notification.component";
import { LikeNotificationComponent } from "./like-notification/like-notification.component";
import { CommentNotificationComponent } from "./comment-notification/comment-notification.component";
import { SharedNotificationComponent } from "./shared-notification/shared-notification.component";
import { MentionNotificationComponent } from "./mention-notification/mention-notification.component";
import { ButtonNotificationComponent } from "./button-notification/button-notification.component";
import { ButtonSearchFriendComponent } from "./button-search-friend/button-search-friend.component";
import { WishItemComponent } from "./wish-item/wish-item.component";
import { CreateWishComponent } from "./create-wish/create-wish.component";
import { PreviewFilesComponent } from "./preview-files/preview-files.component";
import { OptionsWishComponent } from "./options-wish/options-wish.component";
import { EditWishComponent } from "./edit-wish/edit-wish.component";
import { ViewWishComponent } from "./view-wish/view-wish.component";
import { ViewFilesComponent } from "./view-files/view-files.component";
import { ViewImageComponent } from "./view-image/view-image.component";
import { ChatBoxComponent } from "./chat-box/chat-box.component";
import { EmojiModule } from "@ctrl/ngx-emoji-mart/ngx-emoji";
import { MessageBasicComponent } from "./message-basic/message-basic.component";
import { MessageDocumentComponent } from "./message-document/message-document.component";
import { UrlPreviewComponent } from "./url-preview/url-preview.component";
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
import { ChallengesPotsOptionsIndivComponent } from './challenge/challenges-pots-options-indiv/challenges-pots-options-indiv.component' 
import { NewQuestionComponent } from "./new-question/new-question.component";
import { ModifyMediaComponent } from 'src/app/components/structure/modify-media/modify-media.component';
import { SponsorsNodeComponent } from 'src/app/components/structure/sponsors/sponsors.component';
import { SponsorsCreateComponent } from 'src/app/components/structure/sponsors-create/sponsors-create.component';
import { QuestionComponent } from "./question/question.component";
import { GetMediaComponent } from "./get-media/get-media.component";
import { EditQuestionComponent } from "./edit-question/edit-question.component";
import { QuestionNotificationComponent } from "./question-notification/question-notification.component"
import { QuestionCommentComponent } from "./question-comment/question-comment.component";
import { NoResults } from './no-results/no-results.component';
import { ProfilHeaderC } from './profile-challenges/profile-header-c.components';
import { ProfileBodyC } from './profile-challenges/profile-body-c.component';
import { FollowBtnC } from './profile-challenges/follow-c.component';
import { FollowBtn } from './profile-challenges/follow-btn.component';
import { DayComponent } from './analitics-views/day/day.component';
import { WeekComponent } from './analitics-views/week/week.component';
import { MonthComponent } from './analitics-views/month/month.component';
import { YearComponent } from './analitics-views/year/year.component';
import { UserItemComponent } from './user-item/user-item.component';
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
  ],
  declarations: [
    ImageComponent,
    AddFriendsPage,
    MsgAudioComponent,
    PostSharedComponent,
    PostOptionsComponent,
    PostContentComponent,
    ImageSeeComponent,
    FriendsMobileComponent,
    HeaderPostComponent,
    CommentPostComponent,
    LikesPostComponent,
    SharedsPostComponent,
    NewProfilePhotoComponent,
    ChatUserItemComponent,
    ErrorComponent,
    MessageDeletedComponent,
    ChatHeaderComponent,
    FriendsPanelDesktopComponent,
    LangsPage,
    FollowNotificationComponent,
    UnfollowNotificationComponent,
    LikeNotificationComponent,
    CommentNotificationComponent,
    SponsorsComponent,
    StructureComponent,
    SharedNotificationComponent,
    ChallengeCommentsComponent,
    ChallengeReactionsComponent,
    MentionNotificationComponent,
    ButtonNotificationComponent,
    ButtonSearchFriendComponent,
    ViewFilesComponent,
    WishItemComponent,
    CreateAwardChallengeComponent,
    CreateWishComponent,
    ChallengesPostHeaderComponent,
    ChallengeContentComponent,
    PreviewFilesComponent,
    OptionsWishComponent,
    EditWishComponent,
    ViewWishComponent,
    ViewImageComponent,
    ChatBoxComponent,
    MessageBasicComponent,
    MessageDocumentComponent,
    UrlPreviewComponent,
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
    SponsorsNodeComponent,
    SponsorsCreateComponent,
    QuestionComponent,
    EditQuestionComponent,
    QuestionNotificationComponent,
    GetMediaComponent,
    EditQuestionComponent,
    QuestionCommentComponent,
    MiniflagComponent,
    ModalMiniFlagComponent,
    NoResults,ProfilHeaderC,ProfileBodyC,FollowBtnC,FollowBtn,
    DayComponent,
    MonthComponent,
    WeekComponent,
    YearComponent,
    UserItemComponent
  ],
  exports: [
    ImageComponent,
    AddFriendsPage,
    ExperiencePage,
    AptitudesPage,
    ImageSeeComponent,
    AwardsPage,
    MsgAudioComponent,
    PostSharedComponent,
    PostOptionsComponent,
    ErrorComponent,
    PostContentComponent,
    CreateAwardChallengeComponent,
    FriendsMobileComponent,
    HeaderPostComponent,
    CommentPostComponent,
    ChallengeContentComponent,
    StructureComponent,
    LikesPostComponent,
    SharedsPostComponent,
    NewProfilePhotoComponent,
    ChatUserItemComponent,
    MessageDeletedComponent,
    ChatHeaderComponent,
    FriendsPanelDesktopComponent,
    LangsPage,
    FollowNotificationComponent,
    UnfollowNotificationComponent,
    LikeNotificationComponent,
    CommentNotificationComponent,
    SharedNotificationComponent,
    MentionNotificationComponent,
    ButtonNotificationComponent,
    ButtonSearchFriendComponent,
    WishItemComponent,
    CreateWishComponent,
    PreviewFilesComponent,
    OptionsWishComponent,
    EditWishComponent,
    ViewWishComponent,
    ViewFilesComponent,
    ViewImageComponent,
    ChatBoxComponent,
    MessageBasicComponent,
    MessageDocumentComponent,
    UrlPreviewComponent,
    ChallengesPostComponent,
    ChallengesPostHeaderComponent,
    ReactionsPostsComponent,
    SponsorsComponent,
    ViewProfileComponent,
    ChallengeCommentsComponent,
    ChallengeReactionsComponent,
    CreateChallengeComponent,
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
    OpenImgComponent,
    ParteIzquierdaWebComponent,
    COptionsComponent,
    NewsOptionsComponent,
    ChallengesPotsOptionsIndivComponent,
    ModifyMediaComponent,
    SponsorsNodeComponent,
    SponsorsCreateComponent,
    QuestionComponent,
    EditQuestionComponent,
    QuestionNotificationComponent,
    GetMediaComponent,
    EditQuestionComponent,
    QuestionCommentComponent,
    MiniflagComponent,
    ModalMiniFlagComponent,
    NoResults,
    ProfilHeaderC,ProfileBodyC,FollowBtnC,FollowBtn,
    DayComponent,
    MonthComponent,
    WeekComponent,
    YearComponent,
    UserItemComponent
  ],
})
export class ComponentsModule {}
