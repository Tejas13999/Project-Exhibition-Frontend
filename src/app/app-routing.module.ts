import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { UploadProjectComponent } from './upload-project/upload-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ShowProjectComponent } from './show-project/show-project.component';
import { SearchProjectsComponent } from './search-projects/search-projects.component';
import { Layout1Component } from './layout1/layout1.component';
import { UploadPortfolioComponent } from './upload-portfolio/upload-portfolio.component';
import { EditPortfolioComponent } from './edit-portfolio/edit-portfolio.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"profile",component:ProfileComponent},
  {path:"about",component:AboutComponent},
  {path:"uploadProject",component:UploadProjectComponent},
  {path:"editProject",component:EditProjectComponent},
  {path:"showProject",component:ShowProjectComponent},
  {path:"searchProject",component:SearchProjectsComponent},
  {path:"layout1",component:Layout1Component},
  {path:"uploadPortfolio",component:UploadPortfolioComponent},
  {path:"editPortfolio",component:EditPortfolioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
