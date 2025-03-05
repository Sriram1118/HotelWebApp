import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsageStorageService } from '../../../auth/services/usage/usage-storage.service';
import { environement } from '../../../../environments/environment';

const BASIC_URL= environement.BACKEND_URL;

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
