import { Component } from '@angular/core';
import { ApiService } from './../firebase-backend/firebase-backend.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';


  
  constructor( api: ApiService ) {
    api.setBackendUrl('https://us-central1-sonub-e2b13.cloudfunctions.net/postApi');
  }

}
