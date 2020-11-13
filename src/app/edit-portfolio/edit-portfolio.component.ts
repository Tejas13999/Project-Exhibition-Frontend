import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
  styleUrls: ['./edit-portfolio.component.css']
})
export class EditPortfolioComponent implements OnInit {
  User_Id = this._userservice.searchQueryPortfolioId;
  User_Name;
  image;
  Bio;
  Describe;
  Twitter_Link;
  Facebook_Link;
  Instagram_Link;
  Linkedin_Link;
  Github_Link;
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

  constructor(private router: Router, private http: HttpClient, private _userservice: UserServiceService) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/users/' + this.User_Id).subscribe({
      next: data => {
        this.User_Name = data.User_Name;
        (<HTMLInputElement>document.getElementById("username")).value = data.User_Name;
        this.Email_Id = data.Email_Id;
        this.image = btoa(
          data.Profile_Pic.data.reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      },

      error: error => { }
    });

    this.http.get<any>('http://localhost:3000/portfolios/' + this._userservice.searchQueryPortfolioId).subscribe({
      next: data => {
        console.log(data);
        (<HTMLInputElement>document.getElementById("bio")).value = data.Bio;
        (<HTMLInputElement>document.getElementById("describe")).value = data.Describe_User;
        (<HTMLInputElement>document.getElementById("twitterLink")).value = data.Twitter_Link;
        (<HTMLInputElement>document.getElementById("facebookLink")).value = data.Facebook_Link;
        (<HTMLInputElement>document.getElementById("instaLink")).value = data.Instagram_Link;
        (<HTMLInputElement>document.getElementById("linkedLink")).value = data.Linkedin_Link;
        (<HTMLInputElement>document.getElementById("githubLink")).value = data.Github_Link;

        let i = 0;
        if (data.Skill1 != null) { (<HTMLInputElement>document.getElementById("skill1")).value = data.Skill1; }
        if (data.Skill2 != null) { (<HTMLInputElement>document.getElementById("skill2")).value = data.Skill2; }
        if (data.Skill3 != null) { (<HTMLInputElement>document.getElementById("skill3")).value = data.Skill3; }
        if (data.Skill4 != null) { (<HTMLInputElement>document.getElementById("skill4")).value = data.Skill4; }
        if (data.Skill5 != null) { (<HTMLInputElement>document.getElementById("skill5")).value = data.Skill5; }

        i = 0;
        if (data.Edu1_Year != null) {
          (<HTMLInputElement>document.getElementById("edu1year")).value = data.Edu1_Year;
          (<HTMLInputElement>document.getElementById("edu1Inst")).value = data.Edu1_Inst;
          (<HTMLInputElement>document.getElementById("edu1Deg")).value = data.Edu1_Deg;
          (<HTMLInputElement>document.getElementById("edu1Marks")).value = data.Edu1_Marks;
        }
        if (data.Edu2_Year != null) {
          (<HTMLInputElement>document.getElementById("edu2year")).value = data.Edu2_Year;
          (<HTMLInputElement>document.getElementById("edu2Inst")).value = data.Edu2_Inst;
          (<HTMLInputElement>document.getElementById("edu2Deg")).value = data.Edu2_Deg;
          (<HTMLInputElement>document.getElementById("edu2Marks")).value = data.Edu2_Marks;
        }
        if (data.Edu3_Year != null) {
          (<HTMLInputElement>document.getElementById("edu3year")).value = data.Edu3_Year;
          (<HTMLInputElement>document.getElementById("edu3Inst")).value = data.Edu3_Inst;
          (<HTMLInputElement>document.getElementById("edu3Deg")).value = data.Edu3_Deg;
          (<HTMLInputElement>document.getElementById("edu3Marks")).value = data.Edu3_Marks;
        }
        if (data.Edu4_Year != null) {
          (<HTMLInputElement>document.getElementById("edu4year")).value = data.Edu4_Year;
          (<HTMLInputElement>document.getElementById("edu4Inst")).value = data.Edu4_Inst;
          (<HTMLInputElement>document.getElementById("edu4Deg")).value = data.Edu4_Deg;
          (<HTMLInputElement>document.getElementById("edu4Marks")).value = data.Edu4_Marks;
        }

        i = 0;
        if (data.Exp1_Year != null) {
          (<HTMLInputElement>document.getElementById("exp1year")).value = data.Exp1_Year;
          (<HTMLInputElement>document.getElementById("exp1Comp")).value = data.Exp1_Comp;
          (<HTMLInputElement>document.getElementById("exp1Post")).value = data.Exp1_Post;
          (<HTMLInputElement>document.getElementById("exp1Detail")).value = data.Exp1_Detail;
        }
        if (data.Exp2_Year != null) {
          (<HTMLInputElement>document.getElementById("exp2year")).value = data.Exp2_Year;
          (<HTMLInputElement>document.getElementById("exp2Comp")).value = data.Exp2_Comp;
          (<HTMLInputElement>document.getElementById("exp2Post")).value = data.Exp2_Post;
          (<HTMLInputElement>document.getElementById("exp2Detail")).value = data.Exp2_Detail;
        }
        if (data.Exp3_Year != null) {
          (<HTMLInputElement>document.getElementById("exp3year")).value = data.Exp3_Year;
          (<HTMLInputElement>document.getElementById("exp3Comp")).value = data.Exp3_Comp;
          (<HTMLInputElement>document.getElementById("exp3Post")).value = data.Exp3_Post;
          (<HTMLInputElement>document.getElementById("exp3Detail")).value = data.Exp3_Detail;
        }

        i = 0;
        if (data.Hobby1 != null) { (<HTMLInputElement>document.getElementById("hobby1")).value = data.Hobby1; }
        if (data.Hobby2 != null) { (<HTMLInputElement>document.getElementById("hobby2")).value = data.Hobby2; }
        if (data.Hobby3 != null) { (<HTMLInputElement>document.getElementById("hobby3")).value = data.Hobby3; }
        if (data.Hobby4 != null) { (<HTMLInputElement>document.getElementById("hobby4")).value = data.Hobby4; }

      },
      error: error => {
        console.log("Error:", error);
      }
    });
  }


  editPortfolio() {
    this.Bio = (<HTMLInputElement>document.getElementById("bio")).value;
    this.Describe = (<HTMLInputElement>document.getElementById("describe")).value;
    if ((<HTMLInputElement>document.getElementById("twitterLink")).value != '') { this.Twitter_Link = (<HTMLInputElement>document.getElementById("twitterLink")).value; } else { this.Twitter_Link = null; }
    if ((<HTMLInputElement>document.getElementById("facebookLink")).value != '') { this.Facebook_Link = (<HTMLInputElement>document.getElementById("facebookLink")).value; } else { this.Facebook_Link = null; }
    if ((<HTMLInputElement>document.getElementById("instaLink")).value != '') { this.Instagram_Link = (<HTMLInputElement>document.getElementById("instaLink")).value; } else { this.Instagram_Link = null; }
    if ((<HTMLInputElement>document.getElementById("linkedLink")).value != '') { this.Linkedin_Link = (<HTMLInputElement>document.getElementById("linkedLink")).value; } else { this.Linkedin_Link = null; }
    if ((<HTMLInputElement>document.getElementById("githubLink")).value != '') { this.Github_Link = (<HTMLInputElement>document.getElementById("githubLink")).value; } else { this.Github_Link = null; }

    this.Skill[0] = (<HTMLInputElement>document.getElementById("skill1")).value;
    if ((<HTMLInputElement>document.getElementById("skill2")).value != '') { this.Skill[1] = (<HTMLInputElement>document.getElementById("skill2")).value; } else { this.Skill[1] = null; }
    if ((<HTMLInputElement>document.getElementById("skill3")).value != '') { this.Skill[2] = (<HTMLInputElement>document.getElementById("skill3")).value; } else { this.Skill[2] = null; }
    if ((<HTMLInputElement>document.getElementById("skill4")).value != '') { this.Skill[3] = (<HTMLInputElement>document.getElementById("skill4")).value; } else { this.Skill[3] = null; }
    if ((<HTMLInputElement>document.getElementById("skill5")).value != '') { this.Skill[4] = (<HTMLInputElement>document.getElementById("skill5")).value; } else { this.Skill[4] = null; }

    this.Edu_Year[0] = (<HTMLInputElement>document.getElementById("edu1year")).value;
    this.Edu_Inst[0] = (<HTMLInputElement>document.getElementById("edu1Inst")).value;
    this.Edu_Deg[0] = (<HTMLInputElement>document.getElementById("edu1Deg")).value;
    this.Edu_Marks[0] = (<HTMLInputElement>document.getElementById("edu1Marks")).value;

    if ((<HTMLInputElement>document.getElementById("edu2year")).value != '') {
      this.Edu_Year[1] = (<HTMLInputElement>document.getElementById("edu2year")).value;
      this.Edu_Inst[1] = (<HTMLInputElement>document.getElementById("edu2Inst")).value;
      this.Edu_Deg[1] = (<HTMLInputElement>document.getElementById("edu2Deg")).value;
      this.Edu_Marks[1] = (<HTMLInputElement>document.getElementById("edu2Marks")).value;
    } else {
      this.Edu_Year[1] = null;
      this.Edu_Inst[1] = null;
      this.Edu_Deg[1] = null;
      this.Edu_Marks[1] = null;
    }

    if ((<HTMLInputElement>document.getElementById("edu3year")).value != '') {
      this.Edu_Year[2] = (<HTMLInputElement>document.getElementById("edu3year")).value;
      this.Edu_Inst[2] = (<HTMLInputElement>document.getElementById("edu3Inst")).value;
      this.Edu_Deg[2] = (<HTMLInputElement>document.getElementById("edu3Deg")).value;
      this.Edu_Marks[2] = (<HTMLInputElement>document.getElementById("edu3Marks")).value;
    } else {
      this.Edu_Year[2] = null;
      this.Edu_Inst[2] = null;
      this.Edu_Deg[2] = null;
      this.Edu_Marks[2] = null;
    }

    if ((<HTMLInputElement>document.getElementById("edu4year")).value != '') {
      this.Edu_Year[3] = (<HTMLInputElement>document.getElementById("edu4year")).value;
      this.Edu_Inst[3] = (<HTMLInputElement>document.getElementById("edu4Inst")).value;
      this.Edu_Deg[3] = (<HTMLInputElement>document.getElementById("edu4Deg")).value;
      this.Edu_Marks[3] = (<HTMLInputElement>document.getElementById("edu4Marks")).value;
    } else {
      this.Edu_Year[3] = null;
      this.Edu_Inst[3] = null;
      this.Edu_Deg[3] = null;
      this.Edu_Marks[3] = null;
    }

    this.Exp_Year[0] = (<HTMLInputElement>document.getElementById("exp1year")).value;
    this.Exp_Comp[0] = (<HTMLInputElement>document.getElementById("exp1Comp")).value;
    this.Exp_Post[0] = (<HTMLInputElement>document.getElementById("exp1Post")).value;
    this.Exp_Detail[0] = (<HTMLInputElement>document.getElementById("exp1Detail")).value;

    if ((<HTMLInputElement>document.getElementById("exp2year")).value != '') {
      this.Exp_Year[1] = (<HTMLInputElement>document.getElementById("exp2year")).value;
      this.Exp_Comp[1] = (<HTMLInputElement>document.getElementById("exp2Comp")).value;
      this.Exp_Post[1] = (<HTMLInputElement>document.getElementById("exp2Post")).value;
      this.Exp_Detail[1] = (<HTMLInputElement>document.getElementById("exp2Detail")).value;
    } else {
      this.Exp_Year[1] = null;
      this.Exp_Comp[1] = null;
      this.Exp_Post[1] = null;
      this.Exp_Detail[1] = null;
    }

    if ((<HTMLInputElement>document.getElementById("exp3year")).value != '') {
      this.Exp_Year[2] = (<HTMLInputElement>document.getElementById("exp3year")).value;
      this.Exp_Comp[2] = (<HTMLInputElement>document.getElementById("exp3Comp")).value;
      this.Exp_Post[2] = (<HTMLInputElement>document.getElementById("exp3Post")).value;
      this.Exp_Detail[2] = (<HTMLInputElement>document.getElementById("exp3Detail")).value;
    } else {
      this.Exp_Year[2] = null;
      this.Exp_Comp[2] = null;
      this.Exp_Post[2] = null;
      this.Exp_Detail[2] = null;
    }



    this.Hobby[0] = (<HTMLInputElement>document.getElementById("hobby1")).value;
    if ((<HTMLInputElement>document.getElementById("hobby2")).value != '') { this.Hobby[1] = (<HTMLInputElement>document.getElementById("hobby2")).value; } else { this.Hobby[1] = null; }
    if ((<HTMLInputElement>document.getElementById("hobby3")).value != '') { this.Hobby[2] = (<HTMLInputElement>document.getElementById("hobby3")).value; } else { this.Hobby[2] = null; }
    if ((<HTMLInputElement>document.getElementById("hobby4")).value != '') { this.Hobby[3] = (<HTMLInputElement>document.getElementById("hobby4")).value; } else { this.Hobby[3] = null; }

    this.http.put<any>('http://localhost:3000/portfolios/' + this._userservice.searchQueryPortfolioId, {
      User_Id: this._userservice.logInUserId,
      Bio: this.Bio,
      Describe_User: this.Describe,
      Twitter_Link: this.Twitter_Link,
      Facebook_Link: this.Facebook_Link,
      Instagram_Link: this.Instagram_Link,
      Linkedin_Link: this.Linkedin_Link,
      Github_Link: this.Github_Link,
      Skill1: this.Skill[0],
      Skill2: this.Skill[1],
      Skill3: this.Skill[2],
      Skill4: this.Skill[3],
      Skill5: this.Skill[4],
      Skill1_Detail: this.Skill_Detail[0],
      Skill2_Detail: this.Skill_Detail[1],
      Skill3_Detail: this.Skill_Detail[2],
      Skill4_Detail: this.Skill_Detail[3],
      Skill5_Detail: this.Skill_Detail[4],
      Edu1_Year: this.Edu_Year[0],
      Edu2_Year: this.Edu_Year[1],
      Edu3_Year: this.Edu_Year[2],
      Edu4_Year: this.Edu_Year[3],
      Edu1_Inst: this.Edu_Inst[0],
      Edu2_Inst: this.Edu_Inst[1],
      Edu3_Inst: this.Edu_Inst[2],
      Edu4_Inst: this.Edu_Inst[3],
      Edu1_Deg: this.Edu_Deg[0],
      Edu2_Deg: this.Edu_Deg[1],
      Edu3_Deg: this.Edu_Deg[2],
      Edu4_Deg: this.Edu_Deg[3],
      Edu1_Marks: this.Edu_Marks[0],
      Edu2_Marks: this.Edu_Marks[1],
      Edu3_Marks: this.Edu_Marks[2],
      Edu4_Marks: this.Edu_Marks[3],
      Exp1_Year: this.Exp_Year[0],
      Exp2_Year: this.Exp_Year[1],
      Exp3_Year: this.Exp_Year[2],
      Exp1_Comp: this.Exp_Comp[0],
      Exp2_Comp: this.Exp_Comp[1],
      Exp3_Comp: this.Exp_Comp[2],
      Exp1_Post: this.Exp_Post[0],
      Exp2_Post: this.Exp_Post[1],
      Exp3_Post: this.Exp_Post[2],
      Exp1_Detail: this.Exp_Detail[0],
      Exp2_Detail: this.Exp_Detail[1],
      Exp3_Detail: this.Exp_Detail[2],
      Hobby1: this.Hobby[0],
      Hobby2: this.Hobby[1],
      Hobby3: this.Hobby[2],
      Hobby4: this.Hobby[3]
    }
    ).subscribe(
      data => {
        this.router.navigateByUrl('/layout1');
      });
  }


}
