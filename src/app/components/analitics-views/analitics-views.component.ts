import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { UserService } from "../../service/user.service";
import { Chart } from 'chart.js';
import { ViewsProfileService } from "../../service/views-profile.service";
import { TranslateService } from "@ngx-translate/core";
import * as moment from 'moment';
import { PostService } from '../../service/post.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-analitics-views',
  templateUrl: './analitics-views.component.html',
  styleUrls: ['./analitics-views.component.scss'],
})
export class AnaliticsViewsComponent implements OnInit {

  constructor(
    public userService: UserService,
    private viewsProfileService: ViewsProfileService,
    private translate:TranslateService,
    private cd:ChangeDetectorRef,
    private postService:PostService,
    public toastController: ToastController
  ) {}
  async presentToastWithOptions(message) {
    const toast = await this.toastController.create({
      header: this.translate.instant('analytics-views.information'),
      message:this.translate.instant(message),
      position: 'top',
      color: 'dark',
      duration: 10000,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            
          }
        }
      ]
    });
    toast.present();
  }
  working(){
    this.option='working';
  }
   reactionId = []
   commentId = []
   async introduPost(){
     //Estas tres separan el link para tomar el id del post
     for(let elements of this.commentViews){
      this.commentId.push(elements.link.split('/')[2])
    }
    for(let elements of this.reactionViews){
      this.reactionId.push(elements.link.split('/')[2])
    }
    for(let elements of this.postViews){
      this.postId.push(elements.link.split('/')[2])
    }

    this.find_duplicate_in_array( this.postId)

    for(let elements of this.sortable){
      let post = await this.getPost(elements[0],elements[1])
     this.postDeVerdad.push(post)
    }
   }
   
   postDeVerdad=[]
   //Solicita los post a la db para mostrar
  async getPost(id,i):Promise<any>{
      return await new Promise((resolve)=>{
        this.postService.getPost(id).subscribe((post:any)=>{
          post.post.count = i        
          resolve(post.post)
      })
    })
  }
  
  

//Encuentra los post repetidos y el que tenga mas repeticiones sera el primero
    find_duplicate_in_array(array){
    const count = {}
    const result = []
    array.forEach(item => {
        if (count[item]) {
           count[item] +=1
           return
        }
        count[item] = 1
    })
    
    for (let prop in count){
        if (count[prop] >=1){
            result.push(prop)
        }
    }

    //Estos dos verifican que comentarios y reacciones sean de un post del usuario
    this.commentId.forEach((publi) => {
      for(let key in count){
        if(key == publi){count[key] += 1}
      }
    });
    this.reactionId.forEach((publi) => {
      for(let key in count){
        if(key == publi){count[key] += 1}
      }
    });

   
//Ordena de mayor a menor
for (var idPost in count) {
    this.sortable.push([idPost, count[idPost]]);
    this.totalViewsPost += count[idPost]
}
this.sortable.sort(function(b, a) {
    return a[1] - b[1];
});
    this.count=count
    this.postId=result
    return result;
    
    }

  noData:boolean=false;// es false si no hay datos en la estadistica
  totalViewsPost = 0;
  sortable = [];
  count;
  postId=[];//se le introducen los id de las publicaciones
  //Separamos los campos en diferentes arrays
  allViews;
  postViews;
  chatViews;
  searchViews;
  profileViews;
  reactionViews;
  commentViews;
  bars;
  analyticsToShow;
  indexLast=5;
  async logScrolling(ev){
    let el = await ev.target.getScrollElement()
     if((el.scrollHeight - el.scrollTop < el.clientHeight + 400)){
       this.indexLast += 5
     } 
   }
  ngOnInit() {
    this.viewsProfileService.getProfileView(this.userService.User._id)
    .subscribe((views:any)=>{
      this.allViews = views.visits
      this.postViews = this.allViews.filter((post)=>{
        //post.link = post.link.split('/')[2]
        return post.from == "post"
      })
      this.chatViews = this.allViews.filter((chat)=>{
        return chat.from == "chat"
      })
      this.searchViews = this.allViews.filter((search)=>{
        return search.from == "search"
      })
      this.profileViews = this.allViews.filter((profile)=>{
        return profile.from == "profile"
      })
      this.reactionViews = this.allViews.filter((reaction)=>{
        return reaction.from == "reaction"
      })
      this.commentViews = this.allViews.filter((comment)=>{
        return comment.from == "comment"
      })
      
      this.pieData()
      this.introduPost()
      this.postUsersViews()
    })
   }
   segment='vistas';
