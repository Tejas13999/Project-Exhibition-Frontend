import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName: string = null;
  // userId;
  // t;
  img; bytes; blob;
  projectId = [];
  profile_Pic;
  userId = [];
  title = [];
  description = [];
  department = [];
  technology = [];
  date = [];
  link = [];
  image = [];
  index = -1;
  j = 0;
  foundImage: boolean;
  file: any;
  selectedFile;

  constructor(private router: Router, private _userservice: UserServiceService, private http: HttpClient) { }

  ngOnInit(): void {
    if (this._userservice.logInUserName != '') {
      this.userName = this._userservice.logInUserName;
      // this.userId = this._userservice.logInUserId;

      this.http.get<any>('http://localhost:3000/users/' + this._userservice.logInUserId).subscribe({
        next: data => {
          if (data.Profile_Pic.data.length > 0) {
            this.profile_Pic = btoa(
              data.Profile_Pic.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            this.foundImage = true;
          }
          else {
            console.log("profile image not found");
            this.profile_Pic = '../../assets/profile-2398782_1280.png';
            this.foundImage = false;
          }
        },

        error: error => {
          console.log("profile image not found");
          this.profile_Pic = '../../assets/profile-2398782_1280.png';
        }
      });

      this.http.get<any>('http://localhost:3000/projects/user/' + this._userservice.logInUserId).subscribe(data => {
        console.log(data);
        //  this.t=data.Title;
        //   console.log(this.t);
        for (let i = 0; i < data.length; i++) {
          this.projectId[i] = data[i].Project_Id;
          this.userId[i] = data[i].User_Id;
          this.title[i] = data[i].Title;
          this.department[i] = data[i].Department;
          this.description[i] = data[i].Description;
          this.technology[i] = data[i].Technology;
          this.date[i] = data[i].Date;
          this.link[i] = data[i].Link;
          this.index = i;

          this.http.get<any>('http://localhost:3000/images/' + data[i].Project_Id).subscribe({
            next: data => {

              // this.image[i]=data.Image_Data.data;

              this.image[i] = btoa(
                data.Image_Data.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
              );
            },
            error: error => {
              console.log("No Image Found!!!");
              // this.image[i]='../../assets/profile-2398782_1280.png';
            }
          });
        }
        console.log(this.index);
      });
      this.http.get<any>('http://localhost:3000/partners/user/' + this._userservice.logInUserId).subscribe(data1 => {
        console.log("as a partner:projects: ", data1);
        for (let i = this.index + 1; this.j < data1.length; i++, this.j++) {
          this.http.get<any>('http://localhost:3000/projects/' + data1[this.j].Project_Id).subscribe(data => {
            console.log(data);

            this.projectId[i] = data.Project_Id;
            this.userId[i] = data.User_Id;
            this.title[i] = data.Title;
            this.department[i] = data.Department;
            this.description[i] = data.Description;
            this.technology[i] = data.Technology;
            this.date[i] = data.Date;
            this.link[i] = data.Link;
            this.http.get<any>('http://localhost:3000/images/' + data.Project_Id).subscribe({
              next: data => {
                this.image[i] = btoa(
                  data.Image_Data.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
              },
              error: error => {
                console.log("No Image Found!!!");
              }
            });
          });
        }
      });

    }
    else {
      this.router.navigateByUrl('/login');
      console.log("Not Logged In");
    }
  }

  fileChanged(e) {
    this.file = e.target.files[0];
    const formData = new FormData();
    this.selectedFile = e.target.files[0];
    if (e.target.files[0].type == "image/png" || "image/jpeg") {
      console.log("PNG file");
      formData.append(this.file, this.file.name);
      console.log(formData);
    }
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile);
    console.log("seleeeee", this.selectedFile.name)

    this.http.put<any>('http://localhost:3000/users/' + this._userservice.logInUserId, { Profile_Pic: this.selectedFile.name }).subscribe(
      data => {
        console.log(data);

      });
    this.router.navigateByUrl('/');

  }


  edit(pro_Id) {
    console.log(pro_Id);
    this._userservice.userProjectId = pro_Id;
    this.router.navigateByUrl('/editProject');
  }

  uploadProject() {
    this.router.navigateByUrl('/uploadProject');
  }

  uploadPortfolio() {

    this.http.get<any>('http://localhost:3000/portfolios/user/' + this._userservice.logInUserId).subscribe(data => {

      if (data) {
        this._userservice.searchQueryPortfolioId = data.Portfolio_Id;
        this.router.navigateByUrl('/editPortfolio');
      }
      else {
        this.router.navigateByUrl('/uploadPortfolio');
      }
    });
  }

  next(pro_Id) {
    console.log(pro_Id);
    this._userservice.userProjectId = pro_Id;
    this.router.navigateByUrl('/showProject');
  }

}
