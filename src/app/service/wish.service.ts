import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { environment } from 'src/environments/environment';
import { getToken } from '../helpers/token';

@Injectable({
  providedIn: 'root'
})
export class WishService {

constructor(
  private http:HttpClient
) { 
}

public list = null

  async getList(id){
  return await new Promise((resolve,reject)=>{
    if(this.list == null){
      this.http.get(
        `${environment.URL_API}/wish/list/${id}`,
        {
          headers: new HttpHeaders({"access-token":getToken()})
        }
      )
      .toPromise()
      .then((list:any)=>{
     
        
        this.list = list._id
        resolve(this.list)
      })
      .catch((err)=>{
        reject(null)
      })
    }else{
      resolve(this.list)
    }
   
  })
 
}

  async getListUser(id){
  return await new Promise((resolve,reject)=>{
      this.http.get(
        `${environment.URL_API}/wish/list/${id}`,
        {
          headers: new HttpHeaders({"access-token":getToken()})
        }
      )
      .toPromise()
      .then((list:any)=>{
        resolve(list._id)
      })
      .catch((err)=>{
        reject(null)
      })
   
   
  })
}

create(wish){
  return this.http.post(
    `${environment.URL_API}/wish/create`,
    wish,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )
}

getWishesByList(list){
  return this.http.get(
    `${environment.URL_API}/wish/bylist/${list}`,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )

}


changePrivacity(id){
  return this.http.put(
    `${environment.URL_API}/wish/privacity/${id}`,
    null,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )

}

doneUndone(id){
  return this.http.put(
    `${environment.URL_API}/wish/doneundone/${id}`,
    null,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )

}

delete(id){
  return this.http.delete(
    `${environment.URL_API}/wish/delete/${id}`,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )
}

edit(id,body){
  return this.http.put(
    `${environment.URL_API}/wish/edit/${id}`,
    body,
    {
      headers: new HttpHeaders({"access-token":getToken()})
    }
  )
}


pageInfo(url){
  return this.http.post(`${environment.URL_API}/wish/page`,{url})
}

}
