# Angular CMS

For Angular Project.


# TODO

* See issue on github

# Installation

$ git clone https://github.com/thruthesky/sonub
$ cd sonub
$ npm install --verbose
$ git submodule update --init
$ git submodule foreach git checkout master
$ npm run setup                                 // to setup defaults like 'polyfills'
$ ng serve
$ cordova platform add browser
$ abc run browser



## Firebase Backend


Do not install firebase-backend node_modules under parent project. This will produce errors.
Do not compile firebase-backend under parent project. This will produce errors.



# CODING GUIDELINE - STYLE GUIDE

* This project does not use `Lazy Loading`
    * So, developers need careful on reducing the javascript source file size.

* `AppService` is a root service ( root reference ) of the whole app project. it includes
    * `app.share` is a share servcie.
    * `app.config` is a config service.
    * `app.lib` is a javascript library service/container class.
    * `app.db` is the storage ( may be localstorage ).
    * `app.cookie` is the cookie management library.

    * All template bindings must use `getter` variables instead of using class property.
        For instance;
        Use `app.varName` where `varName` is a `getter`.

    * `app.service` MUST NOT include any child component or child service of the project to avoid circular reference.
        For instance;
        `AppSerivce` must not import `HomePage` component because `HomePage` compoent will import `AppService`.
        It is all the same to any service class.

    * Use `app.service` to refer firebase-backend as much as you can like below;

````
class XXXX {
  profile;
  constructor(
    app: AppService
  ) {
    this.profile = app.user.getProfile();
    app.db.ref.child('user');
    app.root.child('user');
  }
}
````

        So, you do not need to import firebsae backend.


* try to avoid to use getProfile since it is using setTimeout.



* Put ID of all element. ex) '#register-form-id', '#update-form-id'



* Each component must follow the following rules

    * `success` event for success of its role.
        For instance, `success` event for `post-create-compoent` when it successfully created a post.
    * `error` event for error of its role.


* Forms

    * Don't delcare object in class property to bind form. it will cause extra work.
    * Instead, use variable property.
For instance) class
````
class ProfilePage {
  profile;
  gender;
  birthday;
  phone;
  onSubmitProfile() {
    let data = {};
    data['gender'] = this.gender;
    data['birthday'] = this.birthday;
    data['phone'] = this.phone;
    this.app.user.updateProfile( data, () => {
      this.app.user.getProfile( profile => console.log(profile) );
    }, e => console.error(e) )
  }
}
````
For instance) template
````
<input type="radio" name="gender" value="M" [(ngModel)]=" gender "> Male
<input type="radio" name="gender" value="F" [(ngModel)]=" gender "> Female
<input name="birthday" [(ngModel)]=" birthday ">
<input name="phone" [(ngModel)]=" phone ">
````

## onAuthStatusChanged

Due to the latency of handshake between `onAuthStateChanged()` and Firebase database, the code gets real complicated.

For instance,

After register,

* The app must wait until the handshake between `onAuthStateChanged()` and Firebase database finishes to do many kinds of other works.

* `signInWithEmailAndPassword()`, `signInWithPopup()` are all the same.

* And this is why `getProfile()` with timeout exists as of 2017-07-05.

* But now, loginUser is set right after user has auth, the user can do a lot of work before `onAuthStateChanged()`.





Case example)
    * a user just register with `createUserWithEmailAndPassword()`
    * and registration success and got `uid`


## loginUser

@see firebase readme


## profile

@see firebse readme


## Zone update.

* When the internal state changes like
    * when app loads the user login status is pending and app needs time to check user 'Auth'.
    When the app checked user 'Auth', and the internal state has been changed already,
    But the change was not updated to UI because there is no user action.

    * When login, ngZone may need to be re-run.

    * If you click a button or link, or move to another page, then the change will be updated to UI immediately.

    * You may need to use `ngZone.run()` to update the UI immediately after getting the user profile using `UserService.getProfile()`
    Or just simply wait sometime for the UI updated.



## Config

Set all the configuration in ./app/config.ts



## Test

````
TestService.run()
````


# Plan

* We develop desktop-browser-website and mobile-web-app only. Not mobile-app.
* But we will develop a separate small-size mobile-app using angular to show the basic information about the site(posts/blogs) and when user clicks or login, then the app will launch inappbrowser to serve the web.

    * Reason: If we go for an app that has all the same functionality,
     then it is very difficult to maintain same source code.

     There is nothing like write-once and run everywhere. They are lying.

     Computer does not have a camera functionality like mobile-phone.

     So you need to maintain two different code. One for desktop and another for mobile-app.

     Likewise, mobile does not need service-worker while desktop browser needs.

     Messages, desktop browser needs web-app messages while mobile-app needs push notification.

     Social logins, it is very difficult to implement social logins on mobile-app while it is relatively managible on desktop. and they need different code.
     
     And there are much more inconsitencies between desktop-browsers, web-app, and mobile-apps.

     
    * If we simply give up on mobile-app's functionality like camera function of mobile-app and use inappbrowser to serve only web/web-app, things will get much easier because you only need to have one code for web. And you can focus on benefitting service worker while you still have chance to use push notifiation.





# Resources

* font-awesome 4
* bootstrap 4
* jQuery 3.x
* [firebase + angularfire4](https://github.com/angular/angularfire2)
* [firebase-backend](https://github.com/thruthesky/firebase-backend)


# Management

* Google Analystics : https://analytics.google.com/analytics/web/?hl=ko&pli=1#realtime/rt-overview/a101873841w149192538p154095534/


## Alert Box, Confirm Box, Input Box

````
constructor( alert: Alert ) {
    alert.open( { content: 'hi' } );
}
````


# Development Environment

* Run `npm run hmr` or `ng serve --hmr -e=hmr` for a HMR dev server.
We only support HMR.
*.scss must not be loaded by each component class. Instead, it must be @imported by global 'styles.scss'.

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


* All "*.scss" must be '@import'ed by style.scss



# 3rd party libraries

* jQuery

jQuery is needed by some other 3rd party libraries like 'Naver ID Login API'.

Since jQuery is the most wanted and standard library and a lot of 3rd party libraries are depending on jQuery, we simple include jQuery.

Installed jQuery version: jQuery 3.2.1 with @types/jquery 3.2.2


* naver login api


* kakao api






# Code scaffolding


# Build

Run `npm run ssl`


# Running unit tests


Run `npm run test` and Nightmare will begin to work.




# Login security, kakao login, secret key, etc.

@see firebase-backend README.md## Third party login security
