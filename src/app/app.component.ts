import { Component, OnInit, HostListener } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from './service/login.service';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';
import { ChatService } from './service/chat.service';
import { NotificationService } from './service/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  @HostListener('document:ionBackButton',['$event'])
  private async overrideHardwareBackAction($event:any){
    await this.modalController.dismiss();
  }
  
  public banderaIP:string = null;
  public ipLoaded: Promise<boolean>;
  public selectedIndex = 0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService:LoginService,
    public userService:UserService,
    private router:Router,
    public modalController: ModalController,
    public translate:TranslateService,
    public chatService:ChatService,
    public notificationService:NotificationService,
  ) {
    this.initializeApp();
    translate.addLangs(["es","en"])
    translate.setDefaultLang('es');
    translate.use('es'); 
  
 
  }




  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }



  logout(){
    this.userService.logout()
  }

  goTo(r){
    this.router.navigate([r])
  }

  public appPages = [
    {
      title:'sidebar.profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title:'sidebar.home',
      url: '/dashboard',
      icon: 'home'
    },
    {
      title:'sidebar.chat',
      url: '/chat',
      icon: 'chatbox-ellipses'
    },
    {
      title:'sidebar.news',
      url: '/news',
      icon: 'newspaper'
    },
    
  ];

  public giftPages = [
    /* {
      title:'sidebar.wishes',
      url:'/wishes',
      icon:'list'
    },
    {
      title:'sidebar.event',
      url:'/event',
      icon:'create'
    },
    {
      title:'sidebar.eventlist',
      url:'/eventlist',
      icon:'albums'
    },
    {
      title:'sidebar.calendar',
      url: '/calendar',
      icon: 'calendar'
    } */
  ]

  ngOnInit() {
    this.loginService.getIP().subscribe((geo)=>{this.banderaIP = geo.country;this.ipLoaded = Promise.resolve(true);});

  }
 
}
