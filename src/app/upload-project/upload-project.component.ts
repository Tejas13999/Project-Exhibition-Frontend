import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-upload-project',
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.css']
})
export class UploadProjectComponent implements OnInit {
  //projectId:number;
  title: string;
  department;
  technology;
  description;
  link;
  partner;
  spartner = '';
  today = new Date();
  secondpartner: boolean = false;
  softRequire: boolean = false;
  hardRequire: boolean = false;
  software = 0;
  hardware = 0;
  language = '';
  hardwarekit = '';
  img;
  imgURL;
  partnereid;
  spartnereid;

  file = [];
  selectedFile = [];
  totalImages;

  doc: any = null;
  selectedDoc;

  constructor(private router: Router, private http: HttpClient, private _userservice: UserServiceService) { }

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

  /* fileChanged(event) { 
     if (event.target.files && event.target.files[0]) {
       var reader = new FileReader();
 
       reader.readAsDataURL(event.target.files[0]); // read file as data url
 
       reader.onload = (event) => { // called once readAsDataURL is completed
         this.base64Image = event.target.result;
         console.log("base64Image",this.base64Image);
       }
     } 
 }*/

  fileChanged(e) {
    console.log("Total Files:", e.target.files.length);
    this.totalImages = e.target.files.length;
    for (var i = 0; i < this.totalImages; i++) {
      this.file[i] = e.target.files[i];
      const formData = new FormData();
      this.selectedFile[i] = e.target.files[i];
      if (e.target.files[i].type == "image/png" || "image/jpeg") {
        console.log("PNG file");
        formData.append(this.file[i], this.file[i].name);
        console.log(formData);
      }
    }
  }

  docChanged(e) {
    this.doc = e.target.files[0];
    const formData = new FormData();
    this.selectedDoc = e.target.files[0];
    if (e.target.files[0].type == "application/pdf") {
      console.log("PDF file");
      formData.append(this.doc, this.doc.name);
      console.log(formData);
    }
  }

