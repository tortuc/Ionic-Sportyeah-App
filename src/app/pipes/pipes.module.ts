import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LinksPipe } from "./links.pipe";
import { IconsPipe } from "./icons.pipe";
import { LikedPipe } from "./liked.pipe";
import { YoutubePipe } from "./youtube.pipe";
import { DiffTimePipe } from "./diff-time.pipe";
import { ScrollChatPipe } from "./scroll-chat.pipe";
import { MentionsPipe } from "./mentions.pipe";
import { SafeUrlPipe } from "./safe-url.pipe";
import { CustomDisplayDatePipe } from "./custom-display-date.pipe";
import { CommentedPipe } from "./commented.pipe";
import { SharedPipe } from "./shared.pipe";
import { CustomCurrencyPipe } from "./custom-currency.pipe";
import { CanVotePipe } from './can-vote.pipe';
import { ShowReactionsImagePipe } from "./show-reactions-image.pipe";

const pipes = [
  LinksPipe,
  LikedPipe,
  IconsPipe,
  YoutubePipe,
  DiffTimePipe,
  ScrollChatPipe,
  ScrollChatPipe,
  MentionsPipe,
  SafeUrlPipe,
  CustomDisplayDatePipe,
  CommentedPipe,
  SharedPipe,
  CustomCurrencyPipe,
  CanVotePipe,
  ShowReactionsImagePipe
  
]
@NgModule({
  imports: [CommonModule],
  declarations: pipes,
  exports: pipes,
})
export class PipesModule {}
