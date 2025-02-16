import { Component } from '@angular/core';
import { UsageStorageService } from './auth/services/usage/usage-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hotelWebApp';

  isCustomerLoggenIn:boolean = UsageStorageService.isCustomerLoggenIn();
  isAdminLoggenIn:boolean = UsageStorageService.isAdminLoggedIn();

  constructor(private router: Router){}

  ngOnInit(){
    this.router.events.subscribe(event => {
      if(event.constructor.name == "NavigationEnd" ){
        this.isCustomerLoggenIn = UsageStorageService.isCustomerLoggenIn();
        this.isAdminLoggenIn = UsageStorageService.isAdminLoggedIn();
      }
    })
  }

  logout(){
    UsageStorageService.signOut();
    this.router.navigateByUrl("/");
  }


}
