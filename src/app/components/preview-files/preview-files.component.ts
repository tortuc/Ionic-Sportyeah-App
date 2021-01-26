import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'preview-files',
  templateUrl: './preview-files.component.html',
  styleUrls: ['./preview-files.component.scss'],
})
export class PreviewFilesComponent implements OnInit {

  @Input() files: any[] = []
  @Output() deleted = new EventEmitter()
  constructor() { }

  ngOnInit() {}






  

  close(file){
    this.files = this.files.filter((obj)=>{
      if(obj.url != file.url){
        return obj 

      }
    })
    this.deleted.emit(this.files)
  }

}
