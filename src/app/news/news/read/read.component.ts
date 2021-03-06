import { Component, OnInit } from "@angular/core";
import { NewsService } from "../../../service/news.service";
import { ActivatedRoute, Router } from "@angular/router";
import { QuestionService } from "src/app/service/question.service";
import { UserService } from "src/app/service/user.service";
import { ViewsSponsorService } from "src/app/service/views-sponsor.service";
import { take } from "rxjs/operators";
import { CommentService } from "src/app/service/comment.service";
import { SponsorService } from "src/app/service";
import { ISponsor } from "src/app/models/ISponsor";
import { User } from "src/app/models/IUser";
import { ModalController, Platform } from "@ionic/angular";
import { SeeFilesPostSliderComponent } from "src/app/post-components/see-files-post-slider/see-files-post-slider.component";
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
import { element } from "protractor";
@Component({
  selector: "app-read",
  templateUrl: "./read.component.html",
  styleUrls: ["./read.component.scss"],
})
export class ReadComponent implements OnInit {
  constructor(
    public newsService: NewsService,
    private route: ActivatedRoute,
    public questionService: QuestionService,
    public userService: UserService,
    private viewsSponsorService: ViewsSponsorService,
    public commentService: CommentService,
    private sponsorService: SponsorService,
    private router: Router,
    private modalCtrl:ModalController,
    public platform: Platform,
  ) {
    this.idNews = route.snapshot.paramMap.get("id");
    this.getNews(this.idNews);
  }
  idNews;
  async getNews(id) {
    await this.newsService
      .findById(id)
      .toPromise()
      .then( (response: any) => {
        this.news = response;
        this.getComments();
        this.getSponsors(response.news.user._id)
        this.findSportImage(response.news.sport)
      })
      .catch((err) => {
        this.news = 404;
      });
    // this.notified = this.news.news.question
    //   ? this.news.news.question.notified
    //   : undefined;
  }
  news = undefined;
  item = undefined;
  // notified = null;

  ngOnInit() {}
  comments = [];
  loading = false;
  skip = 0;
  sponsors: ISponsor[] = [];
   getSponsors(id) {
    this.sponsorService
      .getAllSponsorsUserById(id)
      .subscribe((sponsors) => {
        this.sponsors = sponsors;
        if (sponsors.length > 6) {
          this.rotateSponsors();
        }
      });
  }
  rotateSponsors() {
    setInterval(() => {
      let last = this.sponsors.pop();
      this.sponsors.unshift(last);
    }, 3000);
  }

  clickOnSponsor(sponsor: ISponsor) {
    let profile = sponsor.idSponsor as User;
    if (profile) {
      this.router.navigate([`/user/${profile.username}`]);
      /**
       * Se usa por si se clickeo al sponsor desde una ventana modal
       */
    } else if (sponsor.customSponsor.url) {
      let url = sponsor.customSponsor.url
        .split("https://")
        .join("")
        .split("http://")
        .join("");
      window.open("//" + url, "_blank");
    }
  }

  getComments() {
    this.loading = true;
    
    this.commentService
      .getCommentsByNews(this.news.news._id, this.skip)
      .pipe(take(1))
      .subscribe(
        (comments) => {
          this.loading = false;
          this.comments = this.comments.concat(comments);
          this.skip += 10;
          
        },
        () => {
          this.loading = false;
        }
      );
  }

  // comments($event) {
  //   this.news.comments = $event;
  // }

  goToSponsor(sponsor,name, id, username, post_id) {
    if (id != this.userService.User._id) {
      this.userService.getUserByUsername(username).subscribe((resp: any) => {
        this.viewsSponsorService
          .createSponsorView({
            user: resp.user._id,
            visitor: this.userService.User._id,
            from: "news",
            link: `/news/read/${post_id}`,
            nameSponsor: name,
          })
          .subscribe((response) => {
            window.location.replace(sponsor);
          });
      });
    }
  }

  goToSponsorComment(sponsor,name, id, news_id) {
    if (id != this.userService.User._id) {
      this.viewsSponsorService
        .createSponsorView({
          user: id,
          visitor: this.userService.User._id,
          from: "comment",
          link: `/news/read/${news_id}`,
          nameSponsor: name,
        })
        .subscribe((response) => {
          window.location.replace(sponsor);
        });
    }
  }

  voted(voted: boolean) {
    if (voted) {
      this.getNews(this.idNews);
    }
  }


  isLink(origen){
    let string: string = origen;
      let match = string.match(
        /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g
      );
      if(match){
        window.open(origen);
      }
  }


  newComment(event) {
    this.comments.unshift(event);
  }

  async seeFiles(format,urlImage){
    let modal = await this.modalCtrl.create({
      component:SeeFilesPostSliderComponent,
      componentProps:{files:[{format,url:urlImage}]}
    })
    modal.present()
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
