import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  uname : string = '';
  ucontact : string = '';
  uemail : string = '';
  upassword : string = '';
  ucpassword : string = '';
  userid;
  err;
  file: any;
  selectedFile;
  

  constructor(private router: Router,private http:HttpClient) { 
  //  name : ['',Validators.required],
    eid : ['',Validators.required,Validators.email]
  }

  ngOnInit(): void {
  }

  fileChanged(e){
    this.file=e.target.files[0];
    const formData=new FormData();
    this.selectedFile=e.target.files[0];
    if(e.target.files[0].type=="image/png"||"image/jpeg"){
      console.log("PNG file");
      formData.append(this.file,this.file.name);
      console.log(formData);
    }
  }

  userSignUp(){
    this.uname=(<HTMLInputElement>document.getElementById("name")).value;
    this.ucontact=(<HTMLInputElement>document.getElementById("contact")).value;
    this.uemail=(<HTMLInputElement>document.getElementById("inputEmail")).value;
    this.upassword=(<HTMLInputElement>document.getElementById("inputPassword")).value;
    this.ucpassword=(<HTMLInputElement>document.getElementById("confirmPassword")).value;

    if(this.upassword==this.ucpassword){
      const uploadImageData=new FormData();
        uploadImageData.append('imageFile',this.selectedFile);
        console.log("seleeeee",this.selectedFile.name)
     this.http.post<any>('http://localhost:3000/users',{User_Name: this.uname, Email_Id: this.uemail, Password: this.upassword, Contact: this.ucontact, Profile_Pic: this.selectedFile.name}).subscribe({     
          next: data => { 
            alert("Your userId is: "+data.id);
            this.router.navigateByUrl('/');
          },
         error: error => this.err='This User Already Have An Account'
      })
    }
    else{
      this.err='Password not matches';
    }
  
  }

}
