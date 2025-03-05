import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environement } from '../../../../environments/environment';

const BASIC_URL= environement.BACKEND_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  register(signupRequest:any):Observable<any>{
    return this.http.post(BASIC_URL + "api/auth/signup",signupRequest);
  } 

  login(loginRequest:any):Observable<any>{
    return this.http.post(BASIC_URL + "api/auth/login", loginRequest);
  }

}