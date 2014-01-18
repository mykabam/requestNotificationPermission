/*jshint -W098 */
'use strict';

/**
 * A helper function to handle request permission.
 */

function requestPermission() {

  var notification = null;

  if (window.Notification) {
    notification = window.Notification;
  } else if (window.webkitNotifications) {
    notification = window.webkitNotifications;
  }

  if (notification && notification.permission !== 'denied') {
    notification.requestPermission(function(status) {
      if (notification.permission !== status) {
        notification.permission = status;
      }
    });
  }
}

/**
 * @ngdoc directive
 *
 * @name requestNotificationPermission
 *
 * @description
 * The requestNotificationPermission directive allow you to request
 * Web Notification permission. Will works both on Google Chrome >= 28.0 and
 * Firefox >= 22.0.
 *
 * Notes on Google Chrome usage:
 * There's one very important caveat about requesting permission:
 * the page can only request permission when a user initiates some action on
 * a page, in this case, clicking on a button. So, when using this directive
 * only click event will work best on Google Chrome, otherwise will not be
 * working as expected.
 *
 * @element ANY
 *
 * @example
   <doc:example>
      <doc:source>
        <button request-notification-permission>Call</button>
        <body request-notification-permission>
      </doc:source>
    </doc:example>
 */
angular.module('kabam.requestNotificationPermission', [])
  .directive('requestNotificationPermission', function() {

    return function(scope, element, attrs) {
      // listening to click event on the element
      element.bind('click', function(e) {
        requestPermission();
      });

      // listening to mouseover event on the element
      element.bind('mouseover', function(e) {
        requestPermission();
      });

      // listening to mousemove event on the element
      element.bind('mousemove', function(e) {
        requestPermission();
      });
    };
  });
