import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';



/// firebase
import { environment } from '../environments/environment';
import { FirebaseBackendModule } from './../firebase-backend/firebase-backend.module';



/// Bootstrap CSS Framework 4.x
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModule } from '../providers/bootstrap/bootstrap-module';



/// Custom error handler. need help here.
import { CustomErrorHandler } from './app.error-handler';

/// app service
import { SharedService } from './../providers/shared.service';
import { PageScroll } from './../providers/page-scroll';
import { AppService } from '../providers/app.service';
import { LibraryService } from './../providers/library';
import { PushMessageService } from './../providers/push-message';



/// app component
import { AppComponent } from './app.component';
import { HomePage } from './home/home';
import { HomeModule } from './home/home.module';


/// forum module
import { ForumPageModule } from '../pages/forum/forum-page.module';


import * as firebase from 'firebase';

firebase.initializeApp(environment.firebase);


const appRoutes: Routes = [
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: '', component: HomePage, pathMatch: 'full' },
  { path: '**', component: HomePage }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
    FirebaseBackendModule,
    NgbModule.forRoot(),
    BootstrapModule,
    RouterModule.forRoot(appRoutes),
    ForumPageModule,
    HomeModule
  ],
  providers: [
    AppService,
    SharedService,
    LibraryService,
    PushMessageService,
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    PageScroll
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
