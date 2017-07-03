import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService, ERROR, isError } from './../../providers/app.service';
@Component({
  selector: 'profile-page',
  templateUrl: './profile.html'
})
export class ProfilePage implements OnInit, AfterViewInit {

  profile;
  gender;
  birthday;
  phone;

  error;
  constructor(
    public app: AppService
  ) {
    this.initProfile();
  }
  initProfile() {
    // this.app.user.checkLogin(uid => {
    //   this.app.user.getProfile()
    //     .then(profile => this.setProfile(profile))
    //     .catch(e => console.error(e));
    // });

    this.app.user.getProfile(p => this.setProfile(p), e => {
      if ( isError(e.message, ERROR.user_not_logged_in ) )this.error = "You are not logged in";
      else this.error = e.message;
    });
  }

  setProfile(profile) {
    this.profile = profile;
    if (profile['gender']) this.gender = profile.gender;
    if (profile['birthday']) this.birthday = profile.birthday;
    if (profile['phone']) this.phone = profile.phone;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }


  onSubmitProfileForm() {
    console.log("onSubmitProfileForm()");
    let data = {};
    data['gender'] = this.gender;
    data['birthday'] = this.birthday;
    data['phone'] = this.phone;
    this.app.user.updateProfile(data)
      .catch(e => console.error(e));
  }

}