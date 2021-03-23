import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-shareds-post',
  templateUrl: './shareds-post.component.html',
  styleUrls: ['./shareds-post.component.scss'],
})
export class SharedsPostComponent implements OnInit {
  @Input() shareds:any[]
  @Input() sharedsNews:any[]
  constructor(
    private modalCtrl:ModalController,
    private router:Router
  ) { }

  ngOnInit() {

  }

  dismiss(){
    this.modalCtrl.dismiss({dismiss:true})
  }

  goToPost(id){
    console.log('presiono el de Shareds-post')
    this.router.navigate([`/post/${id}`])
    this.dismiss()
  }
  
}
