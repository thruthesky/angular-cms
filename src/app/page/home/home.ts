import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import {} from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
export class HomePage implements OnInit {


  constructor( db: AngularFireDatabase ) {
    
  }
  
  ngOnInit() {
  }

}
