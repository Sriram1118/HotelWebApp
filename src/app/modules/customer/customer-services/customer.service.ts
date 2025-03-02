import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsageStorageService } from '../../../auth/services/usage/usage-storage.service';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

    createAuthorizationHeader(){
      let authHeaders:HttpHeaders = new HttpHeaders();
      return authHeaders.set(
        'Authorization',
        'Bearer ' + UsageStorageService.getToken()
      )
    }

    getRooms(pageNumber:number):Observable<any>{
      return this.http.get(BASIC_URL + `api/customer/rooms/${pageNumber}`,{
        headers:this.createAuthorizationHeader()
      })
    }

    bookRooms(bookingDto:any):Observable<any>{
      return this.http.post(BASIC_URL + `api/customer/book`,bookingDto,{
        headers:this.createAuthorizationHeader()
      })
    }
    
    getMyBooking(pageNumber:number):Observable<any>{
      const userId = UsageStorageService.getUserId();
      return this.http.get(BASIC_URL + `api/customer/bookings/${userId}/${pageNumber}`,{
        headers:this.createAuthorizationHeader()
      })
    }

}
