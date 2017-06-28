import { Component, OnInit, AfterViewInit } from '@angular/core';



import * as firebase from 'firebase/app';

import {
  UserService,
  SOCIAL_PROFILE
} from './../../../firebase-backend/firebase-backend.module';

import { AppService } from './../../provider/app-service';



@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginPage implements OnInit, AfterViewInit {
  constructor(
    public app: AppService,
    public user: UserService
  ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.app.initNaver();
  }

  onClickLoginWithGoogle() {

    this.user.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => {
        console.log("success");
        console.log(res);

        let user:firebase.User = res.user;
        let profile: SOCIAL_PROFILE = {
          providerId: user.providerId,
          name: user.displayName,
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL
        };
        this.app.updateProfile( profile, () => console.log('onClickLoginWithGoogle() finished.') );
      })
      .catch(e => {
        console.log('error: ', e);
        this.app.alert( e.message );
      });

  }


  onClickLoginWithFacebook() {

    this.user.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((res) => {
        console.log("facebook login success");
        console.log(res);
        let user:firebase.User = res.user;
        let profile: SOCIAL_PROFILE = {
          providerId: user.providerId,
          name: user.displayName,
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL
        };
        
        this.app.updateProfile( profile, () => console.log('onClickLoginWithFacebook() finished.') );
      })
      .catch(e => {
        console.log('error: ', e);
        this.app.alert( e.message );
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
                        if ( res['kaccount_email'] ) email = res['kaccount_email'];
                        else email = id + '@kakaotalk.com';
                        this.app.thirdPartySocialLoginSuccessHandler({
                            providerId: 'kakao',
                            name: nickname,
                            uid: id,
                            email: id + '@kakaotalk.com',     /// @see readme kakoa login.
                            password: 'K.c+,~'+email,                  /// @see readme kakoa login.
                            photoURL: res.properties.profile_image
                        }, () => { console.log("Kakao Login finish")});
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



}