import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService} from '../user-service.service';
import { HttpClient, HttpClientJsonpModule} from '@angular/common/http';
import { Validators} from '@angular/forms';

/*const express = require('express');
const mysql = require('mysql');
const app = express();

app.listen('3000',()=>{
  console.log('Server Started on Port 3000');
});*/


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uname : string = null;
  uemail : string = '';
  upassword : string = '';
  error;

  constructor(private router: Router,private _userService:UserServiceService,private http:HttpClient) { 
 /*   name : ['',Validators.required],
    eid : ['',Validators.required,Validators.email],
    pss : ['',Validators.required]        */
  }

  ngOnInit(): void {
  }

  userLogIn(){
     this.uname=(<HTMLInputElement>document.getElementById("name")).value;
     this.uemail=(<HTMLInputElement>document.getElementById("eid")).value;
     this.upassword=(<HTMLInputElement>document.getElementById("pss")).value;


     

     console.log('Hii '+this.uname);
    
     this.http.get<any>('http://localhost:3000/users/'+this.uname).subscribe(data => {
     console.log(data);
      if((data.Email_Id)==(this.uemail)){
        
        if(data.Password==this.upassword){
          this._userService.logInUserId=data.User_Id;
          this._userService.logInUserName=data.User_Name;
          this.router.navigateByUrl('/profile');
        }
        else{
          this.error="User Id mismatch with password";
        }
      }
      else{
          this.error="User Id mismatch with Email";
      }
     });   
     

  }

}
