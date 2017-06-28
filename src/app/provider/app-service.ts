import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase/app';


import {
    UserService,
    SOCIAL_PROFILE
} from './../../firebase-backend/firebase-backend.module';


@Injectable()
export class AppService {
    auth: firebase.auth.Auth;
    root: firebase.database.Reference;
    kakao;
    constructor(
        private angularFireAuth: AngularFireAuth,
        private db: AngularFireDatabase,
        public user: UserService
    ) {
        console.log("AppService::constructor()");
        this.auth = angularFireAuth.auth;
        this.root = db.database.ref('/');
        this.initAuth();
        this.initKakao();
        this.checkLoginWithNaver();
    }

    initAuth() {

    }
    initKakao() {
        this.kakao = window['Kakao'];
        this.kakao.init('937af10cf8688bd9a7554cf088b2ac3e');
    }

    initNaver() {
        let naver_id_login = this.getNaverLoginObject();
        let hostname = window.location.hostname;
        naver_id_login.setButton("green", 1, 28);
        hostname = hostname.replace("www.", "");
        hostname = hostname.replace("WWW.", "");
        naver_id_login.setDomain("." + hostname);
        naver_id_login.setState("loginRequest");
        naver_id_login.init_naver_id_login();
    }


    getNaverLoginObject() {

        let hostname = window.location.hostname;
        return new window['naver_id_login']('qRwZxyJZn1evzadqAjC0', "https://" + hostname + "/");

    }




    alert(m) {
        alert(m);
    }



    /**
     * 
     * @note Since the login of naver login different, it is not in 'login.ts'
     *  
     * @note This will be called only one time after naver login.
     */
    checkLoginWithNaver() {
        
        let naver_id_login = this.getNaverLoginObject();

        console.log("checkLoginWithNaver()", naver_id_login.oauthParams);

        if ( ! naver_id_login.oauthParams ) return;

        let naver_access_token = naver_id_login.oauthParams.access_token;

        // User has just logged in with naver id. ( 방금 로그인 )
        if (naver_access_token) {
            console.log("User just logged in with Naver!");
            history.pushState('', document.title, window.location.pathname);

            naver_id_login.get_naver_userprofile(() => {
                let nickname = naver_id_login.getProfileData('nickname');
                let id = naver_id_login.getProfileData('id');
                let email = naver_id_login.getProfileData('email');
                let profile_image = naver_id_login.getProfileData('profile_image');
                let user: SOCIAL_PROFILE = {
                    providerId: 'naver',
                    name: nickname,
                    uid: id,
                    email: id + '@naver.com',
                    password: 'N.c+,~'+email,
                    photoURL: profile_image
                };
                this.thirdPartySocialLoginSuccessHandler( user, () => {
                    /**
                     * After Naver login, resize IE window with full with. The code below works only on IE. it's not working on Chrome, Firefox.
                     */
                    window.resizeTo(
                        window.screen.availWidth,
                        window.screen.availHeight
                    );
                });
            });
        }
    }


    /**
     * Third social login.
     * 
     * Register into Firebase using email/password auth.
     * If alread registered, then simple login.
     * 
     */
    thirdPartySocialLoginSuccessHandler(user: SOCIAL_PROFILE, callback) {
        console.log("thirdPartySocialLoginSuccessHandler()", user);
        this.emailLogin(user, () => this.updateProfile(user, callback), () => this.emailRegister(user, callback));
    }



    updateProfile(user: SOCIAL_PROFILE, callback) {
        console.log("updateUserProfile()");
        // this.app.getSeceretKey(user, secret => {
        //     console.log('secret: ', secret);
        // });
        this.user.updateProfile( user, callback );
    }

    emailLogin(user: SOCIAL_PROFILE, success, error) {
        console.log("emailLogin()");
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(success)
            .catch(error);
    }

    emailRegister(user: SOCIAL_PROFILE, callback) {
        console.log("emailRegister()");
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(() => this.updateProfile(user, callback)) /// user created, so update profile.
            .catch(e => {                                          /// if fail on user create, then, login and update profile.
                console.log("Caught in emailRegister. error code:", e['code']);
                //if ( e['code'] == 'auth/email-already-in-use' ) {
                // this.signIn3rdParty( user, () => this.updateUserProfile( user, callback ) );
                //}
                this.alert(`ERROR on Login::emailRegister() code: ${e['code']}`);
            });

    }




}