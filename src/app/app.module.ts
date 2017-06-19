import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePage } from './page/home/home';
import { LoginModal } from './modal/login/login';
import { RegisterPage } from './page/register/register';
import { AlertModal } from './modal/alert/alert';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    LoginModal,
    RegisterPage,
    AlertModal
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
