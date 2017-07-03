import { Component, OnInit } from '@angular/core';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { UserService } from './../../firebase-backend/firebase-backend.module';
import { AppService } from './../../providers/app.service';
import {} from 'jquery';
import {} from 'cordova-plugin-device';
@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
export class HomePage implements OnInit {


  device = {};
  profile;
  

  constructor(
    public app: AppService
  ) {
    app.user.getProfile( p => {
      this.profile = p;
      console.log( 'login:', app.user.isLogin );
      console.log(this.profile);
      // app.render();

    }, (e) => console.log(e.message));


    document.addEventListener('deviceready', () => this.onDeviceReady(), false);
  }

  onDeviceReady() {
    this.device = device;
    console.log("Cordova is ready.");
    console.log(device.cordova);
    console.log(device.version);
    console.log(device.model);
  }

  
  ngOnInit() {
    
  }
  onClickButton() {

  }

}
