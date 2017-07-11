import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';



import { RouterModule, Routes } from '@angular/router';


import { environment } from '../environments/environment';

import { FirebaseBackendModule } from './../firebase-backend/firebase-backend.module';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { BootstrapModule } from '../providers/bootstrap/bootstrap-module';

// global custom error handler. need help here.
import { CustomErrorHandler } from './app.error-handler';


import { PageScroll } from './../providers/page-scroll';



import { AppComponent } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';


import { ForumPageModule } from '../pages/forum/forum-page.module';


import { AlertModal } from '../modals/alert/alert';
import { AppService } from '../providers/app.service';
import { LibraryService } from './../providers/library';


import * as firebase from 'firebase';

firebase.initializeApp( environment.firebase );


const appRoutes: Routes = [
  { path: 'register', component: RegisterPage },
  { path: 'profile', component: ProfilePage },
  { path: 'login', component: LoginPage },
  { path: '', component: HomePage, pathMatch: 'full' },
  { path: '**', component: HomePage }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    RegisterPage,
    LoginPage,
    ProfilePage,
    AlertModal
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot( appRoutes ),
    HttpModule,
    FirebaseBackendModule,
    NgbModule.forRoot(),
    BootstrapModule,
    ForumPageModule
  ],
  providers: [
    AppService,
    LibraryService,
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    PageScroll
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
