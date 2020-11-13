import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-search-projects',
  templateUrl: './search-projects.component.html',
  styleUrls: ['./search-projects.component.css']
})
export class SearchProjectsComponent implements OnInit {
  projectId = [];
  userId = []
  title = [];
  description = [];
  department = [];
  technology = [];
  date = [];
  link = [];
  image = [];
  today = new Date();
  no = 'No';
  index = -1;

  constructor(private router: Router, private http: HttpClient, private _userservice: UserServiceService) { }

  ngOnInit(): void {
    let i: number;

    if (this._userservice.searchQuery != '') { i = 0; }
    else {
      //6
      if (this._userservice.searchQueryCat != '' && this._userservice.searchQueryDept != '' && this._userservice.searchQueryTitle != '' && this._userservice.searchQueryTech != '' && this._userservice.searchQueryHkit != '' && this._userservice.searchQueryDays != '') { i = 3; }
      //5
      else if (this._userservice.searchQueryCat != '' && this._userservice.searchQueryDept != '' && this._userservice.searchQueryTitle != '' && this._userservice.searchQueryTech != '' && this._userservice.searchQueryHkit == '' && this._userservice.searchQueryDays != '') { i = 2; }
      else if (this._userservice.searchQueryCat != '' && this._userservice.searchQueryDept != '' && this._userservice.searchQueryTitle != '' && this._userservice.searchQueryTech != '' && this._userservice.searchQueryHkit != '' && this._userservice.searchQueryDays == '') { i = 4; }
      else if (this._userservice.searchQueryCat != '' && this._userservice.searchQueryDept != '' && this._userservice.searchQueryTitle != '' && this._userservice.searchQueryTech == '' && this._userservice.searchQueryHkit != '' && this._userservice.searchQueryDays != '') { i = 5; }
      else if (this._userservice.searchQueryCat != '' && this._userservice.searchQueryDept != '' && this._userservice.searchQueryTitle == '' && this._userservice.searchQueryTech != '' && this._userservice.searchQueryHkit != '' && this._userservice.searchQueryDays != '') { i = 6; }
      else if (this._userservice.searchQueryCat != '' && this._userservice.searchQueryDept == '' && this._userservice.searchQueryTitle != '' && this._userservice.searchQueryTech != '' && this._userservice.searchQueryHkit != '' && this._userservice.searchQueryDays != '') { i = 7; }
      else if (this._userservice.searchQueryCat == '' && this._userservice.searchQueryDept != '' && this._userservice.searchQueryTitle != '' && this._userservice.searchQueryTech != '' && this._userservice.searchQueryHkit != '' && this._userservice.searchQueryDays != '') { i = 8; }
      //4
      else if (this._userservice.searchQueryCat != '' && this._userservice.searchQueryDept != '' && this._userservice.searchQueryTitle != '' && this._userservice.searchQueryTech != '' && this._userservice.searchQueryHkit == '' && this._userservice.searchQueryDays == '') { i = 9; }
      else if (this._userservice.searchQueryCat != '' && this._userservice.searchQueryDept != '' && this._userservice.searchQueryTitle != '' && this._userservice.searchQueryTech == '' && this._userservice.searchQueryHkit != '' && this._userservice.searchQueryDays == '') { i = 10; }
      else if (this._userservice.searchQueryCat != '' && this._userservice.searchQueryDept != '' && this._userservice.searchQueryTitle == '' && this._userservice.searchQueryTech != '' && this._userservice.searchQueryHkit != '' && this._userservice.searchQueryDays == '') { i = 11; }
      else if (this._userservice.searchQueryCat != '' && this._userservice.searchQueryDept == '' && this._userservice.searchQueryTitle != '' && this._userservice.searchQueryTech != '' && this._userservice.searchQueryHkit != '' && this._userservice.searchQueryDays == '') { i = 12; }
      else if (this._userservice.searchQueryCat == '' && this._userservice.searchQueryDept != '' && this._userservice.searchQueryTitle != '' && this._userservice.searchQueryTech != '' && this._userservice.searchQueryHkit != '' && this._userservice.searchQueryDays == '') { i = 13; }
      //3
      else if (this._userservice.searchQueryCat != '' && this._userservice.searchQueryDept != '' && this._userservice.searchQueryTitle != '' && this._userservice.searchQueryTech == '' && this._userservice.searchQueryHkit == '' && this._userservice.searchQueryDays == '') { i = 14; }
      else if (this._userservice.searchQueryCat != '' && this._userservice.searchQueryDept != '' && this._userservice.searchQueryTitle == '' && this._userservice.searchQueryTech != '' && this._userservice.searchQueryHkit == '' && this._userservice.searchQueryDays == '') { i = 15; }
      else if (this._userservice.searchQueryCat != '' && this._userservice.searchQueryDept != '' && this._userservice.searchQueryTitle == '' && this._userservice.searchQueryTech == '' && this._userservice.searchQueryHkit != '' && this._userservice.searchQueryDays == '') { i = 16; }
      //2
      else if (this._userservice.searchQueryCat != '' && this._userservice.searchQueryDept != '' && this._userservice.searchQueryTitle == '' && this._userservice.searchQueryTech == '' && this._userservice.searchQueryHkit == '' && this._userservice.searchQueryDays == '') { i = 17; }
      else if (this._userservice.searchQueryCat != '' && this._userservice.searchQueryDept == '' && this._userservice.searchQueryTitle == '' && this._userservice.searchQueryTech != '' && this._userservice.searchQueryHkit == '' && this._userservice.searchQueryDays == '') { i = 18; }
      else if (this._userservice.searchQueryCat != '' && this._userservice.searchQueryDept == '' && this._userservice.searchQueryTitle == '' && this._userservice.searchQueryTech == '' && this._userservice.searchQueryHkit != '' && this._userservice.searchQueryDays == '') { i = 19; }
      else if (this._userservice.searchQueryCat == '' && this._userservice.searchQueryDept != '' && this._userservice.searchQueryTitle == '' && this._userservice.searchQueryTech != '' && this._userservice.searchQueryHkit == '' && this._userservice.searchQueryDays == '') { i = 20; }
      else if (this._userservice.searchQueryCat == '' && this._userservice.searchQueryDept != '' && this._userservice.searchQueryTitle == '' && this._userservice.searchQueryTech == '' && this._userservice.searchQueryHkit != '' && this._userservice.searchQueryDays == '') { i = 21; }
      else if (this._userservice.searchQueryCat != '' && this._userservice.searchQueryDept == '' && this._userservice.searchQueryTitle == '' && this._userservice.searchQueryTech == '' && this._userservice.searchQueryHkit == '' && this._userservice.searchQueryDays != '') { i = 22; }
      else if (this._userservice.searchQueryCat == '' && this._userservice.searchQueryDept != '' && this._userservice.searchQueryTitle == '' && this._userservice.searchQueryTech == '' && this._userservice.searchQueryHkit == '' && this._userservice.searchQueryDays != '') { i = 23; }
      else if (this._userservice.searchQueryCat == '' && this._userservice.searchQueryDept == '' && this._userservice.searchQueryTitle == '' && this._userservice.searchQueryTech != '' && this._userservice.searchQueryHkit == '' && this._userservice.searchQueryDays != '') { i = 24; }
      else if (this._userservice.searchQueryCat == '' && this._userservice.searchQueryDept == '' && this._userservice.searchQueryTitle == '' && this._userservice.searchQueryTech == '' && this._userservice.searchQueryHkit != '' && this._userservice.searchQueryDays != '') { i = 25; }
      //1
      else if (this._userservice.searchQueryDays != '') { i = 1; }
      else if (this._userservice.searchQueryCat != '') { i = 0; this._userservice.searchQuery = this._userservice.searchQueryCat; }
      else if (this._userservice.searchQueryDept != '') { i = 0; this._userservice.searchQuery = this._userservice.searchQueryDept; }
      else if (this._userservice.searchQueryTitle != '') { i = 0; this._userservice.searchQuery = this._userservice.searchQueryTitle; }
      else if (this._userservice.searchQueryTech != '') { i = 0; this._userservice.searchQuery = this._userservice.searchQueryTech; }
      else if (this._userservice.searchQueryHkit != '') { i = 0; this._userservice.searchQuery = this._userservice.searchQueryHkit; }
    }


    switch (i) {

      case 0:
        console.log("case 0");

        this.http.get<any>('http://localhost:3000/projects/technology/' + this._userservice.searchQuery).subscribe(data => {
          console.log(data);
          if (data.length > 0) {
            this.found(data);
          }
          else {
            this.http.get<any>('http://localhost:3000/projects/department/' + this._userservice.searchQuery).subscribe(data => {
              console.log(data);
              if (data.length > 0) {
                this.found(data);
              }
              else {
                this.http.get<any>('http://localhost:3000/projects/title/' + this._userservice.searchQuery).subscribe(data => {
                  console.log(data);
                  if (data.length > 0) {
                    this.found(data);
                  }
                  else {
                    this.http.get<any>('http://localhost:3000/projects/language/' + this._userservice.searchQuery).subscribe(data => {
                      console.log(data);
                      if (data.length > 0) {
                        this.found(data);
                      }
                      else {
                        this.http.get<any>('http://localhost:3000/projects/hardwarekit/' + this._userservice.searchQuery).subscribe(data => {
                          console.log(data);
                          if (data.length > 0) {
                            this.found(data);
                          }
                          else {
                            this.http.get<any>('http://localhost:3000/users/username/' + this._userservice.searchQuery).subscribe(data => {
                              console.log(data);
                              if (data.length > 0) {
                                this.http.get<any>('http://localhost:3000/portfolios/user/' + data[0].User_Id).subscribe(data1 => {
                                  console.log(data1);                                  
                                  if (data1) {
                                    this._userservice.searchQueryPortfolioId = data1.Portfolio_Id;
                                    this.router.navigateByUrl('/layout1');
                                  }
                                  else {
                                    this.http.get<any>('http://localhost:3000/projects/user/' + data[0].User_Id).subscribe(data1 => {
                                      if (data1.length > 0) {
                                        this.found(data1);
                                      }
                                    });
                                    this.http.get<any>('http://localhost:3000/partners/user/' + data[0].User_Id).subscribe(data1 => {
                                      if (data1.length > 0) {
                                        console.log("index:", this.index);
                                        let i = this.index;
                                        console.log("i:", i);
                                        for (let j = 0; j < data1.length; j++) {
                                          this.http.get<any>('http://localhost:3000/projects/' + data1[j].Project_Id).subscribe(data2 => {
                                            console.log(data2);
                                            this.projectId[i] = data2.Project_Id;
                                            this.userId[i] = data2.User_Id;
                                            this.title[i] = data2.Title;
                                            this.department[i] = data2.Department;
                                            this.description[i] = data2.Description;
                                            this.technology[i] = data2.Technology;
                                            this.date[i] = data2.Date;
                                            this.link[i] = data2.Link;
                                            this.http.get<any>('http://localhost:3000/images/' + data2.Project_Id).subscribe({
                                              next: data => {

                                                this.image[i] = btoa(
                                                  data.Image_Data.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
                                                );
                                              },
                                              error: error => {
                                                console.log("No entry of image for this project");
                                              }
                                            });
                                          });
                                          i++;
                                        }
                                      }
                                      else {
                                        alert('Not Found!!');
                                        this.router.navigateByUrl('/');
                                      }
                                    });
                                  }
                                });
                              }
                              else {
                                alert('Not Found!!');
                                this.router.navigateByUrl('/');
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
        break;

      case 1:
        console.log("case 1");

        this.http.get<any>('http://localhost:3000/projects/date/' + this.convert()).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 2:
        console.log("case 2");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this._userservice.searchQueryCat + '/' + this._userservice.searchQueryDept + '/' + this._userservice.searchQueryTitle + '/' + this._userservice.searchQueryTech + '/' + this.no + '/' + this.convert()).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 3:
        console.log("case 3");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this._userservice.searchQueryCat + '/' + this._userservice.searchQueryDept + '/' + this._userservice.searchQueryTitle + '/' + this._userservice.searchQueryTech + '/' + this._userservice.searchQueryHkit + '/' + this.convert()).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 4:
        console.log("case 4");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this._userservice.searchQueryCat + '/' + this._userservice.searchQueryDept + '/' + this._userservice.searchQueryTitle + '/' + this._userservice.searchQueryTech + '/' + this._userservice.searchQueryHkit + '/' + this.no).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 5:
        console.log("case 5");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this._userservice.searchQueryCat + '/' + this._userservice.searchQueryDept + '/' + this._userservice.searchQueryTitle + '/' + this.no + '/' + this._userservice.searchQueryHkit + '/' + this.convert()).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 6:
        console.log("case 6");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this._userservice.searchQueryCat + '/' + this._userservice.searchQueryDept + '/' + this.no + '/' + this._userservice.searchQueryTech + '/' + this._userservice.searchQueryHkit + '/' + this.convert()).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 7:
        console.log("case 7");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this._userservice.searchQueryCat + '/' + this.no + '/' + this._userservice.searchQueryTitle + '/' + this._userservice.searchQueryTech + '/' + this._userservice.searchQueryHkit + '/' + this.convert()).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 8:
        console.log("case 8");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this.no + '/' + this._userservice.searchQueryDept + '/' + this._userservice.searchQueryTitle + '/' + this._userservice.searchQueryTech + '/' + this._userservice.searchQueryHkit + '/' + this.convert()).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 9:
        console.log("case 9");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this._userservice.searchQueryCat + '/' + this._userservice.searchQueryDept + '/' + this._userservice.searchQueryTitle + '/' + this._userservice.searchQueryTech + '/' + this.no + '/' + this.no).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 10:
        console.log("case 10");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this._userservice.searchQueryCat + '/' + this._userservice.searchQueryDept + '/' + this._userservice.searchQueryTitle + '/' + this.no + '/' + this._userservice.searchQueryHkit + '/' + this.no).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 11:
        console.log("case 11");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this._userservice.searchQueryCat + '/' + this._userservice.searchQueryDept + '/' + this.no + '/' + this._userservice.searchQueryTech + '/' + this._userservice.searchQueryHkit + '/' + this.no).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 12:
        console.log("case 12");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this._userservice.searchQueryCat + '/' + this.no + '/' + this._userservice.searchQueryTitle + '/' + this._userservice.searchQueryTech + '/' + this._userservice.searchQueryHkit + '/' + this.no).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 13:
        console.log("case 13");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this.no + '/' + this._userservice.searchQueryDept + '/' + this._userservice.searchQueryTitle + '/' + this._userservice.searchQueryTech + '/' + this._userservice.searchQueryHkit + '/' + this.no).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 14:
        console.log("case 14");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this._userservice.searchQueryCat + '/' + this._userservice.searchQueryDept + '/' + this._userservice.searchQueryTitle + '/' + this.no + '/' + this.no + '/' + this.no).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 15:
        console.log("case 15");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this._userservice.searchQueryCat + '/' + this._userservice.searchQueryDept + '/' + this.no + '/' + this._userservice.searchQueryTech + '/' + this.no + '/' + this.no).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 16:
        console.log("case 16");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this._userservice.searchQueryCat + '/' + this._userservice.searchQueryDept + '/' + this.no + '/' + this.no + '/' + this._userservice.searchQueryHkit + '/' + this.no).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/');; }
        });
        break;

      case 17:
        console.log("case 17");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this._userservice.searchQueryCat + '/' + this._userservice.searchQueryDept + '/' + this.no + '/' + this.no + '/' + this.no + '/' + this.no).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 18:
        console.log("case 18");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this._userservice.searchQueryCat + '/' + this.no + '/' + this.no + '/' + this._userservice.searchQueryTech + '/' + this.no + '/' + this.no).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 19:
        console.log("case 19");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this._userservice.searchQueryCat + '/' + this.no + '/' + this.no + '/' + this.no + '/' + this._userservice.searchQueryHkit + '/' + this.no).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 20:
        console.log("case 20");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this.no + '/' + this._userservice.searchQueryDept + '/' + this.no + '/' + this._userservice.searchQueryTech + '/' + this.no + '/' + this.no).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 21:
        console.log("case 21");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this.no + '/' + this._userservice.searchQueryDept + '/' + this.no + '/' + this.no + '/' + this._userservice.searchQueryHkit + '/' + this.no).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 22:
        console.log("case 22");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this._userservice.searchQueryCat + '/' + this.no + '/' + this.no + '/' + this.no + '/' + this.no + '/' + this.convert()).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 23:
        console.log("case 23");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this.no + '/' + this._userservice.searchQueryDept + '/' + this.no + '/' + this.no + '/' + this.no + '/' + this.convert()).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 24:
        console.log("case 24");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this.no + '/' + this.no + '/' + this.no + '/' + this._userservice.searchQueryTech + '/' + this.no + '/' + this.convert()).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      case 25:
        console.log("case 25");

        this.http.get<any>('http://localhost:3000/projects/multi/' + this.no + '/' + this.no + '/' + this.no + '/' + this.no + '/' + this._userservice.searchQueryHkit + '/' + this.convert()).subscribe(data => {
          if (data.length > 0) {
            this.found(data);
          }
          else { alert('Not found!!!'); this.router.navigateByUrl('/'); }
        });
        break;

      default:
        alert('Search Failure!!! Provide necessary Information');
        this.router.navigateByUrl('/');

    }
  }

  found(data) {
    console.log(data);
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        this.projectId[i] = data[i].Project_Id;
        this.userId[i] = data[i].User_Id;
        this.title[i] = data[i].Title;
        this.department[i] = data[i].Department;
        this.description[i] = data[i].Description;
        this.technology[i] = data[i].Technology;
        this.date[i] = data[i].Date;
        this.link[i] = data[i].Link;
        this.http.get<any>('http://localhost:3000/images/' + data[i].Project_Id).subscribe({
          next: data => {

            this.image[i] = btoa(
              data.Image_Data.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
          },
          error: error => {
            console.log("No entry of image for this project");
          }
        });
        this.index = i;
      }
    }
    //  this.makeNull();
  }

  partnerProjects(data) {
    let j = 0;
    console.log(data);
    if (data.length > 0) {

      for (let i = this.index + 1; j < data.length; i++, j++) {

      }
    }
    //  this.makeNull();
  }

  convert() {
    let y = this.today.getFullYear(); console.log("year:", y)
    let m = this.today.getMonth() + 1; console.log("Month:", m)
    let d = this.today.getDate(); console.log("days:", d)
    let t = Number(this._userservice.searchQueryDays);
    console.log("Temp:", t);
    while (t > 31) {
      if (m > 1) {
        m--;
        //console.log("While month:",m)
      }
      else {
        y--;
        m = 12;
      }
      t -= 30;
    }
    if (d > t) { d -= t; }
    else {
      if (m > 1) { m--; }
      else { y--; m = 12; }
      d = d + 30 - t;
    }
    console.log(y, "-", m, "-", d);
    return y + '-' + m + '-' + d;
  }

  next(pro_Id) {
    console.log(pro_Id);
    this._userservice.userProjectId = pro_Id;
    this.router.navigateByUrl('/showProject');
  }


  ngOnDestroy() {
    console.log("Destroy Called");
    this._userservice.searchQueryCat = '';
    this._userservice.searchQueryDept = '';
    this._userservice.searchQueryTitle = '';
    this._userservice.searchQueryTech = '';
    this._userservice.searchQueryHkit = '';
    this._userservice.searchQueryDays = '';
    this._userservice.searchQuery = '';
  }


}
