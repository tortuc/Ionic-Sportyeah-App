import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "src/app/pipes/pipes.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ContenteditableValueAccessorModule } from "@tinkoff/angular-contenteditable-accessor";
import { EmojiModule } from "@ctrl/ngx-emoji-mart/ngx-emoji";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { DirectivesModule } from "src/app/directives/directive.module";
import { RouterModule } from "@angular/router";
import { ComponentsSharedModule } from "../shared-components/components-shared.module";
import { CommentPostComponent } from "./comment-post/comment-post.component";
import { SeeFilesPostSliderComponent } from "./see-files-post-slider/see-files-post-slider.component";
import { ReactToPostsComponent } from "./react-to-posts/react-to-posts.component";
import { LikesPostComponent } from "./likes-post/likes-post.component";
import { AllReactionsComponent } from "./all-reactions/all-reactions.component";
import { LikesReactionsComponent } from "./likes-reactions/likes-reactions.component";
import { PostOptionsComponent } from "../components/post-options/post-options.component";
import { UserItemReactionsComponent } from "./user-item-reactions/user-item-reactions.component";
import { CommentsInPotsComponent } from "./comments-in-pots/comments-in-pots.component";
import { SharedsInPostComponent } from "./shareds-in-post/shareds-in-post.component";
import { NewPostPage } from "../dashboard/new-post/new-post.page";
import { PostSharedComponent } from "../components/post-shared/post-shared.component";
import { SharedsPostComponent } from "./shareds-post/shareds-post.component";
import { ViewPostComponent } from "./view-post/view-post.component";
import { HeaderPostComponent } from "../components/header-post/header-post.component";
import { PostContentComponent } from "../components/post-content/post-content.component";
import { SeeFilesPostContentComponent } from "./see-files-post-content/see-files-post-content.component";
import { SharePopoverComponent } from "./share-popover/share-popover.component";
import { SponsorsModule } from "../sponsors-components/sponsors.module";

const componets = [
  CommentPostComponent,
  SeeFilesPostSliderComponent,
  ReactToPostsComponent,
  LikesPostComponent,
  AllReactionsComponent,
  UserItemReactionsComponent,
  LikesReactionsComponent,
  PostOptionsComponent,
  SharedsPostComponent,
  CommentsInPotsComponent,
  SharedsInPostComponent,
  NewPostPage,
  PostSharedComponent,
  ViewPostComponent,
  HeaderPostComponent,
  PostContentComponent,
  SeeFilesPostContentComponent,
  SharePopoverComponent
  
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    ContenteditableValueAccessorModule,
    ComponentsSharedModule,
    EmojiModule,
    PickerModule,
    DirectivesModule,
    RouterModule,
    SponsorsModule
  ],
  declarations: componets,

  exports: componets,
})
export class PostComponetsModule {}
