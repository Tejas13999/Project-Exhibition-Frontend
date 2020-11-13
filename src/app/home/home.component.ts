import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  projectId = [];
  userId = []
  title = [];
  description = [];
  department = [];
  technology = [];
  date = [];
  link = [];
  image = [];

  constructor(private router: Router, private http: HttpClient, private _userservice: UserServiceService) { }

  ngOnInit(): void {

    this.http.get<any>('http://localhost:3000/projects').subscribe(data => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.projectId[i] = data[i].Project_Id;
        this.userId[i] = data[i].User_Id;
        this.title[i] = data[i].Title;
        this.department[i] = data[i].Department;
        this.description[i] = data[i].Description;
        this.technology[i] = data[i].Technology;
        this.date[i] = data[i].Date;
        this.link[i] = data[i].Link;
        this.http.get<any>('http://localhost:3000/images/' + data[i].Project_Id).subscribe(data => {

          this.image[i] = btoa(
            data.Image_Data.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
          );


        });
      }
    });

  }

  next(pro_Id) {
    console.log(pro_Id);
    this._userservice.userProjectId = pro_Id;
    this.router.navigateByUrl('/showProject');
  }

}

