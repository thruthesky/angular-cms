import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';



import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { FirebaseBackendModule } from './../firebase-backend/firebase-backend.module';

import { BootstrapModule } from './provider/bootstrap/bootstrap-module';


import { AppComponent } from './app.component';
import { HomePage } from './page/home/home';
import { LoginPage } from './page/login/login';
import { RegisterPage } from './page/register/register';


import { ForumPageModule } from './page/forum/forum-page-module';


import { AlertModal } from './modal/alert/alert';



const appRoutes: Routes = [
  { path: '', component: HomePage },
  { path: 'register', component: RegisterPage },
  { path: 'login', component: LoginPage }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    LoginPage,
    RegisterPage,
    AlertModal
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot( appRoutes ),
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FirebaseBackendModule,
    BootstrapModule,
    ForumPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
