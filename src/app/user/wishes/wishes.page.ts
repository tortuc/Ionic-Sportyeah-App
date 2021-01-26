import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ViewWishComponent } from 'src/app/components/view-wish/view-wish.component';
import { IWish } from 'src/app/models/IWish';
import { User, UserService } from 'src/app/service/user.service';
import { WishService } from 'src/app/service/wish.service';

@Component({
  selector: 'app-wishes',
  templateUrl: './wishes.page.html',
  styleUrls: ['./wishes.page.scss'],
})
export class WishesPage implements OnInit {
  user: any;
  wishes:IWish[] = []
  segment = 'pending'
  constructor(
    public userService:UserService,
    private route:ActivatedRoute,
    private wishService:WishService,
    private modalCtrl:ModalController
  ) { 
    userService.getUserByUsername(route.snapshot.paramMap.get('username')).toPromise()
    .then((resp:any)=>{
     this.user = resp.user
      this.getWish(resp.user._id)
      
    })
    .catch((err)=>{      
      this.user = 404
    })

  }

  async getWish(_id: string,event = null) {
    let list = await this.wishService.getListUser(_id)
    this.wishService.getWishesByList(list).toPromise()
      .then((wishes:IWish[])=>{
     
        
        this.wishes = wishes
        if(event){
          event.target.complete();

        }else{
          
          this.openWish()
        
        }
      })
      .catch((err)=>{
        // handle err
        
      })
  }


  openWish() {
      this.route.queryParams.subscribe(async (data)=>{
        if(data?.wish){
          let id = data.wish
          let wishFind = this.wishes.find((wish)=>{
            return wish._id == id
          })
          if(wishFind){
            
            
            let modal = await this.modalCtrl.create({
              component:ViewWishComponent,
              componentProps:{wish:wishFind}
            })
          
            modal.present()
          }
          

        }
      })
            
  }

  ngOnInit() {
  }




}
