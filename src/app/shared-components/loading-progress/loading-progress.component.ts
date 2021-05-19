import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/service/files.service';

@Component({
  selector: 'loading-progress',
  templateUrl: './loading-progress.component.html',
  styleUrls: ['./loading-progress.component.scss'],
})
export class LoadingProgressComponent implements OnInit {

  constructor(
    public fileService:FilesService
  ) { }

  ngOnInit() {}

}
