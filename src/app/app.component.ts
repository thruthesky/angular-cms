import { Component } from '@angular/core';
import { AppService } from '../providers/app.service';
import {
  ApiService
  // , TestService
} from './../firebase-backend/firebase-backend.module';
import { } from 'cordova-plugin-device';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    // test: TestService,
    private app: AppService,
    api: ApiService
  ) {
    api.setBackendUrl('https://us-central1-sonub-e2b13.cloudfunctions.net/api');
    document.addEventListener('deviceready', () => this.onDeviceReady(), false);
    // test.run();

  }

  onDeviceReady() {
    console.log("AppComponent::onDeviceRead() => Cordova is ready..");

    this.app.push.cordovaInit();

  }

}