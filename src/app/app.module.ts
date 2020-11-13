import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {PdfViewerModule} from 'ng2-pdf-viewer'

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonComponent } from './common/common.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
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

@NgModule({
  declarations: [
    AppComponent,
    CommonComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    ProfileComponent,
    SignupComponent,
    UploadProjectComponent,
    EditProjectComponent,
    ShowProjectComponent,
    SearchProjectsComponent,
    Layout1Component,
    UploadPortfolioComponent,
    EditPortfolioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
