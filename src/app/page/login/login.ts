import { Component, OnInit } from '@angular/core';

import {
  UserService
} from './../../../firebase-backend/firebase-backend.module';

import * as firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginPage implements OnInit {

  constructor(
    public user: UserService
  ) { }

  ngOnInit() {
  }


  onClickLoginWithGoogle() {

    this.user.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => {
        console.log("success");
        console.log(res);
      })
      .catch(e => {
        console.log('error: ', e);
      });

  }




  onClickLoginWithFacebook() {

    this.user.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((res) => {
        console.log("facebook login success");
        console.log(res);
      })
      .catch(e => {
        console.log('error: ', e);
      });
  }



}
