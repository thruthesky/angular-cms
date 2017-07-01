import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from './../../providers/app.service';
@Component({
  selector: 'profile-page',
  templateUrl: './profile.html'
})
export class ProfilePage implements OnInit, AfterViewInit {

  profile;
  gender;
  birthday;
  phone;
  constructor(
    public app: AppService
  ) {
    this.getProfile();
  }
  getProfile() {
    if ( this.app.user.logged ) {
      this.app.user.getProfile( profile => {
        this.profile = profile;
        if ( profile['gender'] ) this.gender = profile.gender;
        if ( profile['birthday'] ) this.birthday = profile.birthday;
        if ( profile['phone'] ) this.phone = profile.phone;
      });
    }
    else setTimeout( () => this.getProfile(), 200 );
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }


  onSubmitProfile() {
    let data = {};
    data['gender'] = this.gender;
    data['birthday'] = this.birthday;
    data['phone'] = this.phone;
    this.app.user.updateProfile( data, () => {
      this.app.user.getProfile( profile => console.log(profile) );
    }, e => console.error(e) )
  }

}
