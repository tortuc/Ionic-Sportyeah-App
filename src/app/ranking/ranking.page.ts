import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { PostService } from "../service/post.service";
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
  //@ViewChild('slide') slide;

  constructor(
    private postService: PostService,
    private userService:UserService,
  ) {
     this.postService.getAllPost().subscribe((post:any)=>{ 
      this.todolosPost = post;
     /*  this.filterAllPost()
      this.userPosition() */
    })
   }

  segment=0;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  ngOnInit() {
    if(this.userService.User.geo != undefined){
      this.banderaIP = this.userService.User.geo.country;
      this.ipLoaded = Promise.resolve(true);
    }
  }
ipLoaded
banderaIP  
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
country:boolean = false;
filterCountry(){
  if(this.userService.User.geo != null){
    this.country = !this.country;
  }
}
///////////////////////ELiminar su ni sirve//////////////
/* fechaSelect(){
  this.slide.getActiveIndex().then(index => {
    switch (index) {
      case 0:
        this.filterAllPost() 
        break;
      case 1:
        break;  
      case 2:    
        break;
      case 3:  
        break;
      case 4:  
        break;
      default:
        break;
    }  
 });
} */////////////////////ELiminar su ni sirve//////////////

/* goToProfile(id,username){
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
    let todolosPost = []
    if(this.country){
       todolosPost = this.todolosPost.filter((post)=>{
        if(post.post.user.geo){
          post.user.geo != null && post.user.geo.country == this.userService.User.geo.country
        }
      })
    }
    this.likes = todolosPost.filter((post:any)=>{
      return post.likes.length > 0
    })
    
    this.comments = todolosPost.filter((post:any)=>{
    return post.comments.length > 0
  })

  this.shareds = todolosPost.filter((post:any)=>{
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

} */

//Muestra los resultados de hoy

//Muestra los resultados de la semana
/* async week(){
  await this.filterAllPost()
  setTimeout(()=>{ 
  
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
  let currentDate = moment();
  let weekStart = currentDate.clone().startOf('week');
  let weekEnd = currentDate.clone().endOf('week');

  let week = [];
  for (let i = 0; i <= 6; i++) {

    week.push(moment(weekStart).add(i, 'days').format('YYYY-MM-DD'));

  };


   for(let i = 0; i <= this.likes.length-1;i++){
   let newLikesPost = [];
     this.likes[i].likes.filter((fecha)=>{
      for(let day of week){
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
       for(let day of week){
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
       for(let day of week){
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
},300)
}

async month(){
  await this.filterAllPost()
  setTimeout(()=>{ 
  
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
  let currentDate = moment();
  let monthStart = currentDate.clone().startOf('month');
  let monthEnd = currentDate.clone().endOf('month');

  let month = [];
  for (let i = 0; i <= moment(new Date, "YYYY-MM").daysInMonth()-1; i++) {

    month.push(moment(monthStart).add(i, 'days').format('YYYY-MM-DD'));

  };
  
  for(let i = 0; i <= this.likes.length-1;i++){
    let newLikesPost = [];
      this.likes[i].likes.filter((fecha)=>{
       for(let day of month){
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
        for(let day of month){
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
        for(let day of month){
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
  },300)
} */

/* async year(){
  await this.filterAllPost()
  setTimeout(()=>{ 
  
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
  },300)
} */

}
