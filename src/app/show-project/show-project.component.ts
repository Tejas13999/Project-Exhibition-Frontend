import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.css']
})
export class ShowProjectComponent implements OnInit {
  username;
  projectId;
  userId
  title;
  description;
  department;
  technology;
  date;
  link;
  softRequire: boolean;
  hardRequire: boolean;
  partners: boolean;
  language;
  hardwarekit;
  partner=[];

  comment = [];
  c_User = [];
  cdata;
  cdate = new Date();

  image = [];
  doc;
  docPresent:boolean=false;

  constructor(private router: Router, private http: HttpClient, private _userservice: UserServiceService) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/projects/' + this._userservice.userProjectId).subscribe(data => {
      console.log(data);
      this.http.get<any>('http://localhost:3000/users/' + data.User_Id).subscribe(data1 => {
        this.username=data1.User_Name;
      });
      this.projectId = data.Project_Id;
      this.userId = data.User_Id;
      this.title = data.Title;
      this.department = data.Department;
      this.description = data.Description;
      this.technology = data.Technology;
      this.date = data.Date;
      this.link = data.Link;
      this.language = data.Language;
      this.hardwarekit = data.Hardware_Kit;
      if (data.Software == 1) this.softRequire = true; else this.softRequire = false;
      if (data.Hardware == 1) this.hardRequire = true; else this.hardRequire = false;
      if (data.Documentation != null) this.docPresent = true; else this.docPresent = false;
      this.doc = btoa(
        data.Documentation.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      //console.log(this.doc)

      /*this.doc = btoa(
        String.fromCharCode.apply(null, new Uint8Array(data.Documentation.data))
      );
      console.log(this.doc)*/

      this.http.get<any>('http://localhost:3000/partners/' + data.Project_Id).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.partners=true;
        this.partner[i] = data[i].Name;
      }
    });
    });


    this.http.get<any>('http://localhost:3000/comments/' + this._userservice.userProjectId).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.comment[i] = data[i].Comment_Data;
        this.c_User[i] = data[i].User_Name;
      }
    });

    //  this.image="http://localhost:3000/images/1";



    this.http.get<any>('http://localhost:3000/images/project/' + this._userservice.userProjectId).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
      this.image[i] = btoa(
        data[i].Image_Data.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
    
      }
    });


    /*   const reader=new FileReader();
       reader.onload=()=>{
         this.image=reader.result as string;
         console.log(this.image)
       }   */





  }

  addComment() {
    // console.log("Project-Id:", pro_Id);
    console.log("User-Name:", this._userservice.logInUserName);
    this.cdata = (<HTMLInputElement>document.getElementById("userComment")).value;
    //this.cdata = comment;
    console.log("Entered comment:", this.cdata);
    if (this._userservice.logInUserId == null) {
      alert("You have to LogIn");
      this.router.navigateByUrl('profile');
    }
    else {
      if (this.cdata != '') {
        this.http.post<any>('http://localhost:3000/comments', { User_Name: this._userservice.logInUserName, Project_Id: this.projectId, Comment_Data: this.cdata, Comment_Date: this.cdate }).subscribe({
          next: data => {
            console.log(data);
            //   this.router.navigateByUrl('/showProject');
            //  this.router.navigate([self]);
            //this.router.navigated=false;
            //this.next(this.projectId);
            this.ngOnInit();
          }
        });
      }
      (<HTMLInputElement>document.getElementById("userComment")).value = null;
    }
  }

  chalbhai() {
    this.router.navigateByUrl('profile');
  }

}
