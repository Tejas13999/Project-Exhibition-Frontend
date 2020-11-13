import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  logInUserName : string = '';
  logInUserId : Int32Array = null;
  userProjectId : Int32Array = null;
  searchQuery : string = '';
  searchQueryCat : string = '';
  searchQueryTech : string = '';
  searchQueryDept : string = '';
  searchQueryTitle : string = '';
  searchQueryHkit : string = '';
  searchQueryDays : string = '';
  searchQueryPortfolioId : Int32Array = null;

  constructor() { }
}