  uploadProject() {
    this.title = (<HTMLInputElement>document.getElementById("title")).value;
    console.log("Title:", this.title);
    this.department = (<HTMLInputElement>document.getElementById("department")).value;
    console.log("Depart:", this.department);
    this.technology = (<HTMLInputElement>document.getElementById("technology")).value;
    this.description = (<HTMLInputElement>document.getElementById("description")).value;
    this.link = (<HTMLInputElement>document.getElementById("link")).value;
    this.partner = (<HTMLInputElement>document.getElementById("partner")).value;
    this.partnereid = (<HTMLInputElement>document.getElementById("partnereid")).value;

    if (this.softRequire == true) this.language = (<HTMLInputElement>document.getElementById("language")).value;
    if (this.hardRequire == true) this.hardwarekit = (<HTMLInputElement>document.getElementById("hkit")).value;

    this.img = (<HTMLInputElement>document.getElementById("image")).value;
    console.log("Today's date is:", this.today);

    const uploaDocData = new FormData();
    uploaDocData.append('imageFile', this.selectedDoc);
    console.log("DOCcccccc", this.selectedDoc.name)


    this.http.post<any>('http://localhost:3000/projects', { User_Id: this._userservice.logInUserId, Title: this.title, Department: this.department, Technology: this.technology, Description: this.description, Link: this.link, Date: this.today, Software: this.software, Hardware: this.hardware, Language: this.language, Hardware_Kit: this.hardwarekit, Documentation: this.selectedDoc.name }).subscribe(
      data => {
        console.log(data);
        /*      this.projectId = data.id;
              console.log("ProjectId:",this.projectId);  */

        //     const uploadData= new FormData();
        //     uploadData.append('myFile',this.file,this.file.name);
        //     console.log(uploadData);

        if (this.partner != '' && this.partnereid != '') {
          this.http.get<any>('http://localhost:3000/users/name/' + this.partnereid).subscribe({
            next: data1 => {
              if (data1.length > 0) {
                this.http.post<any>('http://localhost:3000/partners', { Project_Id: data.id, Name: this.partner, User_Id: data1[0].User_Id }).subscribe(
                  data2 => {
                    console.log("Added Partner:", data2);
                    this.router.navigateByUrl('/profile');
                    // console.log(data);
                  });
              }
            },
            error: error => {
              this.http.post<any>('http://localhost:3000/partners', { Project_Id: data.id, Name: this.partner, User_Id: null }).subscribe(
                data1 => {
                  console.log("Added Partner:", data1);
                  this.router.navigateByUrl('/profile');
                  // console.log(data);
                });
            }
          }
          );
        }

        else if (this.partner != '' && this.partnereid == '') {
          this.http.post<any>('http://localhost:3000/partners', { Project_Id: data.id, Name: this.partner, User_Id: null }).subscribe(
            data1 => {
              console.log("Added Partner:", data1);
              this.router.navigateByUrl('/profile');
              // console.log(data);
            });
        }




        if (this.secondpartner == true) {
          console.log(this.secondpartner);
          console.log("HII Hello Dear ", (<HTMLInputElement>document.getElementById("spartner")).value);
          console.log("HII Hello Dear ", (<HTMLInputElement>document.getElementById("spartnereid")).value);
          this.spartner = (<HTMLInputElement>document.getElementById("secpartner")).value;
          this.spartnereid = (<HTMLInputElement>document.getElementById("spartnereid")).value;

          if (this.spartner != '' && this.spartnereid != '') {
            this.http.get<any>('http://localhost:3000/users/name/' + this.spartnereid).subscribe({
              next: data1 => {
                if (data1.length > 0) {
                  this.http.post<any>('http://localhost:3000/partners', { Project_Id: data.id, Name: this.spartner, User_Id: data1[0].User_Id }).subscribe(
                    data2 => {
                      console.log("Added Partner:", data2);
                      this.router.navigateByUrl('/profile');
                      // console.log(data);
                    });
                }
              },
              error: error => {
                this.http.post<any>('http://localhost:3000/partners', { Project_Id: data.id, Name: this.spartner, User_Id: null }).subscribe(
                  data1 => {
                    console.log("Added Partner:", data1);
                    this.router.navigateByUrl('/profile');
                    // console.log(data);
                  });
              }
            }
            );
          }

          else if (this.spartner != '' && this.spartnereid == '') {
            this.http.post<any>('http://localhost:3000/partners', { Project_Id: data.id, Name: this.spartner, User_Id: null }).subscribe(
              data1 => {
                console.log("Added Partner:", data1);
                this.router.navigateByUrl('/profile');
                // console.log(data);
              });
          }
        }
        for (var i = 0; i < this.totalImages; i++) {
          const uploadImageData = new FormData();
          uploadImageData.append('imageFile', this.selectedFile[i]);
          console.log("seleeeee", this.selectedFile[i].name)


          //  if (this.img != '') {

          this.http.post<any>('http://localhost:3000/images', { Project_Id: data.id, Image_Data: this.selectedFile[i].name }).subscribe(
            data => {
              console.log(data);

            });
        }
        //  }
      });


    this.router.navigateByUrl('/profile');
  }

  values() {
    this.title = (<HTMLInputElement>document.getElementById("title")).value;
    console.log("Title:", this.title);
    this.department = (<HTMLInputElement>document.getElementById("department")).value;
    console.log("Depart:", this.department);
    this.technology = (<HTMLInputElement>document.getElementById("technology")).value;
    console.log("Tech:", this.technology);
    this.description = (<HTMLInputElement>document.getElementById("description")).value;
    console.log("Desc:", this.description);
    this.link = (<HTMLInputElement>document.getElementById("link")).value;
    console.log("link:", this.link);
    this.partner = (<HTMLInputElement>document.getElementById("partner")).value;
    console.log("1p:", this.partner);
    this.partnereid = (<HTMLInputElement>document.getElementById("partnereid")).value;
    console.log("1pid:", this.partnereid);
    if (this.softRequire == true) { this.language = (<HTMLInputElement>document.getElementById("language")).value; console.log("Lang:", this.language); }
    if (this.hardRequire == true) { this.hardwarekit = (<HTMLInputElement>document.getElementById("hkit")).value; console.log("hkit:", this.hardwarekit); }

    if (this.secondpartner == true) {
      console.log(this.secondpartner);
      console.log("HII Hello Dear ", (<HTMLInputElement>document.getElementById("spartner")).value);
      console.log("HII Hello Dear ", (<HTMLInputElement>document.getElementById("spartnereid")).value);
    }
  }

}
