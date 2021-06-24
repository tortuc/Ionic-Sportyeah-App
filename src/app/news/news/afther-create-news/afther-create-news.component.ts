import { Component, OnInit, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AlertController, ModalController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: 'afther-create-news',
  templateUrl: './afther-create-news.component.html',
  styleUrls: ['./afther-create-news.component.scss'],
})
export class AftherCreateNewsComponent implements OnInit {

  @Input() news
  @Input() edit:boolean = false;

  constructor(
    public modalController: ModalController,
    private router: Router,

  ) { }

  ngOnInit() {}

  goToRead(){
    this.dismiss()
    this.router.navigate([`news/read/${this.news._id}`]);
  }
  goToYourNews(){
    this.dismiss()
    this.router.navigate([`news/profileNews`]);
  }
  goToNewsWall(){
    this.dismiss()
    this.router.navigate([`news`]);
  }
  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
