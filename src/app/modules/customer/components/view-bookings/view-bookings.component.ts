import { Component } from '@angular/core';
import { CustomerService } from '../../customer-services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrl: './view-bookings.component.scss'
})
export class ViewBookingsComponent {

  currentPage:number=1;
  bookings:any;
  total:any;

  constructor(private customerService:CustomerService,
              private message:NzMessageService
  ){
    this.getBookings();
  }

  getBookings(){
    this.customerService.getMyBooking(this.currentPage - 1).subscribe(res=>{
      console.log(res);

      this.bookings = res.reservationDtoList;
      this.total = res.totalPages * 5;
    },error=>{
      this.message.error(
        `${error.error}`,
        {nzDuration:5000}
      )
    })
  }

  pageIndexChange(value:any){
    this.currentPage = value;
    this.getBookings();
  }
}
