import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-reactions-posts',
  templateUrl: './reactions-posts.component.html',
  styleUrls: ['./reactions-posts.component.scss'],
})
export class ReactionsPostsComponent implements OnInit {
  @Input () post:any
  constructor(
    private popover:PopoverController
  ) { }

  ngOnInit() {}


/* animations() {
    (".like-btn").hover(function() {
        (".reaction-icon").each(function(index, element) {
            setTimeout(function() {
                (element).addClass("show");
            }, index * 100);
        });
    }, function() {
        (".reaction-icon").removeClass("show")
    });
} */

  like(){
    this.popover.dismiss({
      action:"1",
      post:this.post
    })
  }


  love(){
    this.popover.dismiss({
      action:"2",
      post:this.post
    })
  }

  haha(){
    this.popover.dismiss({
      action:"3",
      post:this.post
    })
  }


  yay(){
    this.popover.dismiss({
      action:"4",
      post:this.post
    })
  }

  wow(){
    this.popover.dismiss({
      action:"5",
      post:this.post
    })
  }


  sad(){
    this.popover.dismiss({
      action:"6",
      post:this.post
    })
  }


  angry(){
    this.popover.dismiss({
      action:"7",
      post:this.post
    })
  }

  close(){
    this.popover.dismiss({
      action:"close"
    })
  }

}






