import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PickerModule } from "@ctrl/ngx-emoji-mart";
import { DirectivesModule } from "../directives/directive.module";
import { EmojiModule } from "@ctrl/ngx-emoji-mart/ngx-emoji";
import { ComponentsSharedModule } from "../shared-components/components-shared.module";
import { ContenteditableValueAccessorModule } from "@tinkoff/angular-contenteditable-accessor";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "../pipes/pipes.module";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "@ionic/angular";
import { CommentPostComponent } from "../post-components/comment-post/comment-post.component";
import { ViewCommentComponent } from "../post-components/view-comment/view-comment.component";
import { ReportCommentComponent } from "../post-components/view-comment/report-comment/report-comment.component";
import { ViewRespondsCommentComponent } from "../post-components/view-comment/view-responds-comment/view-responds-comment.component";
import { CommentsInCommentComponent } from "../post-components/view-comment/comment-options/comments-in-comment/comments-in-comment.component";
import { ReactToCommentComponent } from "../post-components/view-comment/comment-options/react-to-comment/react-to-comment.component";
import { CommentOptionsComponent } from "../post-components/view-comment/comment-options/comment-options.component";

const components = [
  CommentOptionsComponent,
  ReactToCommentComponent,
  CommentsInCommentComponent,
  ViewRespondsCommentComponent,
  ReportCommentComponent,
  ViewCommentComponent,
  CommentPostComponent


]
@NgModule({
  declarations: components,
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
  exports:components
})
export class CommentComponentsModule {}
