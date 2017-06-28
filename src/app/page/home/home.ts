import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserService } from './../../../firebase-backend/firebase-backend.module';
import {} from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
export class HomePage implements OnInit {


  constructor(
    db: AngularFireDatabase,
    public user: UserService
  ) {
    
  }
  
  ngOnInit() {
    
  }

}
