import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ImgVideoUpload } from 'src/app/service/reusable-img-video-logic.service';
import { UserService } from 'src/app/service/user.service';
import { take } from 'rxjs/operators';
import { LandingService } from 'src/app/service/landingService';
import { ChangeComponent } from '../change/change.component';
import { CreateProductComponent } from '../create-product/create-product.component';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  public idUser = this.route.snapshot.params.id;
  public creator: boolean = false;
  public colorNav: string = "white";
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public imgvideoupload: ImgVideoUpload,
    public landingService: LandingService,
    public ls: LandingService,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.landingService.getByUser(this.route.snapshot.params.id).pipe(take(1)).subscribe((resp:any)=>{
      if(this.userService.User)
        this.idUser === this.userService.User?.username ?
          this.creator = true : null;
      
      resp === null  ?  this.creator ? this.crearLanding() 
        : this.landingService.update(this.ls.defaultLanding) 
        : this.landingService.update(resp);
    });
  }

  crearLanding(){
    this.ls.ls.username = this.userService.User.username
    this.ls.ls.logo = this.userService.User.username
    this.landingService.create(this.landingService.ls)
      .pipe(take(1))
      .subscribe((r:any)=>this.ngOnInit());
  }

  seePreview(){
    this.creator = false
  }
  changeLogo(){
    this.imgvideoupload.takeOnlyPhoto();
    this.imgvideoupload.content.pipe(take(1)).subscribe((img:string)=>{
      this.landingService.ls.logo = img;
      this.ls.edit(this.ls.ls);
    });
  }

  async changeText(name: string, index:number = null, property:string = null){
    console.log("LO Que llega a change TExt", name, index, property);
    this.landingService.editing = name;
    if( index!== null && property !== null ){ 
      this.ls.productArray.index = index;
      this.ls.productArray.property = property;
    }
    const modal = await this.modalController.create({
      component: ChangeComponent,
      cssClass:'modalText'
    });
    await modal.present();
  }

  async createProduct(){
    const modal = await this.modalController.create({
      component: CreateProductComponent
    });
    await modal.present();
  }

  changeStatus(){
    const landing = Object.assign({},this.ls.ls);
    landing.active = !landing.active;
    this.ls.edit(landing)
  }

  setLocal(){
    localStorage.setItem("landing",'false');
    this.router.navigate(['../../user/'+this.idUser]);
  }

  ionViewDidLeave(){
    this.ls.ls = this.ls.defaultLanding
  }
}
