import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { UsageStorageService } from '../../services/usage/usage-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private message: NzMessageService,
              private router: Router
  ){}

  ngOnInit(){
    this.loginForm=this.fb.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,Validators.required]
    })
  }

  submitForm(){
    this.authService.login(this.loginForm.value).subscribe(res =>{
      console.log(res);
      if(res.userId!=null){
        const user = {
          id: res.userId,
          role: res.userRole
        }
        UsageStorageService.saveUser(user);
        UsageStorageService.saveToken(res.jwt);

        if(UsageStorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('/admin/dashboard');
        }else if(UsageStorageService.isCustomerLoggenIn()){
          this.router.navigateByUrl('/customer/rooms');
        }
      }
    },error=>{
      this.message
      .error(
        `Bad Credentials`,
        {nzDuration:5000}
      )
    })

  }



}
