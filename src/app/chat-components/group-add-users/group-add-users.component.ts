import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { IChat } from 'src/app/models/IChat';
import { Followings, User } from 'src/app/models/IUser';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-group-add-users',
  templateUrl: './group-add-users.component.html',
  styleUrls: ['./group-add-users.component.scss'],
})
export class GroupAddUsersComponent implements OnInit {
  @Input() usersIn: User[];
 @Input() id: string;

  constructor(
    public modalCtrl: ModalController,
    private platform: Platform,
    private translate: TranslateService,
    private chatService: ChatService,
    private loading: LoadingController,
    private userService:UserService
  ) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalCtrl.dismiss("close");
    });
  }

  users: Followings[];
  allUsers : Followings[]


  getUsers(){
  
    
    this.allUsers = this.userService.followings
    this.allUsers = this.allUsers.filter((user)=>{
      let inGroup = this.usersIn.find((userin)=>{
        return userin._id == user.user._id
      })
      
      return inGroup == undefined
    })
    this.filter()
  }

  ngOnInit() {
    
    this.getUsers()
  }



  filter(event =null){
    
    let query = event?.detail.value || ''
     this.users = this.allUsers.filter((user)=>{
       query = query.replace(' ','').toLowerCase()
 
       let find = user.user.name + user.user.last_name + user.user.username
       find = find.replace(' ','').toLowerCase()
       return find.includes(query)
 
     })
   }

   usersSelect = []

   pushUser(user){
     let exist = this.usersSelect.find((select)=>{
        return select._id == user._id
     })
     if(!exist){
      this.usersSelect.push(user)
     }else{
       this.usersSelect = this.usersSelect.filter((select)=>{
         return select._id != user._id
       })       
     }
     
   }


   dismiss(){
     this.modalCtrl.dismiss({
       action:'dismiss'
     })
   }
   isSelect(user){
    let selected = this.usersSelect.find((select)=>{
      return select._id == user._id
    })
    return (selected)?'selected':'';
   }

   add(){
     this.chatService.addusers(this.id,this.usersSelect).pipe((take(1)))
     .subscribe((chat:IChat)=>{
       
       this.chatService.editedChat(chat)
       this.modalCtrl.dismiss()
     })
   }

}
