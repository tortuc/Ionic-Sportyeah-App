import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { IWish } from 'src/app/models/IWish';
import { WishService } from 'src/app/service/wish.service';
import { EditWishComponent } from '../edit-wish/edit-wish.component';
import { OptionsWishComponent } from '../options-wish/options-wish.component';
import { ViewWishComponent } from '../view-wish/view-wish.component';
import { UserService } from '../../service/user.service'
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'wish-item',
  templateUrl: './wish-item.component.html',
  styleUrls: ['./wish-item.component.scss'],
})
export class WishItemComponent implements OnInit {

  /**
   * Variable de control para el deseo `wish` 
   */
  @Input() wish:IWish

  /**
   * Evento para cuando se elimina un deseo
   */
  @Output() deleted = new EventEmitter()

  constructor(
    private popover:PopoverController,
    private wishService:WishService,
    private alertCtrl:AlertController,
    private modalCtrl:ModalController,
    public userService:UserService,
    public translate:TranslateService
  ) { }

  ngOnInit() {}


  async options(ev){
    let popover = await this.popover.create({
      component:OptionsWishComponent,
      componentProps:{
        privacity:this.wish.privacity,
        done:this.wish.done
      },
      event:ev
    })

    popover.onDidDismiss().then((value)=>{
      this.handler(value.data)
    })
    return popover.present()
  }

  handler(data: any) {
    switch (data) {
      case 'edit':
        this.edit()
        break;
      case 'privacity':
          this.changePrivacity()
        break;
      case 'done':
          this.done()
        break;
      case 'delete':
        this.delete()
        break;
    
      default:
        break;
    }
  }

  async edit() {
   let modal = await this.modalCtrl.create({
     component:EditWishComponent,
     componentProps:{wish:this.wish}
   })
   modal.onDidDismiss().then((data)=>{
     if(data.data?.action == 'edit'){
       
      this.wish = data.data.wish
      this.wish.user = this.userService.User
     }
   })
   modal.present()
  }


  done() {
    this.wishService.doneUndone(this.wish._id).toPromise()
      .then(()=>{
        this.wish.done = !this.wish.done
        if(this.wish.done){
          this.userService.doneAudio()
        }
      })
      .catch((err)=>{
        // handle err
      })
  }


 

  async delete() {
    let alert = await this.alertCtrl.create({
      header  : this.translate.instant('delete_wish.header'),
      message : this.translate.instant('delete_wish.message'),
      buttons : [
        {
          text:this.translate.instant('cancel'),
          role:'cancel'
        },
        {
          text:this.translate.instant('agree'),
          handler: ()=>{
            this.wishService.delete(this.wish._id).toPromise()
              .then(()=>{
                this.deleted.emit(this.wish._id)
                // se marco como eliminada
              })
              .catch((err)=>{
                // handle err
              })
          }
        }
      ]
    })
    alert.present()
  }


  changePrivacity() {
    this.wishService.changePrivacity(this.wish._id).toPromise()
      .then((resp:any)=>{
        this.wish.privacity = resp.change
      })
      .catch((err)=>{
        // handle err
      })
  } 

  async all(){
    
    let modal = await this.modalCtrl.create({
      component:ViewWishComponent,
      componentProps:{wish:this.wish}
    })
    modal.onDidDismiss().then((data)=>{
      if(data.data?.action == 'done'){
        this.wish.done = !this.wish.done
      }
    })
    modal.present()
  }

}