postInfoUser=[]
postUserInfo(){
  this.option="postInfo"
}
async postUsersViews(){
  
      for(let elements of this.postViews){
      let post =  await this.getPost(elements.link.split('/')[2],0)
      elements.link =post
      this.postInfoUser.push(elements)
      }
}

 pieData(){
  if(this.allViews.length != 0){
    this.noData = true
  }
  this.option = 'all'
  if(this.allViews.length >0){
    this.analyticsToShow='all'
  }

  this.cd.detectChanges()

  this.bars = new Chart("polarArea", {
    type: 'polarArea',
    data: {
      labels: [this.translate.instant('analytics-views.post'),
      this.translate.instant('analytics-views.chat'),
      this.translate.instant('analytics-views.search'),
      this.translate.instant('analytics-views.profile'),
      this.translate.instant('analytics-views.reaction'),
      this.translate.instant('analytics-views.comment')
    ],
      datasets: [
        {
          label: 'All',
          data: [
            this.postViews.length,this.chatViews.length,this.searchViews.length,
            this.profileViews.length,this.reactionViews.length,this.commentViews.length
          ],
          backgroundColor: [
            'rgb(56, 94, 129,0.6)',
            'rgb(38, 194, 129,0.6)',
            'rgb(212, 60, 60,0.6)',
            'rgb(106, 25, 181,0.6)',
            'rgb(56, 128, 255,0.6)',
            'rgb(238, 241, 48,0.6)',
          ], // array should have same number of elements as number of dataset
          borderColor: [
            'rgb(56, 94, 129,0.6)',
            'rgb(38, 194, 129,0.6)',
            'rgb(212, 60, 60,0.6)',
            'rgb(106, 25, 181,0.6)',
            'rgb(56, 128, 255,0.6)',
            'rgb(238, 241, 48,0.6)',
        ],// array should have same number of elements as number of dataset
          borderWidth: 1
        },
    ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  });
 }

 week = moment()
  daysWeek = {
    0:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
    1:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
    2:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
    3:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
    4:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
    5:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
    6:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0}
  }
  lines

generateWeek(){
  this.noData = false;
  this.daysWeek = {
    0:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
    1:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
    2:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
    3:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
    4:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
    5:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
    6:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0}
  }
  for(let key in this.daysWeek){
    this.daysWeek[key]["date"] = this.week.startOf('week').add(key,'days').format('YYYY-MM-DD')
}

this.allViews.forEach((visits) => {
  let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
  for(let key in this.daysWeek){
    if(this.daysWeek[key].date == date){this.noData = true }
  }
});
  this.linesData();
}

  linesData(){
    this.analyticsToShow='weeks'
     this.cd.detectChanges()
   
  this.postViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
    for(let key in this.daysWeek){
      if(this.daysWeek[key].date == date){this.daysWeek[key].post += 1}
    }
  });

  this.chatViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
    for(let key in this.daysWeek){
      if(this.daysWeek[key].date == date){this.daysWeek[key].chat += 1}
    }  
  });

  this.searchViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
    for(let key in this.daysWeek){
      if(this.daysWeek[key].date == date){this.daysWeek[key].search += 1}
    } 
  });

  this.profileViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
    for(let key in this.daysWeek){
      if(this.daysWeek[key].date == date){this.daysWeek[key].profile += 1}
    } 
  });

  this.reactionViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
    for(let key in this.daysWeek){
      if(this.daysWeek[key].date == date){this.daysWeek[key].reaction += 1}
    }
    
  });

  this.commentViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
    for(let key in this.daysWeek){
      if(this.daysWeek[key].date == date){this.daysWeek[key].comment += 1}
    }
    
  });



  this.lines = new Chart("lines", {
    type: 'line',
    data: {
      labels: [
        this.translate.instant('days.0'),
        this.translate.instant('days.1'),
        this.translate.instant('days.2'),
        this.translate.instant('days.3'),
        this.translate.instant('days.4'),
        this.translate.instant('days.5'),
        this.translate.instant('days.6')
      ],
      datasets: [
        {
        label: this.translate.instant('analytics-views.post'),
        data: [
          this.daysWeek[0].post,
          this.daysWeek[1].post,
          this.daysWeek[2].post,
          this.daysWeek[3].post,
          this.daysWeek[4].post,
          this.daysWeek[5].post,
          this.daysWeek[6].post
        ],
        borderColor: 'rgb(56, 94, 129)',// array should have same number of elements as number of dataset
        backgroundColor: 'rgb(56, 94, 129, 0.1)', // array should have same number of elements as number of dataset
        borderWidth: 1
      },
        {
        label: this.translate.instant('analytics-views.chat'),
        data: [
          this.daysWeek[0].chat,
          this.daysWeek[1].chat,
          this.daysWeek[2].chat,
          this.daysWeek[3].chat,
          this.daysWeek[4].chat,
          this.daysWeek[5].chat,
          this.daysWeek[6].chat
        ],
        borderColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
        backgroundColor: 'rgb(38, 194,129, 0.1)',// array should have same number of elements as number of dataset
        borderWidth: 1
      },
       {
        label: this.translate.instant('analytics-views.search'),
        data: [
          this.daysWeek[0].search,
          this.daysWeek[1].search,
          this.daysWeek[2].search,
          this.daysWeek[3].search,
          this.daysWeek[4].search,
          this.daysWeek[5].search,
          this.daysWeek[6].search
        ],
        borderColor: 'rgb(241, 60, 60)', // array should have same number of elements as number of dataset
        backgroundColor: 'rgb(214, 60,60, 0.1)',// array should have same number of elements as number of dataset
        borderWidth: 1
      },
      {
       label: this.translate.instant('analytics-views.profile'),
       data: [
         this.daysWeek[0].profile,
         this.daysWeek[1].profile,
         this.daysWeek[2].profile,
         this.daysWeek[3].profile,
         this.daysWeek[4].profile,
         this.daysWeek[5].profile,
         this.daysWeek[6].profile
       ],
       borderColor: 'rgb(106, 25, 181)', // array should have same number of elements as number of dataset
       backgroundColor: 'rgb(106, 25, 181, 0.1)',// array should have same number of elements as number of dataset
       borderWidth: 1
     },
     {
      label: this.translate.instant('analytics-views.reaction'),
      data: [
        this.daysWeek[0].reaction,
        this.daysWeek[1].reaction,
        this.daysWeek[2].reaction,
        this.daysWeek[3].reaction,
        this.daysWeek[4].reaction,
        this.daysWeek[5].reaction,
        this.daysWeek[6].reaction
      ],
      borderColor: 'rgb(56, 128, 255)', // array should have same number of elements as number of dataset
      backgroundColor: 'rgb(56, 128, 255, 0.1)',// array should have same number of elements as number of dataset
      borderWidth: 1
    },
    {
      label: this.translate.instant('analytics-views.comment'),
      data: [
        this.daysWeek[0].comment,
        this.daysWeek[1].comment,
        this.daysWeek[2].comment,
        this.daysWeek[3].comment,
        this.daysWeek[4].comment,
        this.daysWeek[5].comment,
        this.daysWeek[6].comment
      ],
      borderColor: 'rgb(238, 241, 48)', // array should have same number of elements as number of dataset
      backgroundColor: 'rgb(238, 241, 48, 0.1)',// array should have same number of elements as number of dataset
      borderWidth: 1
    }
    ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  });
  
  }
  changeWeek(n){
    this.week = moment(this.week).add(n,'weeks')
    this.daysWeek = {
      0:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
      1:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
      2:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
      3:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
      4:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
      5:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0},
      6:{date:null,post:0,chat:0,search:0,profile:0,reaction:0,comment:0}
    }
    this.generateWeek()
  }

  years =[]
  daysYears=[]
  dateStart = moment()//.add(1,'years')
  dateEnd = moment()//.add(1,'years')
  data=[]
  dataPost=[]
  dataChat=[]
  dataSearch=[]
  dataProfile=[]
  dataReaction=[]
  dataComment=[]
  year=new Date().getFullYear()
  generateYear(){
    this.noData = false;
    this.years =[]
   /*  this.dateStart = moment(this.dateStart).add(-1,'years')
    
    this.dateEnd = moment(this.dateEnd).add(-1,'years') */
     // this.dateStart.set('year',moment().year());
      this.dateStart.set('month', 0);  
      this.dateStart.set('date', 1);
     // this.dateEnd.set('year',(year.getFullYear()));
      this.dateEnd.set('month', 0);  
      this.dateEnd.set('date', 0);
      this.dateEnd.add(11, 'month')
      this.dateEnd.add(31, 'days')

      while (this.dateEnd.diff(this.dateStart, 'years') >= 0) {
        while (this.dateEnd.diff(this.dateStart, 'months') >= 0) {
          while (this.dateEnd.diff(this.dateStart, 'days') >= 0) {
            this.years.push({date:this.dateStart.format('YYYY-MM-DD'),post:0,chat:0,search:0,profile:0,reaction:0,comment:0})
            //this.labels.push(this.dateStart.format('MM-DD'))
            this.dateStart.add(1,'days')
           }
          this.dateStart.add(1,'month')
          
         }
        this.dateStart.add(1,'year')
        
      } 
      this.dateStart.add(-2,'years')
      this.dateStart.add(-1,'months')
 
      this.allViews.forEach((visits) => {
        let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
        for(let key in this.years){
          if(this.years[key].date == date){this.noData = true}
        }
      });

      this.linesDataYears()
  }
