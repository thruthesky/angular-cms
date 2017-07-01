import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';



import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { FirebaseBackendModule } from './../firebase-backend/firebase-backend.module';

import { BootstrapModule } from '../providers/bootstrap/bootstrap-module';

// global custom error handler. need help here.
import { CustomErrorHandler } from './app.error-handler';


import { AppComponent } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';


import { ForumPageModule } from '../pages/forum/forum-page.module';


import { AlertModal } from '../modals/alert/alert';
import { AppService } from '../providers/app.service';



const appRoutes: Routes = [
  { path: 'register', component: RegisterPage },
  { path: 'login', component: LoginPage },
  { path: '', component: HomePage, pathMatch: 'full' },
  { path: '**', component: HomePage }
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
  providers: [
    AppService,
    { provide: ErrorHandler, useClass: CustomErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
