import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { take } from 'rxjs/operators';
import { ILike } from 'src/app/models/iPost';
import { LikedNewsPipe } from 'src/app/pipes/liked-news.pipe';
import { CommentService } from 'src/app/service/comment.service';
import { NewsService } from 'src/app/service/news.service';
import { ShareService } from 'src/app/service/share.service';
import { UserService } from 'src/app/service/user.service';
import {
  sports,
  sportsCycling,
  waterSports,
  motorSports,
  combinedTests,
  athletics,
  precisionSports,
  gymnastics,
  winterSports,
  combatSports,
  teamSports,
  strengthSports,
  tableSports,
  animalSports,
  xtremeSports,
  slidingSports,
  airSports,
  mountainSports,
  danceSports,
} from "src/config/sports";
@Component({
  selector: 'news-wall',
  templateUrl: './news-wall.component.html',
  styleUrls: ['./news-wall.component.scss'],
})
export class NewsWallComponent implements OnInit {

  @Input() new;
  @Output() openNew = new EventEmitter();
  constructor(
    public userService:UserService,
    public newsService:NewsService,
    public commentService:CommentService,
    private shareService: ShareService,
  ) { }

  ngOnInit() {
    this.getCountReacions()
    this.getCommentsCount()
    this.getTotalShared()
    this.findSportImage(this.new.sport)
  }
  OpenNews(){
    this.openNew.emit(this.new._id)
  }

   /**
   * Cantidad de reacciones en el news
   */
    countReacions = 0;

    /**
     * Obtener la cantidad de reacciones en el news
     */
  getCountReacions() {
    
    this.newsService
      .countReactionsByNews(this.new._id)
      .pipe(take(1))
      .subscribe((reactions) => {
        this.countReacions = reactions;
        console.log("reaction",reactions)
        this.IReacted();
      });
  }

/**
   * La reaccion actual del usuario
   */
 reaction: ILike = null;




  /**
   * Cantidad de reacciones en el news
   */
   countComments = 0;
 /**
   * Saber si el usuario acual, reacciono al news
   */
  async IReacted() {
    this.reaction = await new LikedNewsPipe(
      this.newsService,
      this.userService
    ).transform(this.new._id, this.countReacions);
  }

  getCommentsCount(){
    this.commentService.getCountsOfCommentsNews(this.new._id).subscribe((response)=>{
      this.countComments = response;
      console.log("comment",response)
    })
  }


  totalShared = 0;
  async getTotalShared() {
    this.totalShared = await this.shareService
      .getTotalSharedsInNews(this.new._id)
      .toPromise();
      console.log("shared",this.totalShared);
      
  }




  sportImg;
  findSportImage(sport){
    for(let element of this.list){
     let find = element.sports.find(x => x == sport )
      if(find != undefined){
        this.sportImg = element.img
        break
      }
    }
  }

  list = [
    {
      type: "sportsCycling",

      sports: sportsCycling,
      img: "assets/sports/cycling.png",
    },
    {
      type: "waterSports",

      sports: waterSports,
      img: "assets/sports/swimming.png",
    },
    {
      type: "motorSports",

      sports: motorSports,
      img: "assets/sports/wheel.png",
    },
    {
      type: "combinedTests",

      sports: combinedTests,
      img: "assets/sports/combined.png",
    },
    {
      type: "athletics",
      sports: athletics,
      img: "assets/sports/athletics.png",
    },
    {
      type: "precisionSports",
      sports: precisionSports,
      img: "assets/sports/archery.png",
    },
    {
      type: "gymnastics",
      sports: gymnastics,
      img: "assets/sports/various.png",
    },
    {
      type: "winterSports",
      sports: winterSports,
      img: "assets/sports/winter.png",
    },
    {
      type: "combatSports",
      sports: combatSports,
      img: "assets/sports/karate.png",
    },
    {
      type: "teamSports",
      sports: teamSports,
      img: "assets/sports/team.png",
    },
    {
      type: "strengthSports",
      sports: strengthSports,
      img: "assets/sports/strength.png",
    },
    {
      type: "tableSports",
      sports: tableSports,
      img: "assets/sports/table_tennis.png",
    },
    {
      type: "animalSports",
      sports: animalSports,
      img: "assets/sports/hriding.png",
    },
    {
      type: "xtremeSports",
      sports: xtremeSports,
      img: "assets/sports/climbingx.png",
    },
    {
      type: "slidingSports",
      sports: slidingSports,
      img: "assets/sports/sliding.png",
    },
    {
      type: "airSports",
      sports: airSports,
      img: "assets/sports/skydiving.png",
    },
    {
      type: "mountainSports",
      sports: mountainSports,
      img: "assets/sports/climbing.png",
    },
    {
      type: "danceSports",
      sports: danceSports,
      img: "assets/sports/dancer.png",
    },
  ];
}
