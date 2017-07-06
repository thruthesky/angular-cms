import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService, ERROR, isError } from './../../providers/app.service';
import { USER_REGISTER } from './../../firebase-backend/firebase-backend.module';

@Component({
  selector: 'register-page',
  templateUrl: './register.html'
})
export class RegisterPage implements OnInit, AfterViewInit {



  ///
  email;
  password;
  name;
  gender;
  birthday;
  mobile;

  error;
  constructor(
    public app: AppService
  ) {
    console.log(app.config);
    // this.setTestProfile();
    // this.onSubmitRegisterForm();
  }


  setTestProfile() {
    let str = this.app.user.randomString();
    this.email = str + "@gmail.com";
    this.password = str;
    this.name = str;
    this.gender = 'M';
    this.birthday = "1994-05-06";
    this.mobile = "09174670000";
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }


  onSubmitRegisterForm() {
    console.log("onSubmitRegisterForm()");
    let data: USER_REGISTER = {
      email: this.email,
      password: this.password,
      name: this.name,
      gender: this.gender,
      birthday: this.birthday,
      mobile: this.mobile
    }

    this.app.user.register(data)
      .then((uid: string) => {

      })
      .catch(e => this.app.alert(e));


    // this.app.user.updateProfile(data)
    //   .catch(e => console.error(e));
  }

}
