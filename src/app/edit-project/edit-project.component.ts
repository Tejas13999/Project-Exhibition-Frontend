import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  title;
  department;
  technology;
  description;
  link;
  today = new Date();
  software;
  hardware;
  language;
  hardwarekit;
  secondpartner: boolean = true;
  softRequire: boolean = true;
  hardRequire: boolean = true;
  partner;
  spartner = '';
  fpid;
  spid;
  partnereid;
  spartnereid;
  uid: number = null;
  uploader;
  d;


  constructor(private router: Router, private http: HttpClient, private _userservice: UserServiceService) {
    this.http.get<any>('http://localhost:3000/projects/' + this._userservice.userProjectId).subscribe(data => {
      console.log(data);
      this.uploader = data.User_Id;
      this.d = data.Date;
      (<HTMLInputElement>document.getElementById("title")).value = data.Title;
      (<HTMLInputElement>document.getElementById("department")).value = data.Department;
      (<HTMLInputElement>document.getElementById("technology")).value = data.Technology;
      (<HTMLInputElement>document.getElementById("description")).value = data.Description;
      (<HTMLInputElement>document.getElementById("link")).value = data.Link;
      this.software = data.Software;
      this.hardware = data.Hardware;
      if (this.software == 1) { this.softRequire = true; (<HTMLInputElement>document.getElementById("language")).value = data.Language; } else { this.softRequire = false; }
      if (this.hardware == 1) { this.hardRequire = true; (<HTMLInputElement>document.getElementById("hkit")).value = data.Hardware_Kit; } else { this.hardRequire = false; }

      (<HTMLInputElement>document.getElementById("software")).checked = this.software;
      (<HTMLInputElement>document.getElementById("hardware")).checked = this.hardware;

    });

    this.http.get<any>('http://localhost:3000/partners/' + this._userservice.userProjectId).subscribe(data => {
      console.log(data);
      if (data.length > 0) {
        (<HTMLInputElement>document.getElementById("partner")).value = data[0].Name;
        if (data[0].User_Id != null) {
          this.http.get<any>('http://localhost:3000/users/' + data[0].User_Id).subscribe(
            data => {
              (<HTMLInputElement>document.getElementById("partnereid")).value = data.Email_Id;
            }
          );
        }
        this.fpid = data[0].Partner_Id;

        if (data.length > 1) {
          // this.secondpartner=true;
          (<HTMLInputElement>document.getElementById("spartner")).value = data[1].Name;
          if (data[1].User_Id != null) {
            this.http.get<any>('http://localhost:3000/users/' + data[1].User_Id).subscribe(
              data => {
                (<HTMLInputElement>document.getElementById("spartnereid")).value = data.Email_Id;
              }
            );
          }
          this.spid = data[1].Partner_Id;
        }
        else {
          this.secondpartner = false;
        }
      }
      else {
        this.secondpartner = false;
      }
    });
  }

  ngOnInit(): void {
  }

  addSecondPartner() {
    this.secondpartner = true;
  }

  softwareRequire() {
    this.softRequire = (!this.softRequire);
    if (this.softRequire == true) this.software = 1;
    else this.software = 0;
  }

  hardwareRequire() {
    this.hardRequire = (!this.hardRequire);
    if (this.hardRequire == true) this.hardware = 1;
    else this.hardware = 0;
  }

  deleteProject() {
    var res = confirm("Do You Want To Delete This Project?????");
    if (res) {
      console.log("Confirmed")
      this.http.delete<any>('http://localhost:3000/images/' + this._userservice.userProjectId).subscribe({
        next: data => {
          console.log("Images Deleted:")
        },
        error: error => {
          console.log("Images Not Found:")
        }
      });
      
      this.http.delete<any>('http://localhost:3000/comments/' + this._userservice.userProjectId).subscribe({
        next: data => {
          console.log("Comments Deleted:")
        },
        error: error => {
          console.log("Comments Not Found:")
        }
      });
      this.http.delete<any>('http://localhost:3000/partners/' + this._userservice.userProjectId).subscribe({
        next: data => {
          console.log("Partners Deleted:")    
        },
        error: error => {
          console.log("Partners Not Found:")
        }
      });
      this.http.delete<any>('http://localhost:3000/projects/' + this._userservice.userProjectId).subscribe({
        next: data => {
          console.log("Project Deleted:")
        },
        error: error => {
          console.log("Error In Project Delete:")
        }
      });
      this.router.navigateByUrl('/profile');
    }
  }

  editProject() {
    this.title = (<HTMLInputElement>document.getElementById("title")).value;
    this.department = (<HTMLInputElement>document.getElementById("department")).value;
    this.technology = (<HTMLInputElement>document.getElementById("technology")).value;
    this.description = (<HTMLInputElement>document.getElementById("description")).value;
    this.link = (<HTMLInputElement>document.getElementById("link")).value;
    console.log("Today's date is:", this.today);
    this.partner = (<HTMLInputElement>document.getElementById("partner")).value;
    this.partnereid = (<HTMLInputElement>document.getElementById("partnereid")).value;
    if (this.secondpartner == true) {
      this.spartner = (<HTMLInputElement>document.getElementById("spartner")).value;
      this.spartnereid = (<HTMLInputElement>document.getElementById("spartnereid")).value;
      if (this.spid != null && this.spartner != '' && this.spartnereid != '') {
        this.http.get<any>('http://localhost:3000/users/name/' + this.spartnereid).subscribe({
          next: data => {
            if (data.length > 0) {
              console.log(data);
              this.http.put<any>('http://localhost:3000/partners/' + this.spid, { Project_Id: this._userservice.userProjectId, Name: this.spartner, User_Id: data[0].User_Id }).subscribe(
                data => {
                  console.log("Updated Partner:", data);
                  // this.router.navigateByUrl('/profile');
                  // console.log(data);
                });
            }
          },
          error: error => {
            this.http.put<any>('http://localhost:3000/partners/' + this.spid, { Project_Id: this._userservice.userProjectId, Name: this.spartner, User_Id: null }).subscribe(
              data => {
                console.log("Updated Partner:", data);
                // this.router.navigateByUrl('/profile');
                // console.log(data);
              });
          }
        }
        );
      }

      else if (this.spid != null && this.spartner != '' && this.spartnereid == '') {
        this.http.put<any>('http://localhost:3000/partners/' + this.spid, { Project_Id: this._userservice.userProjectId, Name: this.spartner, User_Id: null }).subscribe(
          data => {
            console.log("Updated Partner:", data);
            // this.router.navigateByUrl('/profile');
            // console.log(data);
          });
      }

      else if (this.spid != null && this.spartner == '') {
        this.http.delete<any>('http://localhost:3000/partners/' + this.spid).subscribe(
          data => {
            console.log("Deleted Partner:", data);
            this.router.navigateByUrl('/profile');
            // console.log(data);
          });
      }

      else if (this.spid == null && this.spartner != '' && this.spartnereid != '') {
        this.http.get<any>('http://localhost:3000/users/name/' + this.spartnereid).subscribe({
          next: data => {
            if (data.length > 0) {
              this.http.post<any>('http://localhost:3000/partners', { Project_Id: this._userservice.userProjectId, Name: this.spartner, User_Id: data[0].User_Id }).subscribe(
                data => {
                  console.log("Added Partner:", data);
                  this.router.navigateByUrl('/profile');
                  // console.log(data);
                });
            }
          },
          error: error => {
            this.http.post<any>('http://localhost:3000/partners', { Project_Id: this._userservice.userProjectId, Name: this.spartner, User_Id: null }).subscribe(
              data => {
                console.log("Added Partner:", data);
                this.router.navigateByUrl('/profile');
                // console.log(data);
              });
          }
        }
        );
      }

      else if (this.spid == null && this.spartner != '' && this.spartnereid == '') {
        this.http.post<any>('http://localhost:3000/partners', { Project_Id: this._userservice.userProjectId, Name: this.spartner, User_Id: null }).subscribe(
          data => {
            console.log("Added Partner:", data);
            this.router.navigateByUrl('/profile');
            // console.log(data);
          });
      }
    }

    if (this.software == 1) this.language = (<HTMLInputElement>document.getElementById("language")).value;
    if (this.hardware == 1) this.hardwarekit = (<HTMLInputElement>document.getElementById("hkit")).value;

    if (this.fpid != null && this.partner != '' && this.partnereid != '') {
      this.http.get<any>('http://localhost:3000/users/name/' + this.partnereid).subscribe({
        next: data => {
          if (data.length > 0) {
            console.log(data);
            this.http.put<any>('http://localhost:3000/partners/' + this.fpid, { Project_Id: this._userservice.userProjectId, Name: this.partner, User_Id: data[0].User_Id }).subscribe(
              data => {
                console.log("Updated Partner:", data);
                // this.router.navigateByUrl('/profile');
                // console.log(data);
              });
          }
        },
        error: error => {
          this.http.put<any>('http://localhost:3000/partners/' + this.fpid, { Project_Id: this._userservice.userProjectId, Name: this.partner, User_Id: null }).subscribe(
            data => {
              console.log("Updated Partner:", data);
              // this.router.navigateByUrl('/profile');
              // console.log(data);
            });
        }
      }
      );
    }

    else if (this.fpid != null && this.partner != '' && this.partnereid == '') {
      this.http.put<any>('http://localhost:3000/partners/' + this.fpid, { Project_Id: this._userservice.userProjectId, Name: this.partner, User_Id: null }).subscribe(
        data => {
          console.log("Updated Partner:", data);
          // this.router.navigateByUrl('/profile');
          // console.log(data);
        });
    }

    else if (this.fpid != null && this.partner == '') {
      this.http.delete<any>('http://localhost:3000/partners/' + this.fpid).subscribe(
        data => {
          console.log("Deleted Partner:", data);
          this.router.navigateByUrl('/profile');
          // console.log(data);
        });
    }

    else if (this.fpid == null && this.partner != '' && this.partnereid != '') {
      this.http.get<any>('http://localhost:3000/users/name/' + this.partnereid).subscribe({
        next: data => {
          if (data.length > 0) {
            this.http.post<any>('http://localhost:3000/partners', { Project_Id: this._userservice.userProjectId, Name: this.partner, User_Id: data[0].User_Id }).subscribe(
              data => {
                console.log("Added Partner:", data);
                this.router.navigateByUrl('/profile');
                // console.log(data);
              });
          }
        },
        error: error => {
          this.http.post<any>('http://localhost:3000/partners', { Project_Id: this._userservice.userProjectId, Name: this.partner, User_Id: null }).subscribe(
            data => {
              console.log("Added Partner:", data);
              this.router.navigateByUrl('/profile');
              // console.log(data);
            });
        }
      }
      );
    }

    else if (this.fpid == null && this.partner != '' && this.partnereid == '') {
      this.http.post<any>('http://localhost:3000/partners', { Project_Id: this._userservice.userProjectId, Name: this.partner, User_Id: null }).subscribe(
        data => {
          console.log("Added Partner:", data);
          this.router.navigateByUrl('/profile');
          // console.log(data);
        });
    }

    this.http.put<any>('http://localhost:3000/projects/' + this._userservice.userProjectId, { User_Id: this.uploader, Title: this.title, Department: this.department, Technology: this.technology, Description: this.description, Link: this.link, Software: this.software, Hardware: this.hardware, Language: this.language, Hardware_Kit: this.hardwarekit, Date: this.d }).subscribe(
      data => {
        this.router.navigateByUrl('/profile');
        console.log(data);
      });
  }

}
