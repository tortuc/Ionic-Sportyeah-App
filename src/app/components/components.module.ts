import { ImageSeeComponent } from './image-see/image-see.component';
import { ErrorComponent } from './error/error.component';
import { LinkYoutubeComponent } from './link-youtube/link-youtube.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from '../chat/image/image.component';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { PostPageRoutingModule } from '../post/post-routing.module';
import { IonicModule } from '@ionic/angular';
import { AddFriendsPage } from '../dashboard/add-friends/add-friends.page';
import { MsgAudioComponent } from './msg-audio/msg-audio.component';
import { PostSharedComponent } from './post-shared/post-shared.component';
import { PostOptionsComponent } from './post-options/post-options.component';
import { PostContentComponent } from './post-content/post-content.component';
import { FriendsMobileComponent } from './friends-mobile/friends-mobile.component';
import { HeaderPostComponent } from './header-post/header-post.component';
import { CommentPostComponent } from './comment-post/comment-post.component';
import { ContenteditableValueAccessorModule } from '@tinkoff/angular-contenteditable-accessor';
import { DirectivesModule } from '../directives/directive.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { LikesPostComponent } from './likes-post/likes-post.component';
import { SharedsPostComponent } from './shareds-post/shareds-post.component';
import { NewProfilePhotoComponent } from './new-profile-photo/new-profile-photo.component';
import { ChatUserItemComponent } from './chat-user-item/chat-user-item.component';
import { MessageDeletedComponent } from './message-deleted/message-deleted.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { FriendsPanelDesktopComponent } from './friends-panel-desktop/friends-panel-desktop.component';
import { LangsPage } from '../langs/langs.page';
import { FollowNotificationComponent } from './follow-notification/follow-notification.component';
import { UnfollowNotificationComponent } from './unfollow-notification/unfollow-notification.component';
import { LikeNotificationComponent } from './like-notification/like-notification.component';
import { CommentNotificationComponent } from './comment-notification/comment-notification.component';
import { SharedNotificationComponent } from './shared-notification/shared-notification.component';
import { MentionNotificationComponent } from './mention-notification/mention-notification.component';
import { ButtonNotificationComponent } from './button-notification/button-notification.component';
import { ButtonSearchFriendComponent } from './button-search-friend/button-search-friend.component';
import { WishItemComponent } from './wish-item/wish-item.component';
import { CreateWishComponent } from './create-wish/create-wish.component';
import { PreviewFilesComponent } from './preview-files/preview-files.component';
import { OptionsWishComponent } from './options-wish/options-wish.component';
import { EditWishComponent } from './edit-wish/edit-wish.component';
import { ViewWishComponent } from './view-wish/view-wish.component';
import { ViewFilesComponent } from './view-files/view-files.component';
import { ViewImageComponent } from './view-image/view-image.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { MessageBasicComponent } from './message-basic/message-basic.component';
import { MessageDocumentComponent } from './message-document/message-document.component';
import { UrlPreviewComponent } from './url-preview/url-preview.component';
import { ReactionsPostsComponent } from './reactions-posts/reactions-posts.component'
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { AwardsPage} from '../profile/awards/awards.page';
import { ExperiencePage} from '../profile/experience/experience.page';
import { AptitudesPage} from '../profile/aptitudes/aptitudes.page';
import { IonicRatingModule } from 'ionic4-rating';
import { StructureComponent } from 'src/app/profile/structure/structure.component';

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
    EmojiModule
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
    StructureComponent,
    SharedNotificationComponent,
    MentionNotificationComponent,
    ButtonNotificationComponent,
    ButtonSearchFriendComponent,
    ViewFilesComponent,
    WishItemComponent,
    CreateWishComponent,
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

  ],
  exports:[
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
    FriendsMobileComponent,
    HeaderPostComponent,
    CommentPostComponent,
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
    ReactionsPostsComponent,
    ViewProfileComponent,

  ]
})
export class ComponentsModule { }
