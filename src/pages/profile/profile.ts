import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AppService, ERROR, isError } from './../../providers/app.service';
import { USER_UPDATE } from './../../firebase-backend/firebase-backend.module';
@Component({
  selector: 'profile-page',
  templateUrl: './profile.html'
})
export class ProfilePage implements OnInit, AfterViewInit, OnDestroy {




  name;
  gender;
  birthday;
  mobile;

  error;

  ///
  subscriptionLoadProfile = null;
  constructor(
    public app: AppService
  ) {
    this.initProfile();
  }
  initProfile() {
    this.subscriptionLoadProfile = this.app.user.loadProfile.subscribe(load => {
      if ( load ) {
        this.name = this.app.user.profile.name;
        this.gender = this.app.user.profile.gender;
        this.birthday = this.app.user.profile.birthday;
        this.mobile = this.app.user.profile.mobile;
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.subscriptionLoadProfile.unsubscribe();
  }


  onSubmitProfileForm() {
    console.log("onSubmitProfileForm()");
    let data: USER_UPDATE = {};
    data['name'] = this.name;
    data['gender'] = this.gender;
    data['birthday'] = this.birthday;
    data['mobile'] = this.mobile;
    this.app.user.updateProfile(data)
      .catch(e => console.error(e));
  }

}
