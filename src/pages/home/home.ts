
import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { UserService } from './../../firebase-backend/firebase-backend.module';
import { AppService } from './../../providers/app.service';
import { } from 'jquery';
//import {} from 'cordova-plugin-device';
// declare let cordova;

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
export class HomePage implements OnInit, OnDestroy {


  device = {};
  subscribeLogin;


  constructor(
    public app: AppService
  ) {
    document.addEventListener('deviceready', () => this.onDeviceReady(), false);


  }


  onDeviceReady() {
    // console.log("HomePage::onDeviceReady() Cordova is ready.");
    this.device = device;
    // console.log(device.cordova);
    // console.log(device.version);
    // console.log(device.model);
  }


  ngOnInit() {
    this.subscribeLogin = this.app.user.loginState.subscribe(uid => {
      if (uid) {
        // this.app.push.send({
        //   uid: uid,
        //   title: 'Sonub Message',
        //   body: "Hello, test message"
        // })
        // .then( message => {
        //   console.log("message sent!", message);
        // })
        // .catch(e => console.error(e));


      } else {
        // console.log("<--- User logged out");
      }
    });
  }
  ngOnDestroy() {
    this.subscribeLogin.unsubscribe();
    console.log("destroyed");
  }
  onClickButton() {

  }


}
