# Angular CMS

For Angular Project.


## TODO

* See issue on github

## CODE DESIGN

* `Dynamic Route`
    * Since this app 

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


* Put ID of all element. ex) '#register-form-id', '#update-form-id'



* Each component must follow the following rules

    * `success` event for success of its role.
        For instance, `success` event for `post-create-compoent` when it successfully created a post.
    * `error` event for error of its role.



## Plan

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



## Test

* Use nightmare to test the result.


## Resources

* font-awesome 4
* bootstrap 4
* jQuery 3.x
* [firebase + angularfire4](https://github.com/angular/angularfire2)
* [firebase-backend](https://github.com/thruthesky/firebase-backend)


## Management

* Google Analystics : https://analytics.google.com/analytics/web/?hl=ko&pli=1#realtime/rt-overview/a101873841w149192538p154095534/


## Alert Box, Confirm Box, Input Box

````
constructor( alert: Alert ) {
    alert.open( { content: 'hi' } );
}
````


## Development Environment

* Run `npm run hmr` or `ng serve --hmr -e=hmr` for a HMR dev server.
We only support HMR.
*.scss must not be loaded by each component class. Instead, it must be @imported by global 'styles.scss'.

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


* All "*.scss" must be '@import'ed by style.scss



## 3rd party libraries

* jQuery

jQuery is needed by some other 3rd party libraries like 'Naver ID Login API'.

Since jQuery is the most wanted and standard library and a lot of 3rd party libraries are depending on jQuery, we simple include jQuery.

Installed jQuery version: jQuery 3.2.1 with @types/jquery 3.2.2


* naver login api


* kakao api






## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help


# login, secret key, kakao login, etc.

@see firebase-backend README.md
