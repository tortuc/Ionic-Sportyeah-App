import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ViewsProfileService } from '../../service/views-profile.service';
import { ToastController } from '@ionic/angular';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {

  constructor(
    public  userService       : UserService,
    private router            : Router,
    private viewsProfileService:ViewsProfileService,
    public toastController: ToastController,
    private translate:TranslateService,
  ) { 
    this.viewsProfileService.getProfileView(this.userService.User._id).subscribe((views:any)=>{
      this.views = views.visits.reverse()
      for(this.element of this.views){
        this.idUsers.push(this.element.user._id)
        this.visitas.push(this.element)
      }
      this.find_duplicate_in_array(this.idUsers)
this.filtro()

    })
  }
  filtro(){
    let visitas = []
    for(let elements of this.sortable){
      console.log(elements[1])
      visitas = this.visitas.filter((visita)=>{
        if(visita.user._id == elements[0]){
          visita.cantidad=elements[1]
        }
        return visita.user._id == elements[0]
      })
      this.vistasFor.push(visitas[0])
      console.log( this.vistasFor)
    }
    
  }
  element
  vistasFor = []
  visitas = []
  idUsers = []
  sortable = []
  totalViewsPost
  count
  postId
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

//Ordena de mayor a menor
for (var idPost in count) {
  this.sortable.push([idPost, count[idPost]]);
  this.totalViewsPost += count[idPost]
}
this.sortable.sort(function(b, a) {
  return a[1] - b[1];
});


console.log(this.sortable)
  this.count=count
  this.postId=result
  return result;
  
  }

  views:[];
  indexLast=5;
  ngOnInit() {this.presentToastWithOptions()}

  async logScrolling(ev){
    let el = await ev.target.getScrollElement()
     if((el.scrollHeight - el.scrollTop < el.clientHeight + 400)){
       this.indexLast += 5
     }
     
     
   }



   async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: this.translate.instant('analytics-views.information'),
      message:this.translate.instant('infoVisits'),
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




  goTo(r){
    this.router.navigate([r])
  }
}
