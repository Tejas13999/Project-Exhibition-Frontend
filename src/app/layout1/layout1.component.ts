import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.css']
})
export class Layout1Component implements OnInit {

  User_Id;
  User_Name;
  image;
  Bio;
  Describe;
  Twitter_Link; tlink:boolean=false;
  Facebook_Link;  flink:boolean=false;
  Instagram_Link; ilink:boolean=false;
  Linkedin_Link;  llink:boolean=false;
  Github_Link;  glink:boolean=false;
  Skill = [];
  Skill_Detail = [];
  Edu_Year = [];
  Edu_Inst = [];
  Edu_Deg = [];
  Edu_Marks = [];
  Exp_Year = [];
  Exp_Comp = [];
  Exp_Post = [];
  Exp_Detail = [];
  Hobby = [];
  Email_Id;
  Project_Detail = [];
  Project_Id = [];
  Project_Title = [];
  index;

  constructor(private router: Router, private http: HttpClient, private _userservice: UserServiceService) { }

  ngOnInit(): void {

    this.http.get<any>('http://localhost:3000/portfolios/' + this._userservice.searchQueryPortfolioId).subscribe({
      next: data => {
        console.log(data);
        this.User_Id=data.User_Id;
        this.Bio = data.Bio;
        this.Describe = data.Describe_User;
        if(data.Twitter_Link!=null){this.Twitter_Link = data.Twitter_Link;this.tlink=true;}
        if(data.Facebook_Link!=null){this.Facebook_Link = data.Facebook_Link;this.flink=true;}
        if(data.Instagram_Link!=null){this.Instagram_Link = data.Instagram_Link;this.ilink=true;}
        if(data.Linkedin_Link!=null){this.Linkedin_Link = data.Linkedin_Link;this.llink=true;}
        if(data.Github_Link!=null){this.Github_Link = data.Github_Link;this.glink=true;}

        let i = 0;
        if (data.Skill1 != null) { this.Skill[i] = data.Skill1; this.Skill_Detail[i] = data.Skill1_Detail; }
        if (data.Skill2 != null) { i++; this.Skill[i] = data.Skill2; this.Skill_Detail[i] = data.Skill2_Detail; }
        if (data.Skill3 != null) { i++; this.Skill[i] = data.Skill3; this.Skill_Detail[i] = data.Skill3_Detail; }
        if (data.Skill4 != null) { i++; this.Skill[i] = data.Skill4; this.Skill_Detail[i] = data.Skill4_Detail; }
        if (data.Skill5 != null) { i++; this.Skill[i] = data.Skill5; this.Skill_Detail[i] = data.Skill5_Detail; }

        i = 0;
        if (data.Edu1_Year != null) { this.Edu_Year[i] = data.Edu1_Year; this.Edu_Inst[i] = data.Edu1_Inst; this.Edu_Deg[i] = data.Edu1_Deg; this.Edu_Marks[i] = data.Edu1_Marks }
        if (data.Edu2_Year != null) { i++; this.Edu_Year[i] = data.Edu2_Year; this.Edu_Inst[i] = data.Edu2_Inst; this.Edu_Deg[i] = data.Edu2_Deg; this.Edu_Marks[i] = data.Edu2_Marks }
        if (data.Edu3_Year != null) { i++; this.Edu_Year[i] = data.Edu3_Year; this.Edu_Inst[i] = data.Edu3_Inst; this.Edu_Deg[i] = data.Edu3_Deg; this.Edu_Marks[i] = data.Edu3_Marks }
        if (data.Edu4_Year != null) { i++; this.Edu_Year[i] = data.Edu4_Year; this.Edu_Inst[i] = data.Edu4_Inst; this.Edu_Deg[i] = data.Edu4_Deg; this.Edu_Marks[i] = data.Edu4_Marks }

        i = 0;
        if (data.Exp1_Year != null) { this.Exp_Year[i] = data.Exp1_Year; this.Exp_Comp[i] = data.Exp1_Comp; this.Exp_Post[i] = data.Exp1_Post; this.Exp_Detail[i] = data.Exp1_Detail; }
        if (data.Exp2_Year != null) { i++; this.Exp_Year[i] = data.Exp2_Year; this.Exp_Comp[i] = data.Exp2_Comp; this.Exp_Post[i] = data.Exp2_Post; this.Exp_Detail[i] = data.Exp2_Detail; }
        if (data.Exp3_Year != null) { i++; this.Exp_Year[i] = data.Exp3_Year; this.Exp_Comp[i] = data.Exp3_Comp; this.Exp_Post[i] = data.Exp3_Post; this.Exp_Detail[i] = data.Exp3_Detail; }
        if (data.Exp4_Year != null) { i++; this.Exp_Year[i] = data.Exp4_Year; this.Exp_Comp[i] = data.Exp4_Comp; this.Exp_Post[i] = data.Exp4_Post; this.Exp_Detail[i] = data.Exp4_Detail; }

        i = 0;
        if (data.Hobby1 != null) { this.Hobby[i] = data.Hobby1; }
        if (data.Hobby2 != null) { i++; this.Hobby[i] = data.Hobby2; }
        if (data.Hobby3 != null) { i++; this.Hobby[i] = data.Hobby3; }
        if (data.Hobby4 != null) { i++; this.Hobby[i] = data.Hobby4; }





        this.http.get<any>('http://localhost:3000/users/' + data.User_Id).subscribe({
      next: data => {
        this.User_Name = data.User_Name;
        this.Email_Id = data.Email_Id;
        this.image = btoa(
          data.Profile_Pic.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      },

      error: error => { }
    });

    this.http.get<any>('http://localhost:3000/projects/user/' + data.User_Id).subscribe(data => {
      if (data.length > 0) {
        console.log(data);
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            this.Project_Id[i] = data[i].Project_Id;
            this.Project_Detail[i] = data[i].Description;
            this.Project_Title[i]=data[i].Title;
            this.index = i;
          }
        }
      }
    });
    this.http.get<any>('http://localhost:3000/partners/user/' + data.User_Id).subscribe(data => {
      if (data.length > 0) {
        console.log("index:", this.index);
        let i = this.index;
        console.log("i:", i);
        for (let j = 0; j < data.length; j++) {
          this.http.get<any>('http://localhost:3000/projects/' + data[j].Project_Id).subscribe(data2 => {
            console.log(data2);
            this.Project_Id[i] = data2.Project_Id;
            this.Project_Detail[i] = data2.Description;
            this.Project_Title[i]=data[i].Title;
          });
          i++;
        }
      }
    });

      },
      error: error => {
        console.log("Error:", error);
      }
    });

  }

  next(pro_Id) {
    console.log(pro_Id);
    this._userservice.userProjectId = pro_Id;
    this.router.navigateByUrl('/showProject');
  }
}


