import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IWish } from '../../models/IWish';
import { UserService } from '../../service/user.service';
import { WishService } from '../../service/wish.service';

@Component({
  selector: 'app-view-wish',
  templateUrl: './view-wish.component.html',
  styleUrls: ['./view-wish.component.scss'],
})
export class ViewWishComponent implements OnInit {
/**
 * El deseo que viene desde el componentProps
 */
  @Input() wish:IWish

  constructor(
    private modalCtrl:ModalController,
    public userService:UserService,
    private wishService:WishService
  ) { }

  ngOnInit() {
 
    this.previewUrl()
    
  }

  /**
   * Cierra la ventana modal
   */

  close(){
    this.modalCtrl.dismiss()
  }

  /**
   * Marca el deseo como cumplido
   */
  done(){
    this.wishService.doneUndone(this.wish._id).toPromise()
      .then(()=>{
        this.modalCtrl.dismiss({
          action:'done'
        })
      })
      .catch((err)=>{
        // handle err
      })
  }

  preview = null
  previewUrl(){
    try {
      let string:string = this.wish.location
      let match = string.match(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/g)
      if(match){
        this.wishService.pageInfo(match[0])
          .toPromise()
          .then((info)=>{          
            this.preview = info
          })
          .catch((err)=>{
            this.preview = null
          })
      }else{
        this.preview = null
      }
    } catch (error) {
      // nothing to do
    }
   
  }

}