/* 
  returnMes(fecha,desde){
    let mes=[]
    this.allViews.forEach((visits) => {
      let month = moment(new Date(visits.Date)).format('YYYY-MM-DD')
      for(let key in this.years ){
        if( moment(new Date(this.years[key].date)).format('YYYY-MM-DD') == month && moment(month).format('MM') == fecha && visits.from == desde )
        {mes.push(this.years[key])}
      } 
  });
 
  return mes.length
  } */

  linesDataYears(){
    this.analyticsToShow='years'
    this.cd.detectChanges()
    this.dataPost = []
    this.dataChat = []
    this.dataSearch = []
    this.dataProfile = []
    this.dataReaction = []
    this.dataComment = []
    for(let i=1 ; i <= 12; i++){
      this.dataPost.push(0)
      this.dataChat.push(0)
      this.dataSearch.push(0)
      this.dataProfile.push(0)
      this.dataReaction.push(0)
      this.dataComment.push(0)
    }

    this.postViews.forEach((visits) => {
      let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
      for(let key in this.years){
        let mes = moment(new Date(this.years[key].date)).format('MM')
        if(this.years[key].date == date){
          this.years[key].post += 1
          this.dataPost[+mes-1] += 1
        }
      }
    });

  this.chatViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
    for(let key in this.years){
      let mes = moment(new Date(this.years[key].date)).format('MM')
      if(this.years[key].date == date){
        this.years[key].chat += 1
        this.dataChat[+mes-1] += 1
      }
    }  
  });

  this.searchViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
    for(let key in this.years){
      let mes = moment(new Date(this.years[key].date)).format('MM')
      if(this.years[key].date == date){
        this.years[key].search += 1
        this.dataSearch[+mes-1] += 1
      }
    } 
  });

  this.profileViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
    for(let key in this.years){
      let mes = moment(new Date(this.years[key].date)).format('MM')
      if(this.years[key].date == date){
        this.years[key].profile += 1
        this.dataProfile[+mes-1] += 1
      }
    }
  });

  this.reactionViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
    for(let key in this.years){
      let mes = moment(new Date(this.years[key].date)).format('MM')
      if(this.years[key].date == date){
        this.years[key].reaction += 1
        this.dataReaction[+mes-1] += 1
      }
    }
  });

  this.commentViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
    for(let key in this.years){
      let mes = moment(new Date(this.years[key].date)).format('MM')
      if(this.years[key].date == date){
        this.years[key].comment += 1
        this.dataComment[+mes-1] += 1
      }
    }
  });

 /*  console.log(this.years)
  console.log(this.dataChat)
  console.log(this.dataComment)
  console.log(this.dataPost)
  console.log(this.dataProfile)
  console.log(this.dataReaction)
  console.log(this.dataSearch)
 */
  /* this.dataPost = [
  this.returnMes('01','post'),this.returnMes('02','post'),this.returnMes('03','post'),this.returnMes('04','post'),
  this.returnMes('05','post'),this.returnMes('06','post'),this.returnMes('07','post'),this.returnMes('08','post'),
  this.returnMes('09','post'),this.returnMes('10','post'),this.returnMes('11','post'),this.returnMes('12','post')
];
 
  this.dataChat =  [
  this.returnMes('01','chat'),this.returnMes('02','chat'),this.returnMes('03','chat'),this.returnMes('04','chat'),
  this.returnMes('05','chat'),this.returnMes('06','chat'),this.returnMes('07','chat'),this.returnMes('08','chat'),
  this.returnMes('09','chat'),this.returnMes('10','chat'),this.returnMes('11','chat'),this.returnMes('12','chat')
];

  this.dataSearch = [
    this.returnMes('01','search'),this.returnMes('02','search'),this.returnMes('03','search'),this.returnMes('04','search'),
    this.returnMes('05','search'),this.returnMes('06','search'),this.returnMes('07','search'),this.returnMes('08','search'),
    this.returnMes('09','search'),this.returnMes('10','search'),this.returnMes('11','search'),this.returnMes('12','search')
  ];

  this.dataProfile = [
    this.returnMes('01','profile'),this.returnMes('02','profile'),this.returnMes('03','profile'),this.returnMes('04','profile'),
    this.returnMes('05','profile'),this.returnMes('06','profile'),this.returnMes('07','profile'),this.returnMes('08','profile'),
    this.returnMes('09','profile'),this.returnMes('10','profile'),this.returnMes('11','profile'),this.returnMes('12','profile')
  ];

  this.dataReaction = [
    this.returnMes('01','reaction'),this.returnMes('02','reaction'),this.returnMes('03','reaction'),this.returnMes('04','reaction'),
    this.returnMes('05','reaction'),this.returnMes('06','reaction'),this.returnMes('07','reaction'),this.returnMes('08','reaction'),
    this.returnMes('09','reaction'),this.returnMes('10','reaction'),this.returnMes('11','reaction'),this.returnMes('12','reaction')
  ];
  
  this.dataComment = [
    this.returnMes('01','comment'),this.returnMes('02','comment'),this.returnMes('03','comment'),this.returnMes('04','comment'),
    this.returnMes('05','comment'),this.returnMes('06','comment'),this.returnMes('07','comment'),this.returnMes('08','comment'),
    this.returnMes('09','comment'),this.returnMes('10','comment'),this.returnMes('11','comment'),this.returnMes('12','comment')
  ]; */
 
 
  this.lines = new Chart("linesYear", {
    type: 'line',
    data: {
      labels: [ 
      this.translate.instant('months.0'),this.translate.instant('months.1'),this.translate.instant('months.2'),
      this.translate.instant('months.3'),this.translate.instant('months.4'),this.translate.instant('months.5'),
      this.translate.instant('months.6'),this.translate.instant('months.7'),this.translate.instant('months.8'),
      this.translate.instant('months.9'),this.translate.instant('months.10'),this.translate.instant('months.11')],
      datasets: [
        {
        label: this.translate.instant('analytics-views.post'),
        data: this.dataPost,
        borderColor: 'rgb(56, 94, 129)',// array should have same number of elements as number of dataset
        backgroundColor: 'rgb(56, 94, 129, 0.1)', // array should have same number of elements as number of dataset
        borderWidth: 1
      },
        {
        label: this.translate.instant('analytics-views.chat'),
        data: this.dataChat,
        borderColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
        backgroundColor: 'rgb(38, 194,129, 0.1)',// array should have same number of elements as number of dataset
        borderWidth: 1
      },
       {
        label: this.translate.instant('analytics-views.search'),
        data: this.dataSearch,
        borderColor: 'rgb(241, 60, 60)', // array should have same number of elements as number of dataset
        backgroundColor: 'rgb(214, 60,60, 0.1)',// array should have same number of elements as number of dataset
        borderWidth: 1
      },
      {
       label: this.translate.instant('analytics-views.profile'),
       data:this.dataProfile,
       borderColor: 'rgb(106, 25, 181)', // array should have same number of elements as number of dataset
       backgroundColor: 'rgb(106, 25, 181, 0.1)',// array should have same number of elements as number of dataset
       borderWidth: 1
     },
     {
      label: this.translate.instant('analytics-views.reaction'),
      data: this.dataReaction,
      borderColor: 'rgb(56, 128, 255)', // array should have same number of elements as number of dataset
      backgroundColor: 'rgb(56, 128, 255, 0.1)',// array should have same number of elements as number of dataset
      borderWidth: 1
    },
    {
      label: this.translate.instant('analytics-views.comment'),
      data: this.dataComment,
      borderColor: 'rgb(238, 241, 48)', // array should have same number of elements as number of dataset
      backgroundColor: 'rgb(238, 241, 48, 0.1)',// array should have same number of elements as number of dataset
      borderWidth: 1
    }
    ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  });
  }

  changeYear(n){
 
    this.dateStart = moment(this.dateStart).add(n,'years')
    this.dateEnd = moment(this.dateEnd).add(n,'years')
    this.year = this.year + n
    this.generateYear()
  }
  labelHours=[];
   hours=[];
   hourStart = moment().add(1,'days');
   hourEnd = moment().add(1,'days');
   day=  moment().add(1,'days');;
   linesHour;
generateDay(){
  this.day = moment(this.hourStart).add(-1,'days');
  this.hourStart = moment(this.hourStart ).add(-1,'days');
  this.hourEnd = moment(this.hourEnd ).add(-1,'days');
  this.noData = false;
  this.hours = []
  this.labelHours = [];
  this.hourStart.set('hours', 0); 
  this.hourEnd.set('hours', 0);
  this.hourEnd.add(24,'hours')
  while (this.hourEnd.diff(this.hourStart, 'hours') >= 1) {
    this.hours.push({date:this.hourStart.format('YYYY-MM-DD-HH'),post:0,chat:0,search:0,profile:0,reaction:0,comment:0})
    this.hourStart.add(1,'hours')
  }

  this.allViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD-HH')
    for(let key in this.hours){
      if(this.hours[key].date == date){ this.noData = true}
    }
  });
  
  this.linesHours()
}

