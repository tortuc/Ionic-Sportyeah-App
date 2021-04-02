import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class LandingGuard {

constructor(
  private UserService:UserService,
  private router:Router
) { }

  async canActivate(){
  return this.UserService.verifyToken().then((resp)=>{
    return true
  })
  .catch(()=>{
    return true
  })
}

}
