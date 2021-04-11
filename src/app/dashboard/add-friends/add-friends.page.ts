import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ChatService } from 'src/app/service/chat.service';
import { Followings, User, UserService } from 'src/app/service/user.service';
import { ViewsProfileService } from "src/app/service/views-profile.service";

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.page.html',
  styleUrls: ['./add-friends.page.scss'],
})
export class AddFriendsPage implements OnInit {
  users: User[];
  allUsers : User[]
  constructor(
    public userService:UserService,
    private modalController:ModalController,
    private router:Router,
    private translate:TranslateService,
    private socialSharing: SocialSharing,
    private chatService:ChatService,
    private viewsProfileService: ViewsProfileService
  ) { }

  getUsers(){
    this.userService.getUsers().toPromise()
      .then(async (users:User[])=>{
        this.users = users.filter((user)=>{
            return (user._id != this.userService.User._id)
        })
        this.allUsers = this.users
       
      })
      .catch((err)=>{
        // handle err
      })
  }

  ngOnInit() {
    this.getUsers()
    
  }

  goToProfile(id,username){
    
    if(id == this.userService.User._id){
      this.router.navigate(["/profile"])
    }else{
      this.userService.getUserByUsername(username)
      .subscribe(
        (resp:any)=>{
          this.viewsProfileService
          .createProfileView(
            { user:resp.user._id,
             visitor:this.userService.User._id,
             from:"search",
             link: null
           }
           )
            .subscribe((response) => {
              this.router.navigate([`/user/${username}`])
            });
        }
      )
      
  
    }
    this.modalController.dismiss()
  }

  
  query = ''

  filter(){
   let query = this.query
    this.users = this.allUsers.filter((user)=>{
      query = query.replace(' ','').toLowerCase()

      let find = user.name + user.last_name + user.username
      find = find.replace(' ','').toLowerCase()
      return find.includes(query)

    })
  }

  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss()
    .catch(()=>{
      this.router.navigate(['/dashboard'])

    })
    

  }

  whatsapp(){
    let user = this.userService.User

    this.socialSharing.shareViaWhatsApp(
      `${user.name} ${user.last_name} ${this.translate.instant('invite_whatsapp')}`,
      null,
      `https://app.sportyeah.com/#/signup?ref=${user.username}`
    ).then(()=>{
        // intent
    })
    .catch(()=>{
      window.open(`https://wa.me/?text=${user.name} ${user.last_name} ${this.translate.instant('invite_whatsapp')} https://app.sportyeah.com%2F%23%2Fsignup?ref=${user.username}`,"_blank")

    })
 
   
    
    
  }

  createChat(user){
    this.chatService.create(user._id).toPromise()
      .then((resp)=>{
        this.router.navigate(["/chat"],{state:{chat:resp}})
      
          this.modalController.dismiss()
            .catch((err)=>{
              // handle
            })
      })
      .catch((err)=>{
     
        
      })
  }

}