/* returnHour(hour,from){
  let hours=[]
  this.allViews.forEach((visits) => {
    let time = moment(visits.Date).format('YYYY-MM-DD-HH')   
    for(let key in this.hours ){
      let now =  moment(this.hours[key].date.slice(0,10)).set('hours', this.hours[key].date.slice(11,13))
      if(now.format('YYYY-MM-DD-HH') == time && moment(visits.Date).format('HH') == hour && visits.from == from )
      {hours.push(this.hours[key])} 
    } 
});
return hours.length
} */
linesHours(){
  this.analyticsToShow='hours'
  this.cd.detectChanges()
  this.dataPost = []
  this.dataChat = []
  this.dataSearch = []
  this.dataProfile = []
  this.dataReaction = []
  this.dataComment = []
  for(let key in this.hours){
    this.dataPost.push(0)
    this.dataChat.push(0)
    this.dataSearch.push(0)
    this.dataProfile.push(0)
    this.dataReaction.push(0)
    this.dataComment.push(0)
  }
  for(let i=0; i <= this.hours.length ; i++){
    this.labelHours.push(i)
  }

    this.postViews.forEach((visits) => {
      let date = moment(new Date(visits.Date)).format('YYYY-MM-DD-HH')
      for(let key in this.hours){
        if(this.hours[key].date == date){
          this.hours[key].post += 1
          this.dataPost[key] += 1
        }
      }
    });

  this.chatViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD-HH')
    for(let key in this.hours){
      if(this.hours[key].date == date){
        this.hours[key].chat += 1
        this.dataChat[key] += 1
      }
    } 
  });

  this.searchViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD-HH')
    for(let key in this.hours){
      if(this.hours[key].date == date){
        this.hours[key].search += 1
        this.dataSearch[key] += 1
      }
    } 
  });

  this.profileViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD-HH')
    for(let key in this.hours){
      if(this.hours[key].date == date){
        this.hours[key].profile += 1
        this.dataProfile[key] += 1
      }
    }
  });

  this.reactionViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD-HH')
    for(let key in this.hours){
      if(this.hours[key].date == date){
        this.hours[key].reaction += 1
        this.dataReaction[key] += 1
      }
    }
  });

  this.commentViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD-HH')
    for(let key in this.hours){
      if(this.hours[key].date == date){
        this.hours[key].comment += 1
        this.dataComment[key] += 1
      }
    }
  });

 /*  this.dataPost = [
    this.returnHour('01','post'),this.returnHour('02','post'),this.returnHour('03','post'),this.returnHour('04','post'),this.returnHour('05','post'),this.returnHour('06','post'),this.returnHour('07','post'),this.returnHour('08','post'),
    this.returnHour('09','post'),this.returnHour('10','post'),this.returnHour('11','post'),this.returnHour('12','post'),this.returnHour('13','post'),this.returnHour('14','post'),this.returnHour('15','post'),this.returnHour('16','post'),
    this.returnHour('17','post'),this.returnHour('18','post'),this.returnHour('19','post'),this.returnHour('20','post'),this.returnHour('21','post'),this.returnHour('22','post'),this.returnHour('23','post')
  ];
   
    this.dataChat =  [
      this.returnHour('01','chat'),this.returnHour('02','chat'),this.returnHour('03','chat'),this.returnHour('04','chat'),this.returnHour('05','chat'),this.returnHour('06','chat'),this.returnHour('07','chat'),this.returnHour('08','chat'),
      this.returnHour('09','chat'),this.returnHour('10','chat'),this.returnHour('11','chat'),this.returnHour('12','chat'),this.returnHour('13','chat'),this.returnHour('14','chat'),this.returnHour('15','chat'),this.returnHour('16','chat'),
      this.returnHour('17','chat'),this.returnHour('18','chat'),this.returnHour('19','chat'),this.returnHour('20','chat'),this.returnHour('21','chat'),this.returnHour('22','chat'),this.returnHour('23','chat')
  ];
  
    this.dataSearch = [
      this.returnHour('01','search'),this.returnHour('02','search'),this.returnHour('03','search'),this.returnHour('04','search'),this.returnHour('05','search'),this.returnHour('06','search'),this.returnHour('07','search'),this.returnHour('08','search'),
      this.returnHour('09','search'),this.returnHour('10','search'),this.returnHour('11','search'),this.returnHour('12','search'),this.returnHour('13','search'),this.returnHour('14','search'),this.returnHour('15','search'),this.returnHour('16','search'),
      this.returnHour('17','search'),this.returnHour('18','search'),this.returnHour('19','search'),this.returnHour('20','search'),this.returnHour('21','search'),this.returnHour('22','search'),this.returnHour('23','search')
    ];
  
    this.dataProfile = [
      this.returnHour('01','profile'),this.returnHour('02','profile'),this.returnHour('03','profile'),this.returnHour('04','profile'),this.returnHour('05','profile'),this.returnHour('06','profile'),this.returnHour('07','profile'),this.returnHour('08','profile'),
      this.returnHour('09','profile'),this.returnHour('10','profile'),this.returnHour('11','profile'),this.returnHour('12','profile'),this.returnHour('13','profile'),this.returnHour('14','profile'),this.returnHour('15','profile'),this.returnHour('16','profile'),
      this.returnHour('17','profile'),this.returnHour('18','profile'),this.returnHour('19','profile'),this.returnHour('20','profile'),this.returnHour('21','profile'),this.returnHour('22','profile'),this.returnHour('23','profile')
    ];
  
    this.dataReaction = [
      this.returnHour('01','reaction'),this.returnHour('02','reaction'),this.returnHour('03','reaction'),this.returnHour('04','reaction'),this.returnHour('05','reaction'),this.returnHour('06','reaction'),this.returnHour('07','reaction'),this.returnHour('08','reaction'),
      this.returnHour('09','reaction'),this.returnHour('10','reaction'),this.returnHour('11','reaction'),this.returnHour('12','reaction'),this.returnHour('13','reaction'),this.returnHour('14','reaction'),this.returnHour('15','reaction'),this.returnHour('16','reaction'),
      this.returnHour('17','reaction'),this.returnHour('18','reaction'),this.returnHour('19','reaction'),this.returnHour('20','reaction'),this.returnHour('21','reaction'),this.returnHour('22','reaction'),this.returnHour('23','reaction')
    ];
    
    this.dataComment = [
      this.returnHour('01','comment'),this.returnHour('02','comment'),this.returnHour('03','comment'),this.returnHour('04','comment'),this.returnHour('05','comment'),this.returnHour('06','comment'),this.returnHour('07','comment'),this.returnHour('08','comment'),
      this.returnHour('09','comment'),this.returnHour('10','comment'),this.returnHour('11','comment'),this.returnHour('12','comment'),this.returnHour('13','comment'),this.returnHour('14','comment'),this.returnHour('15','comment'),this.returnHour('16','comment'),
      this.returnHour('17','comment'),this.returnHour('18','comment'),this.returnHour('19','comment'),this.returnHour('20','comment'),this.returnHour('21','comment'),this.returnHour('22','comment'),this.returnHour('23','comment')
    ]; */
    this.linesHour = new Chart("linesHour", {
      type: 'line',
      data: {
        labels: this.labelHours,
        datasets: [
          {
          label: this.translate.instant('analytics-views.post'),
          data: this.dataPost,
          borderColor: 'rgb(56, 94, 129)',// array should have same number of elements as number of dataset
          backgroundColor: 'rgb(56, 94, 129, 0.1)', // array should have same number of elements as number of dataset
          borderWidth: 1
        },
          {
          label: this.translate.instant('analytics-views.chat'),
          data: this.dataChat,
          borderColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          backgroundColor: 'rgb(38, 194,129, 0.1)',// array should have same number of elements as number of dataset
          borderWidth: 1
        },
         {
          label: this.translate.instant('analytics-views.search'),
          data: this.dataSearch,
          borderColor: 'rgb(241, 60, 60)', // array should have same number of elements as number of dataset
          backgroundColor: 'rgb(214, 60,60, 0.1)',// array should have same number of elements as number of dataset
          borderWidth: 1
        },
        {
         label: this.translate.instant('analytics-views.profile'),
         data:this.dataProfile,
         borderColor: 'rgb(106, 25, 181)', // array should have same number of elements as number of dataset
         backgroundColor: 'rgb(106, 25, 181, 0.1)',// array should have same number of elements as number of dataset
         borderWidth: 1
       },
       {
        label: this.translate.instant('analytics-views.reaction'),
        data: this.dataReaction,
        borderColor: 'rgb(56, 128, 255)', // array should have same number of elements as number of dataset
        backgroundColor: 'rgb(56, 128, 255, 0.1)',// array should have same number of elements as number of dataset
        borderWidth: 1
      },
      {
        label: this.translate.instant('analytics-views.comment'),
        data: this.dataComment,
        borderColor: 'rgb(238, 241, 48)', // array should have same number of elements as number of dataset
        backgroundColor: 'rgb(238, 241, 48, 0.1)',// array should have same number of elements as number of dataset
        borderWidth: 1
      }
      ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }]
        }
      }
    });
}

