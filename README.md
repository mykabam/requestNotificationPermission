requestNotificationPermission directive
=======================================

[![Build Status](https://travis-ci.org/mykabam/requestNotificationPermission.png?branch=master)](https://travis-ci.org/mykabam/requestNotificationPermission)
[![Dependency Status](https://gemnasium.com/mykabam/requestNotificationPermission.png)](https://gemnasium.com/mykabam/requestNotificationPermission)

A handy directive to [request Notification permission](http://www.w3.org/TR/2012/WD-notifications-20120614/#permission) from user.

## Browser supports

* Chrome >= v22.0
* Firefox >= v22.0

## How to Install

To use this directive, fist you need to install it via [Bower](http://bower.io/).
I assume you already install the Bower:

```
bower install kabam-requestNotificationPermission
```

Include the directive `script requestNotificationPermission.js` into your application:

```
<script type="text/javascript" src="bower_components/kabam-requestNotificationPermission/requestNotificationPermission.js"></script>
```

Add `kabam.requestNotificationPermission` as a module dependency to your application

```
angular.module('yourAwesomeApplication', [
  'kabam.requestNotificationPermission'
]);
```
## How to Use

To use this directive, you need to add new attribute `request-notification-permission` to your html element.
For examples:

You might want to use the directive this way if you need to get the user permission in the first time they load the application.
```
<body request-notification-permission>Call</body>
```

You might want to use the directive this way if you need to get the user permission after they click some element or button.
```
<button request-notification-permission>Call</button>
```

## Running Tests

### Install dev dependencies

To install the dev dependencies:

```
npm install
```

To run the unit tests:

```
npm test
```

## License

Licensed under the MIT License.