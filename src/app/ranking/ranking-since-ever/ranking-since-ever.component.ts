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
      
      this.ranking = resp.ranking
      this.myPosition = resp.myPosition
      this.total = resp.total
      this.load = true
      
    },(e)=>{
      
    })
  }

  getSharedsData(country){
    
    this.rankingService.getRankingSharedsAllTime(this.userService.User._id,country).pipe(take(1))
    .subscribe((resp)=>{
      
      this.ranking = resp.ranking
      this.myPosition = resp.myPosition
      this.total = resp.total
      this.load = true
      
    },(e)=>{
      
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
}