changeDay(n){
  this.day = moment(this.day).add(n,'days');
  this.hourStart = moment(this.hourStart ).add(n,'day'); 
  this.hourEnd = moment(this.hourEnd).add(n,'day'); 
  this.generateDay()
}
  option:string='';
  postLines(){
    this.option = 'post'
  }


  months=[];
  month = moment()
  monthName;
  monthStart= moment() 
  monthEnd= moment() 
  labelMonths = [];
  generateMonth(){
    this.noData = false;
    this.months =[];
    this.labelMonths = [];
    this.monthName = this.translate.instant(`months.${this.month.month()}`)
      this.monthStart.set('date', 1);
      this.monthEnd.add(1-(+this.monthEnd.format('DD')),'day');
      this.monthEnd.add(this.monthEnd.daysInMonth(),'day');
      this.monthEnd.add(-1,'day');
      
          while (this.monthEnd.diff(this.monthStart, 'days') >= 0) {
            this.months.push({date:this.monthStart.format('YYYY-MM-DD'),post:0,chat:0,search:0,profile:0,reaction:0,comment:0})
            this.monthStart.add(1,'days')
           }
          
           this.monthStart = moment(this.monthStart ).add(-1,'month'); 

      this.allViews.forEach((visits) => {
        let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
        for(let key in this.months){
          if(this.months[key].date == date){this.noData = true}
        }
      });
          
      this.linesDataMonths()
  }

  linesDataMonths(){
    this.analyticsToShow='months'
    this.cd.detectChanges()
    this.dataPost = []
    this.dataChat = []
    this.dataSearch = []
    this.dataProfile = []
    this.dataReaction = []
    this.dataComment = []
    for(let key in this.months){
      this.dataPost.push(0)
      this.dataChat.push(0)
      this.dataSearch.push(0)
      this.dataProfile.push(0)
      this.dataReaction.push(0)
      this.dataComment.push(0)
    }
    for(let i=1; i <= this.months.length ; i++){
      this.labelMonths.push(i)
    }
    this.postViews.forEach((visits) => {
      let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
      for(let key in this.months){
        if(this.months[key].date == date){
          this.months[key].post += 1
          this.dataPost[key] += 1
        }
      }
    });
  this.chatViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
    for(let key in this.months){
      if(this.months[key].date == date){
        this.months[key].chat += 1
        this.dataChat[key] += 1
      }
    }  
  });

  this.searchViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
    for(let key in this.months){
      if(this.months[key].date == date){
        this.months[key].search += 1
        this.dataSearch[key] += 1
      }
    } 
  });

  this.profileViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
    for(let key in this.months){
      if(this.months[key].date == date){
        this.months[key].profile += 1
        this.dataProfile[key] += 1
      }
    }
  });

  this.reactionViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
    for(let key in this.months){
      if(this.months[key].date == date){
        this.months[key].reaction += 1
        this.dataReaction[key] += 1
      }
    }
  });

  this.commentViews.forEach((visits) => {
    let date = moment(new Date(visits.Date)).format('YYYY-MM-DD')
    for(let key in this.months){
      if(this.months[key].date == date){
        this.months[key].comment += 1
        this.dataComment[key] += 1
      }
    }
  });

 
  this.lines = new Chart("linesMonth", {
    type: 'line',
    data: {
      labels:  this.labelMonths,
      datasets: [
        {
        label: this.translate.instant('analytics-views.post'),
        data: this.dataPost,
        borderColor: 'rgb(56, 94, 129)',// array should have same number of elements as number of dataset
        backgroundColor: 'rgb(56, 94, 129, 0.1)', // array should have same number of elements as number of dataset
        borderWidth: 1
      },
        {
        label: this.translate.instant('analytics-views.chat'),
        data: this.dataChat,
        borderColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
        backgroundColor: 'rgb(38, 194,129, 0.1)',// array should have same number of elements as number of dataset
        borderWidth: 1
      },
       {
        label: this.translate.instant('analytics-views.search'),
        data: this.dataSearch,
        borderColor: 'rgb(241, 60, 60)', // array should have same number of elements as number of dataset
        backgroundColor: 'rgb(214, 60,60, 0.1)',// array should have same number of elements as number of dataset
        borderWidth: 1
      },
      {
       label: this.translate.instant('analytics-views.profile'),
       data:this.dataProfile,
       borderColor: 'rgb(106, 25, 181)', // array should have same number of elements as number of dataset
       backgroundColor: 'rgb(106, 25, 181, 0.1)',// array should have same number of elements as number of dataset
       borderWidth: 1
     },
     {
      label: this.translate.instant('analytics-views.reaction'),
      data: this.dataReaction,
      borderColor: 'rgb(56, 128, 255)', // array should have same number of elements as number of dataset
      backgroundColor: 'rgb(56, 128, 255, 0.1)',// array should have same number of elements as number of dataset
      borderWidth: 1
    },
    {
      label: this.translate.instant('analytics-views.comment'),
      data: this.dataComment,
      borderColor: 'rgb(238, 241, 48)', // array should have same number of elements as number of dataset
      backgroundColor: 'rgb(238, 241, 48, 0.1)',// array should have same number of elements as number of dataset
      borderWidth: 1
    }
    ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  });
  } 

  changeMonth(n){

    this.month = moment(this.month ).add(n,'month'); 
    this.monthStart = moment(this.monthStart ).add(n,'month'); 
    this.monthEnd = moment(this.monthEnd).add(n,'month');

    this.generateMonth()
  }

}
