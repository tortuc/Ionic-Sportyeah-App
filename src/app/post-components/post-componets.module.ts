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
import { NewPostHeaderComponent } from "./new-post-header/new-post-header.component";
import { PostPreviewImagesComponent } from "./post-preview-images/post-preview-images.component";
import { PostPreviewImagesSliderComponent } from "./post-preview-images-slider/post-preview-images-slider.component";
import { ViewCommentComponent } from "./view-comment/view-comment.component";
import { SeeFilesPostSliderComponent } from "./see-files-post-slider/see-files-post-slider.component";
import { QuestionCommentComponent } from "../components/question-comment/question-comment.component";
import { EditQuestionComponent } from "../components/edit-question/edit-question.component";
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

const componets = [
  CommentPostComponent,
  NewPostHeaderComponent,
  PostPreviewImagesComponent,
  PostPreviewImagesSliderComponent,
  ViewCommentComponent,
  SeeFilesPostSliderComponent,
  QuestionCommentComponent,
  EditQuestionComponent,
  ReactToPostsComponent,
  LikesPostComponent,
  AllReactionsComponent,
  LikesReactionsComponent,
  PostOptionsComponent,
  SharedsPostComponent,
  UserItemReactionsComponent,
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
  declarations: componets,
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
  ],
  exports: componets,
})
export class PostComponetsModule {}
