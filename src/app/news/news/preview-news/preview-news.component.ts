import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ISponsor } from 'src/app/models/ISponsor';
import { User } from 'src/app/models/IUser';
import { SponsorService } from 'src/app/service';
import { UserService } from 'src/app/service/user.service';
import { ViewsSponsorService } from 'src/app/service/views-sponsor.service';

@Component({
  selector: 'preview-news',
  templateUrl: './preview-news.component.html',
  styleUrls: ['./preview-news.component.scss'],
})
export class PreviewNewsComponent implements OnInit {

  constructor(
    private sponsorService: SponsorService,
    private viewsSponsorService: ViewsSponsorService,
    public userService: UserService,
    private router: Router,
    public platform: Platform,
    ) { }

  @Input() news;  
  @Input() edit:boolean = false;  
  @Input() published = undefined;
  @Output() readyNot = new EventEmitter
  @Output() publishNews = new EventEmitter

  ngOnInit() { 
    this.getSponsors()
  }
  preview = 'desktop_view'
  sponsors: ISponsor[] = [];
   getSponsors() {
    this.sponsorService
      .getAllSponsorsUserById(this.userService.User._id)
      .subscribe((sponsors) => {
        this.sponsors = sponsors;
        if (sponsors.length > 6) {
          this.rotateSponsors();
        }
      });
  }
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

  notReady(){
    this.readyNot.emit(false)
  }

  publish(){
    this.publishNews.emit(false)
  }

  readNews(){
    this.router.navigate([`news/read/${this.published}`]);
  }

}
