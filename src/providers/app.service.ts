import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ERROR } from './../firebase-backend/firebase-backend.module';
export { ERROR, isError } from './../firebase-backend/firebase-backend.module';
import * as firebase from 'firebase/app';


import config from './../app/config';


import {
    UserService, ForumService,
    SOCIAL_PROFILE, USER_REGISTER
} from './../firebase-backend/firebase-backend.module';


@Injectable()
export class AppService {
    config = config;
    auth: firebase.auth.Auth;
    root: firebase.database.Reference;
    kakao;
    constructor(
        public user: UserService,
        public forum: ForumService,
        private ngZone: NgZone,
        private router: Router
    ) {
        console.log("AppService::constructor()");
        this.auth = firebase.auth();
        this.root = firebase.database().ref('/');
        forum.setRoot(this.root);
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




    /**
     * 
     * @param a String or Error object.
     */
    warning( a ) {
        let str = '';
        if ( typeof a === 'string' ) str = a;
        else {
            if ( a['code'] ) str += a['code'] + ': ';
            if ( a['message'] ) str += a['message'];
        }
        alert( str );
    }
    alert( a ) {
        this.warning( a );
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

        if (!naver_id_login.oauthParams) return;

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
                    password: 'N.c+,~' + email,
                    photoURL: profile_image
                };
                this.thirdPartySocialLoginSuccessHandler(user, () => {
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
     * @note This method will be invoked if a user logs in with 'third party social` like kakao, naver, instagram.
     * @note All third party social login will/must come here.
     * 
     * @role In this method, the user with 'third party social login' must register into Firebase using email/password auth.
     *          - If alread registered, then simple login.
     * 
     * @attion for security, see README
     * 
     */
    thirdPartySocialLoginSuccessHandler(user: SOCIAL_PROFILE, callback) {
        console.log("thirdPartySocialLoginSuccessHandler()", user);
        this.socialFirebaseEmailLogin(user, () => this.socialLoggedIn(user, callback), () => this.socialFirebaseEmailRegister(user as any, callback));
    }



    /**
     * This method is invoked on every social login including Firebase supported login like facebook, google and all 3rd party social login like kakao, naver.
     * 
     * @warning user.loginUser must be set before this method.
     * 
     * @param user User data from social login which will be updated to `/user/profile`
     * @param callback 
     */
    socialLoggedIn(user: SOCIAL_PROFILE, callback) {
        console.log("updateUserProfile()");
        //this.user.auth.onAuthStateChanged((firebaseUser: firebase.User) => {
            // this.user.setLoginUser( firebaseUser );
            // console.log("AppService::loggedIn() => onAuthStateChanged()");
            // if (fUser) { // user logged in.
                this.user.updateProfile(user).then(() => {
                    this.loggedIn( callback );
                })
                .catch(e => console.error(e));
            // }
            // else {

            // }
        //});
    }


    /**
     * This method is being called on every login including social login and email/password login and any kinds of login.
     * @note you can do something like
     *      - counting login.
     *      - recoring last login time, last login ip.
     *      - and much more.
     * @param callback Callback
     */
    loggedIn( callback ) {
        callback();


        ///
        /// this.render(); /// re-rendering is not working here for updating user state change.
    }





    socialFirebaseEmailLogin(user: SOCIAL_PROFILE, success, error) {
        console.log("emailLogin()");

        this.user.login(user.email, user.password)
            // firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(success)
            .catch(error);
    }

    socialFirebaseEmailRegister(user: USER_REGISTER, callback) {
        console.log("emailRegister()");
        // firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        this.user.register(user)
            .then(() => this.socialLoggedIn(user as any, callback)) /// user created, so update profile.
            .catch(e => {                                          /// if fail on user create, then, login and update profile.
                console.log("Caught in emailRegister. error code:", e['code']);
                //if ( e['code'] == 'auth/email-already-in-use' ) {
                // this.signIn3rdParty( user, () => this.updateUserProfile( user, callback ) );
                //}
                this.alert(`ERROR on Login::emailRegister() code: ${e['code']}`);
            });

    }



    render() {
        this.ngZone.run(() => { });
    }


    go( path, msg?: string ) {
        if ( msg ) alert( msg );
        this.router.navigateByUrl( path );
    }



    ////////////////////////////////////
    ///
    ///     FILE UPLOAD
    ///
    ////////////////////////////////////



    /**
     * 
     * @param filename file name
     * @param data Upload file data. It can be 'File' object or 'Blob'.
     * @param successCallback 
     * @param failureCallback 
     * @param progressCallback 
     */
    upload( filename, data, successCallback: (url: string) => void, failureCallback: (e:string) => void, progressCallback: (percent: number) => void) {
        
        if ( ! this.user.isLogin ) return failureCallback( ERROR.user_not_logged_in );

        let root = firebase.storage().ref();
        let uploadTask = root.child('upload')
            .child(this.user.uid)
            .child( this.forum.randomString() + '---' + filename )
            .put(data);
        uploadTask.then(snapshot => {
            successCallback(snapshot.downloadURL);
        })
            .catch(e => failureCallback(e.message));
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, snapshot => {
            let percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            progressCallback(percent);
        });
    }



    /**
     * Returns safe string for storage reference.
     * @see https://firebase.google.com/docs/storage/web/create-reference#limitations_on_references
     * @param subject 
     */
    getSafeStorageReferencePath(subject) {
        let ns = subject.replace(/#\[\]\*\?/g, '-');
        return ns;
    }


}