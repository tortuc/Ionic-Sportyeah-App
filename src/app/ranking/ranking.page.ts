import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { PostService } from "src/app/service/post.service";
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  constructor(
    private postService: PostService,
    private userService:UserService
  ) { }

  segment=0;

  ngOnInit() {
    this.postService.getAllPost().subscribe((post:any)=>{
      this.todolosPost = post;
     
      this.likes = post.filter((post:any)=>{
        return post.likes.length > 0
      })
      
      this.comments = post.filter((post:any)=>{
       return post.comments.length > 0
     })
  
     this.shareds = post.filter((post:any)=>{
       return post.shareds.length > 0
     })

console.log(this.likes[1])
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
this.postUser = this.todolosPost.filter((post:any)=>{
  return post.post.user._id == this.userService.User._id
})

//encuentra el post con mas likes del usuario
let position = 0;
for(let like of this.likes){
  if(like.post.user._id == this.userService.User._id){
    this.userLike = like
    this.positionLike = position + 1
    break
  }
  position += 1
}

//encuentra el post con mas comentarios del usuario
let positionC = 0;
for(let comment of this.comments){
  if(comment.post.user._id == this.userService.User._id){
    this.userComment = comment
    this.positionComment = positionC + 1
    break
  }
  positionC += 1
}

//encuentra el post con mas compartidos del usuario
let positionS = 0;
for(let shared of this.shareds){
  if(shared.post.user._id == this.userService.User._id){
    this.userShared = shared
    this.positionShared = positionS + 1
    break
  }
  positionS += 1
}

    })
   

    
  }

positionLike
userLike;
positionComment
userComment;
positionShared
userShared;
//Datos para los post,en seccion de post
todolosPost = [];
postUser = [];
likes = [];
comments = [];
shareds = [];
interaccionActual = '';
actualLikes(){
  this.interaccionActual = 'likes';
}
actualComments(){
  this.interaccionActual = 'comments';
}
actualShareds(){
  this.interaccionActual = 'shareds';
}


}
