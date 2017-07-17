import { Component } from '@angular/core';
import { AppService } from '../providers/app.service';
import {
  ApiService
  // , TestService
} from './../firebase-backend/firebase-backend.module';
import { } from 'cordova-plugin-device';

declare let FCMPlugin;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    // test: TestService,
    app: AppService,
    api: ApiService
  ) {
    api.setBackendUrl('https://us-central1-sonub-e2b13.cloudfunctions.net/api');
    document.addEventListener('deviceready', () => this.onDeviceReady(), false);
    // test.run();

  }

  onDeviceReady() {
    console.log("AppComponent::onDeviceRead() => Cordova is ready..");
 

    //FCMPlugin.onTokenRefresh( onTokenRefreshCallback(token) );
    //Note that this callback will be fired everytime a new token is generated, including the first time.
    FCMPlugin.onTokenRefresh(function (token) {
      console.log("onDeviceReady() => onTokenRefresh: ", token);
      // alert(token);
    });

    //FCMPlugin.getToken( successCallback(token), errorCallback(err) );
    //Keep in mind the function will return null if the token has not been established yet.

    FCMPlugin.getToken(function (token) {
      console.log("FCM Token:", token);
    });

    //FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
    //Here you define your application behaviour based on the notification data.
    FCMPlugin.onNotification(function (data) {
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