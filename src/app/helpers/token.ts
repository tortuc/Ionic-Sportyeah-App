export function getToken():string{
    if(localStorage.getItem('token') != null){
        return localStorage.getItem('token')
      }else if(sessionStorage.getItem('token') != null){
        return sessionStorage.getItem('token')
      }else{
        return null
      }
}