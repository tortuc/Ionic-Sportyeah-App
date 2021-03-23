import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from 'src/app/models/iPost';

@Component({
  selector: 'post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss'],
})
export class PostContentComponent implements OnInit {

  @Input() post:IPost
  constructor(
    private router:Router
  ) { }

  ngOnInit() {}


  goToPost(id){
    this.router.navigate([`/post/${id}`])
  }
  
  

}
