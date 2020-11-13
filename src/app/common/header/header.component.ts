import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService} from '../../user-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,private _userservice:UserServiceService) { }

  ngOnInit(): void {
  }

  searchQuery(){
    if((<HTMLInputElement>document.getElementById("stech")).value!=''){this._userservice.searchQueryTech=(<HTMLInputElement>document.getElementById("stech")).value;console.log('stech not null')}
    if((<HTMLInputElement>document.getElementById("scategory")).value!=''){this._userservice.searchQueryCat=(<HTMLInputElement>document.getElementById("scategory")).value;console.log('scategory not null')}
    if((<HTMLInputElement>document.getElementById("sdept")).value!=''){this._userservice.searchQueryDept=(<HTMLInputElement>document.getElementById("sdept")).value;console.log('sdept not null')}
    if((<HTMLInputElement>document.getElementById("stitle")).value!=''){this._userservice.searchQueryTitle=(<HTMLInputElement>document.getElementById("stitle")).value;console.log('stitle not null')}
    if((<HTMLInputElement>document.getElementById("shkit")).value!=''){this._userservice.searchQueryHkit=(<HTMLInputElement>document.getElementById("shkit")).value;console.log('shkit not null')}
    if((<HTMLInputElement>document.getElementById("sdays")).value!=''){this._userservice.searchQueryDays=(<HTMLInputElement>document.getElementById("sdays")).value;console.log('sdays not null')}
    if((<HTMLInputElement>document.getElementById("ssearch")).value!=''){this._userservice.searchQuery=(<HTMLInputElement>document.getElementById("ssearch")).value;console.log('search not null')}
    if(this._userservice.searchQuery!='' || this._userservice.searchQueryTech!='' || this._userservice.searchQueryCat!='' || this._userservice.searchQueryDept!='' || this._userservice.searchQueryTitle!='' || this._userservice.searchQueryHkit!='' || this._userservice.searchQueryDays!=null){
    (<HTMLInputElement>document.getElementById("ssearch")).value=null;
    (<HTMLInputElement>document.getElementById("stech")).value=null;
    (<HTMLInputElement>document.getElementById("scategory")).value=null;
    (<HTMLInputElement>document.getElementById("sdept")).value=null;
    (<HTMLInputElement>document.getElementById("stitle")).value=null;
    (<HTMLInputElement>document.getElementById("shkit")).value=null;
    (<HTMLInputElement>document.getElementById("sdays")).value=null;
    this.router.navigateByUrl('/searchProject');
   }
  }

}
