import { Component } from '@angular/core';
import { AppService } from '../providers/app.service';
import { ApiService } from './../firebase-backend/firebase-backend.module';
import { AngularFireDatabase } from 'angularfire2/database';
import { } from 'cordova-plugin-device';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  constructor(app: AppService, api: ApiService, db: AngularFireDatabase) {
    api.setBackendUrl('https://us-central1-sonub-e2b13.cloudfunctions.net/postApi');
    document.addEventListener('deviceready', () => this.onDeviceReady(), false);
  }

  onDeviceReady() {
    console.log("Cordova is ready.");
    console.log(device.cordova);
    console.log(device.version);
    console.log(device.model);
  }

}