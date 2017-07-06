
import { Component, OnInit } from '@angular/core';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { UserService } from './../../firebase-backend/firebase-backend.module';
import { AppService } from './../../providers/app.service';
import {} from 'jquery';
//import {} from 'cordova-plugin-device';
// declare let cordova;

@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
export class HomePage implements OnInit {


  device = {};
  

  constructor(
    public app: AppService
  ) {
    document.addEventListener('deviceready', () => this.onDeviceReady(), false);
  }

  onDeviceReady() {
    console.log("HomePage::onDeviceReady() Cordova is ready.");
    this.device = device;
    console.log(device.cordova);
    console.log(device.version);
    console.log(device.model);
  }

  
  ngOnInit() {
    
  }
  onClickButton() {

  }


}
