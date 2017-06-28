import { Component } from '@angular/core';
import { AppService } from './provider/app-service';
import { ApiService } from './../firebase-backend/firebase-backend.module';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';



  constructor(app: AppService, api: ApiService, db: AngularFireDatabase) {
    api.setBackendUrl('https://us-central1-sonub-e2b13.cloudfunctions.net/postApi');


    // db.database.ref('/').child('test').on('value', s => {
    //   console.log("Test Child: ", s.val());
    // }, e => console.error(e));

    // db.database.ref('/').child('test').on('child_changed', s => {
    //   console.log("Changed: ", s.key, s.val());
    // }, e => console.error(e));

    // db.database.ref('/').child('test').on('child_removed', s => {
    //   console.log("Removed: ", s.key, s.val());
    // }, e => console.error(e));

    

  }
  

}