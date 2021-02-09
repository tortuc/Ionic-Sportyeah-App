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

this.postUser = this.todolosPost.filter((post:any)=>{
  console.log(post.post.user._id)
  console.log(this.userService.User._id)
  return post.post.user._id == this.userService.User._id
})
console.log(this.postUser)
    })
   

    
  }

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
