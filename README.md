# Angular CMS

For Angular Project.


## Plan

* We develop desktop-browser-website and mobile-web-app.
* We develop a separate app using angular showing simple data like post lists and when user clicks or login, then the app will launch inappbrowser to serve the web.

    * Reason: If we develope for apps, service-worker, social-login, camera-photo functionality and much more code will not be compatible. You have to maintain two source code and that is not easy work.

    * If you simply give up on camera functionality of mobile-app and use inappbrowser to serve web, things will get much easier and you can benefit service worker.

    * Using service worker, the web-app will cache remote data on locally which is not needed by mobile-app.

    * For notification, you can still do it with app and at the same time, you can use message of web-app.

    * And social login is much easier on web-app.

## Test

* Use nightmare to test the result.




## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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
