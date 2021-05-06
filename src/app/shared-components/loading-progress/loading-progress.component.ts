import { Component, OnInit } from '@angular/core';
import { JdvimageService } from 'src/app/service/jdvimage.service';

@Component({
  selector: 'loading-progress',
  templateUrl: './loading-progress.component.html',
  styleUrls: ['./loading-progress.component.scss'],
})
export class LoadingProgressComponent implements OnInit {

  constructor(
    public fileService:JdvimageService
  ) { }

  ngOnInit() {}

}
