import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { HomePage } from './page/home/home';
import { LoginModal } from './modal/login/login';
import { RegisterPage } from './page/register/register';
import { AlertModal } from './modal/alert/alert';



const appRoutes: Routes = [
  { path: '', component: HomePage },
  { path: 'register', component: RegisterPage }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    LoginModal,
    RegisterPage,
    AlertModal
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( appRoutes ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
