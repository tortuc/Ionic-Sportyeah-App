import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { NewsService } from 'src/app/service/news.service';
import { ViewsProfileService } from "src/app/service/views-profile.service";
import * as moment from 'moment';
import { IRanking, IRankingRank, RankingService } from 'src/app/service/ranking.service';
import { take } from 'rxjs/operators';
import { IPost } from 'src/app/models/iPost';



@Component({
  selector: 'ranking-since-ever',
  templateUrl: './ranking-since-ever.component.html',
  styleUrls: ['./ranking-since-ever.component.scss'],
})
export class RankingSinceEverComponent implements OnInit,OnChanges {

  constructor(
    public userService:UserService,
    private router:Router,
    public newsService:NewsService,
    private viewsProfileService: ViewsProfileService,
    private rankingService:RankingService
  ) { }
  @Input() AllPost:any
  @Input() country:boolean 
  @Input() segment:any 
  ngOnInit() {

 
  }

 
  ngOnChanges(){
    
    this.getData()
  }


  ranking:IRankingRank[] = [];
  myPosition = 0;
  total = 0;

  load = false
  getData(){
    let country = 'null'
    if(this.country){
      country = this.userService.User?.geo.country
    }
    
    switch (this.segment.toString()) {
      case '0':
        this.getLikesData(country)
        break;
      case '1':
        this.getCommentData(country)
        break;
      case '2':
        this.getSharedsData(country)
        break;
    
      case '3':
        this.getViewsData(country)
        break;

      default:
        break;
    }

  }

  getLikesData(country){
    
    this.rankingService.getRankingReactionsAllTime(this.userService.User._id,country).pipe(take(1))
    .subscribe((resp)=>{
      this.ranking = resp.ranking
      this.myPosition = resp.myPosition
      this.total = resp.total
      this.load = true
      
    })
  }

  getCommentData(country){
    
    this.rankingService.getRankingCommentsAllTime(this.userService.User._id,country).pipe(take(1))
    .subscribe((resp)=>{
      console.log(resp);
      
      this.ranking = resp.ranking
      this.myPosition = resp.myPosition
      this.total = resp.total
      this.load = true
      
    },(e)=>{
      console.error(e);
      
    })
  }

  getSharedsData(country){
    
    this.rankingService.getRankingSharedsAllTime(this.userService.User._id,country).pipe(take(1))
    .subscribe((resp)=>{
      console.log(resp);
      
      this.ranking = resp.ranking
      this.myPosition = resp.myPosition
      this.total = resp.total
      this.load = true
      
    },(e)=>{
      console.error(e);
      
    })
  }

  getViewsData(country){
    
    this.rankingService.getRankingViewsAllTime(this.userService.User._id,country).pipe(take(1))
    .subscribe((resp)=>{
      console.log(resp);
      
      this.ranking = resp.ranking
      this.myPosition = resp.myPosition
      this.total = resp.total
      this.load = true
      
    },(e)=>{
      console.error(e);
      
    })
  }

  goToProfile(id,username){
    if(id == this.userService.User._id){
      this.router.navigate(["/profile"])
    }else{
      //this.router.navigate([`/user/${username}`])
      this.userService.getUserByUsername(username)
      .subscribe(
        (resp:any)=>{
          this.viewsProfileService
            .updateProfileView(this.userService.User._id, resp.user._id,'ranking',null)
            .subscribe((response) => {
              this.router.navigate([`/user/${username}`])
            });
        }
      )
    }
  }

/* 

  positionLike
  userLike;
  positionComment
  userComment;
  positionShared
  userShared;
  likes
  comments
  shareds
  postUser
  goToProfile(id,username){
    if(id == this.userService.User._id){
      this.router.navigate(["/profile"])
    }else{
      //this.router.navigate([`/user/${username}`])
      this.userService.getUserByUsername(username)
      .subscribe(
        (resp:any)=>{
          this.viewsProfileService
            .updateProfileView(this.userService.User._id, resp.user._id,'ranking',null)
            .subscribe((response) => {
              this.router.navigate([`/user/${username}`])
            });
        }
      )
    }
  }
  async filterAllPost(){
    return new Promise((resolve)=>{
      let todolosPost = this.AllPost
      if(this.country){
        todolosPost = this.AllPost.filter((post)=>{
         if(post.post.user.geo){
           post.user.geo != null && post.user.geo.country == this.userService.User.geo.country
         }
       })
     }
     this.likes = this.AllPost.filter((post:any)=>{
       return post.likes.length > 0
     })
     
     this.comments = this.AllPost.filter((post:any)=>{
     return post.comments.length > 0
   })
 
   this.shareds = this.AllPost.filter((post:any)=>{
     return post.shareds.length > 0
   })
   //Ordena de mayor a menor el post con mas reacciones
   this.likes.sort(function(b, a) {
   return a.likes.length - b.likes.length ;
   });
 
   //Ordena de mayor a menor el post con mas comentarios
   this.comments.sort(function(b, a) {
   return a.comments.length - b.comments.length ;
   });
 
   //Ordena de mayor a menor el post con mas veces compartido
   this.shareds.sort(function(b, a) {
   return a.shareds.length - b.shareds.length ;
   });
 
   //Revisar para que sirve
   this.postUser = todolosPost.filter((post:any)=>{
   return post.post.user._id == this.userService.User._id
   })
   resolve(true)
 })
 } 
 
   userPosition(){
     //encuentra el post con mas likes del usuario
   let position = 0;
   if(this.likes.length == 0){
     this.userLike = undefined;
     this.positionLike = undefined;
   }else{
     for(let like of this.likes){
       if(like.post.user._id == this.userService.User._id){
         this.userLike = like
         this.positionLike = position + 1
         break
       }
       this.userLike = undefined;
       this.positionLike = undefined;
       position += 1
     }
   }
   
   //encuentra el post con mas comentarios del usuario
   let positionC = 0;
   
   if(this.comments.length == 0){
     this.userComment = undefined;
       this.positionComment = undefined;
   }else{
     for(let comment of this.comments){
       if(comment.post.user._id == this.userService.User._id){
         this.userComment = comment
         this.positionComment = positionC + 1
         break
       }
       this.userComment = undefined;
         this.positionComment = undefined;
       positionC += 1
     }
   }
   
   //encuentra el post con mas compartidos del usuario
   let positionS = 0;
   
   if(this.shareds.length == 0){
     this.userShared = undefined;
     this.positionShared = undefined;
   }else{
     for(let shared of this.shareds){
       if(shared.post.user._id == this.userService.User._id){
         this.userShared = shared
         this.positionShared = positionS + 1
         break
       }
       this.userShared = undefined;
         this.positionShared = undefined;
       positionS += 1
     }
   }
   /* console.log(this.userLike)
   console.log(this.userComment)
   console.log(this.userShared)
    
   } */
}
