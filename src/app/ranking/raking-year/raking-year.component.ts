import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { NewsService } from 'src/app/service/news.service';
import { ViewsProfileService } from "src/app/service/views-profile.service";
import * as moment from 'moment';
@Component({
  selector: 'raking-year',
  templateUrl: './raking-year.component.html',
  styleUrls: ['./raking-year.component.scss'],
})
export class RakingYearComponent implements OnInit {

  constructor(
    public userService:UserService,
    private router:Router,
    public newsService:NewsService,
    private viewsProfileService: ViewsProfileService
  ) { }
  @Input() AllPost:any
  @Input() country:boolean
  @Input() segment:any 

  ngOnInit() {
    this.year();
    }
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
    
     this.likes = todolosPost.filter((post:any)=>{
      console.log(post.likes.length)
       return (post.likes.length > 0)
     })
     console.log(this.likes) 

     this.comments = todolosPost.filter((post:any)=>{
     return (post.comments.length > 0)
   })
console.log(this.comments) 
   this.shareds = todolosPost.filter((post:any)=>{
     return (post.shareds.length > 0)
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
    */
   }
   year(){
     this.filterAllPost()
     .then(()=>{
    
      if(this.country){
        this.likes.filter((post)=>{
          if(post.post.user.geo){
          post.user.geo != null && post.user.geo.country == this.userService.User.geo.country
        }
        })
        this.comments.filter((post)=>{
           if(post.post.user.geo){
          post.user.geo != null && post.user.geo.country == this.userService.User.geo.country
        }
         })
         this.shareds.filter((post)=>{
           if(post.post.user.geo){
          post.user.geo != null && post.user.geo.country == this.userService.User.geo.country
        }
         })
      }
    let currentDate = moment().dayOfYear(1);
    let yearStart = currentDate.clone().startOf('year');
    let yearEnd = currentDate.clone().endOf('year');
  
    let year = [];
    for (let i = 0; i <= 364; i++) {
  
      year.push(moment(yearStart).add(i, 'days').format('YYYY-MM-DD'));
  
    };
    for(let i = 0; i <= this.likes.length-1;i++){
      let newLikesPost = [];
        this.likes[i].likes.filter((fecha)=>{
         for(let day of year){
           if(moment(fecha.date).format('YYYY-MM-DD') ==  moment(day).format('YYYY-MM-DD')){
             newLikesPost.push(fecha)
           }
         } 
       }) 
       this.likes[i].likes = newLikesPost
      }
   
    
      for(let i = 0; i <= this.comments.length-1;i++){
       let newCommnetsPost = [];
         this.comments[i].comments.filter((fecha)=>{
          for(let day of year){
            if(moment(fecha.date).format('YYYY-MM-DD') ==  moment(day).format('YYYY-MM-DD')){
              newCommnetsPost.push(fecha)
            }
          } 
        }) 
        this.comments[i].comments = newCommnetsPost
     }
   
   
     for(let i = 0; i <= this.shareds.length-1;i++){
       let newSharedsPost = [];
         this.shareds[i].shareds.filter((fecha)=>{
          for(let day of year){
            if(moment(fecha.date).format('YYYY-MM-DD') ==  moment(day).format('YYYY-MM-DD')){
              newSharedsPost.push('fecha')
            }
          } 
        }) 
        this.shareds[i].shareds = newSharedsPost
        
     }
   
     this.likes = this.likes.filter((post:any)=>{
       return post.likes.length > 0
     })
     this.comments = this.comments.filter((post:any)=>{
       return post.comments.length > 0
     })
     this.shareds = this.shareds.filter((post:any)=>{
       return post.shareds.length > 0
     })
     this.userPosition() 
    })
  }
}
