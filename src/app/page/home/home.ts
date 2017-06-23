import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import {} from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.html'
})
export class HomePage implements OnInit {

  items: FirebaseListObservable<any[]>;
  constructor( db: AngularFireDatabase ) {
    this.items = db.list('/items');
  }
  
  ngOnInit() {
  }

}
