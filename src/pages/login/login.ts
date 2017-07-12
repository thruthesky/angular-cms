import { Component, OnInit, AfterViewInit } from '@angular/core';



import * as firebase from 'firebase/app';

import {
  SOCIAL_PROFILE
} from './../../firebase-backend/firebase-backend.module';

import { AppService } from './../../providers/app.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginPage implements OnInit, AfterViewInit {


  email;
  password;

  constructor(
    public app: AppService
    // public user: UserService
  ) {

      console.log('LoginPage::construcotr()');

    // user.getProfile(profile => this.profile = profile, e => console.log(e.message));

  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.app.initNaver();
  }

  firebaseSocialLoginSuccess(user: firebase.User) {
    this.app.user.setLoginUser(user);
    let profile: SOCIAL_PROFILE = {
      providerId: user.providerId,
      name: user.displayName,
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL
    };
    this.app.socialLoggedIn(profile, () => {
      console.log('onClickLoginWithGoogle() finished.');
      this.loggedIn();
    });
  }

  firebaseSocialLogniError(e) {
    // Handle Errors here.
    let code = e['code'];
    let message = e['message'];
    this.app.alert(`${code}: ${message}`);
  }

  onClickLoginWithGoogle() {
    this.app.user.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => this.firebaseSocialLoginSuccess(res.user))
      .catch(e => this.firebaseSocialLogniError(e));
  }
  onClickLoginWithCordovaGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(() => {
      firebase.auth().getRedirectResult().then(result => {
        this.firebaseSocialLoginSuccess(result.user);
      })
        .catch(e => this.firebaseSocialLogniError(e));
    });
  }

  onClickLoginWithFacebook() {
    this.app.user.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((res) => this.firebaseSocialLoginSuccess(res.user))
      .catch(e => this.firebaseSocialLogniError(e));
  }

  onClickLoginWithCordovaFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(() => {
      firebase.auth().getRedirectResult().then(result => {
        this.firebaseSocialLoginSuccess(result.user);
      })
        .catch(e => this.firebaseSocialLogniError(e));
    });
  }



  onClickLoginWithKakao() {
    // open login popup
    this.app.kakao.Auth.login({
      success: (authObj) => {
        // Get user informaton
        this.app.kakao.API.request({
          url: '/v1/user/me',
          success: (res) => {
            let nickname = null;
            console.log(res);
            if (res['properties'] && res['properties']['nickname']) nickname = res['properties']['nickname'];
            let id = res.id;
            let email;
            if (res['kaccount_email']) email = res['kaccount_email'];
            else email = id + '@kakaotalk.com';
            this.app.thirdPartySocialLoginSuccessHandler({
              providerId: 'kakao',
              name: nickname,
              uid: id,
              email: id + '@kakaotalk.com',     /// @see readme kakoa login.
              password: 'K.c+,~' + email,                  /// @see readme kakoa login.
              photoURL: res.properties.profile_image
            }, () => {
              console.log("Kakao Login finish");
              this.loggedIn();
            });
          },
          fail: function (error) {
            alert(JSON.stringify(error));
          }
        });

      },
      fail: function (err) {
        alert(JSON.stringify(err));
      }
    });
  }


  onClickLoginWithNaver() {
    let a = document.querySelector('#naver_id_login a');
    a['click']();
  }


  loggedIn() {
    console.log("logged in");
    // this.app.go('/');
  }



  onSubmitLogin() {
    this.app.user.login(this.email, this.password)
      .then(() => this.app.loggedIn(() => this.loggedIn()))
      .catch(e => this.firebaseSocialLogniError(e));
  }

}