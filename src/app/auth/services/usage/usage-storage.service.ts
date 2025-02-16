import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root'
})
export class UsageStorageService {

  constructor() { }

  static saveToken(token:string):void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }

  static saveUser(user:any):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }

  static getToken():string{
    return localStorage.getItem(TOKEN);
  }

  static getUser():any{
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId():string{
    const user=this.getUser();
    if(user==null){
      return '';
    }else{
      return user.id;
    }
  }

  static getUserRole():string{
    const user=this.getUser();
    if(user==null){
      return '';
    }else{
      return user.role;
    }
  }

  static isAdminLoggedIn():boolean{
    if(this.getToken===null){
      return false;
    }
    const role=this.getUserRole();
    return role == 'ADMIN';
  }

  static isCustomerLoggenIn():boolean{
    if(this.getToken===null){
      return false;
    }
    const role = this.getUserRole();
    return role == 'CUSTOMER';
  }

  static signOut():void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

}