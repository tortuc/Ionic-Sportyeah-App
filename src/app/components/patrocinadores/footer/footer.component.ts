import { Component, OnInit, Input } from '@angular/core';
import { LandingService } from 'src/app/service/landingService';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  year: number = new Date ().getFullYear();
  @Input() changeText: (name:string) => void; 
  @Input() modalController: any; 
  @Input() creator: boolean; 
  constructor(
    public ls: LandingService,
    public landingService: LandingService,
    public uS : UserService
  ) { }

  ngOnInit() {}

}
