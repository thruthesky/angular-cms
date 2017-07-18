/**
 * When 'PushMessageService' is injected, it will ask permission.
 * 
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';



/**
 * Push Message
 */

import {
    PUSH_MESSAGE,
    USER_PUSH_TOKEN_PATH
} from './../firebase-backend/src/interface';

import { ERROR } from './../firebase-backend/src/model/error/error';
import { Base } from './../firebase-backend/src/model/base/base';
import { UserService } from './../firebase-backend/src/model/user/user.service';
import * as lib from './../shared-library/shared-library';


const USER_TOKEN = 'user-token';


declare let FCMPlugin;



@Injectable()
export class PushMessageService extends Base {
    private messaging: firebase.messaging.Messaging;
    private db: firebase.database.Database;
    private auth: firebase.auth.Auth;
    constructor(
        private http: Http,
        private user: UserService
    ) {
        super();

        /// init
        this.messaging = firebase.messaging();
        this.db = firebase.database();
        this.setRoot( this.db.ref() );
        this.auth = firebase.auth();

        this.runIfWeb();
    }


    private runIfWeb() {
        if (lib.isCordova()) return;


        /// request user permission every time.
        // this.requestPermission();

        this.requestPermissionIfUserLoggedIn();

        this.messaging.onMessage((payload) => {
            alert(payload['notification']['title'] + '\n' + payload['notification']['body']);
            location.href = payload['notification']['click_action'];
        });

    }

    /**
     * 
     */
    private requestPermissionIfUserLoggedIn() {
        this.user.loginState.subscribe(uid => {
            if (uid) this.requestPermission(uid);
        });
    }



    /**
     * 
     */
    private requestPermission(uid: string) {

        /**
         * Request permission (to user) for receiving messages.
         */
        this.messaging.requestPermission()
            .then(() => {
                console.log('requestPermission() granted');
                this.messaging.getToken()
                    .then((currentToken) => {
                        if (currentToken) {
                            //
                            console.log("Got token: ", currentToken);

                            if (currentToken == localStorage.getItem(USER_TOKEN)) {
                                console.log("User token has not changed. so, not going to update");
                                return;
                            }
                            console.log("User token has chagned. so, going to update.");
                            this.updateToken(uid, currentToken);

                        } else {
                            console.log('No Instance ID token available. Request permission to generate one.');
                        }
                    })
                    .catch(function (err) {
                        console.log('An error occurred while retrieving token. ', err);
                    });

            })
            .catch(e => {
                if (e && e['code']) {
                    switch (e['code']) {
                        case 'messaging/permission-default': /// user closed permission popup box by clicking 'x' button.
                            console.log('user closed permission popup box by clicking "x" button.');
                            break;
                        case 'messaging/permission-blocked': /// user blocked
                            console.log('user blocked push message');
                            break;
                        default: ///
                            console.log(e);
                    }
                } else {
                    console.log('Unable to get permission to notify. ( It does not look like firebase error )', e);
                }
            });
    }

    /**
     * Return a promise
     * @param message Message data
     * @return a promise
     */
    send(message: PUSH_MESSAGE): firebase.Promise<any> {
        return this.getToken(message.uid).then(token => {
            message.token = token;
            return this.requestPush(message).toPromise()
                .then(() => message);
        });
    }

    private requestPush(message: PUSH_MESSAGE): Observable<any> {

        if (!message.title) message.title = 'Sonub Nofification';
        if (!message.url) message.url = 'https://sonub.com';
        if (!message.icon) message.icon = '/assets/img/push-message/icon.png';
        // console.log("requestPush with: ", token, title, body);
        const data = {
            'notification': {
                'title': message.title,
                'body': message.body,
                'icon': message.icon,
                'click_action': message.url
            },
            'to': message.token
        };
        return this.http.post('https://fcm.googleapis.com/fcm/send', data, this.requestOptions);
    }

    private get requestOptions(): RequestOptions {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAALbd78tk:APA91bFAWHYdlihD2ACgug0qE6RXjn28E7dVkBItE-fzXFB27TmmlGnl31JdmdHauJpLu0T8QPGRY6xIuORyYVR1Q-swFb9IQlVQlgpB_hjwNdNbm_0EodlLvW_B9-zdJ-obffThlto_'
        });
        const options = new RequestOptions({ headers: headers });
        return options;
    }



    private updateToken(uid, currentToken) {

        let promise;
        if (uid) promise = this.token(uid).set(currentToken);
        else promise = this.anonymousToken(currentToken).set(true);
        promise
            .then(() => {
                localStorage.setItem(USER_TOKEN, currentToken);
            })
            .catch(e => console.error(e));

    }



    /**
     * Cordova
     */

    cordovaInit() {

        //FCMPlugin.onTokenRefresh( onTokenRefreshCallback(token) );
        //Note that this callback will be fired everytime a new token is generated, including the first time.
        FCMPlugin.onTokenRefresh((token) => {
            console.log("onDeviceReady() => onTokenRefresh: ", token);
            // alert(token);
            // this.user.loginState.subscribe(uid => this.updateToken( uid, token) );
            this.user.auth.onAuthStateChanged(user => {
                let uid = user ? user.key : null;
                this.updateToken(uid, token);
            });
        });

        //FCMPlugin.getToken( successCallback(token), errorCallback(err) );
        //Keep in mind the function will return null if the token has not been established yet.

        FCMPlugin.getToken((token) => {
            console.log("FCM Token:", token);
            this.user.auth.onAuthStateChanged(user => {
                let uid = user ? user.uid : null;
                console.log("cordovaInit() => getToken() => onAuthStateChanged: ", uid);
                this.updateToken(uid, token);
            });
        });

        //FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
        //Here you define your application behaviour based on the notification data.
        FCMPlugin.onNotification((data) => {
            console.log("...Notification: ", data);
            if (data.wasTapped) {
                //Notification was received on device tray and tapped by the user.
                alert(JSON.stringify(data));
            } else {
                //Notification was received in foreground. Maybe the user needs to be notified.
                alert(JSON.stringify(data));
            }
        }, e => console.error(e));

    }
}
